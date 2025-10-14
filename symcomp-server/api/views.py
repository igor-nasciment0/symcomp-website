from backend import settings
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.mail import send_mail
from .models import PerfilUsuario, Papel, User, EmailVerificationCode, Palestrante
from .serializers import (
    EmailTokenObtainPairSerializer,
    RegisterSerializer,
    PalestranteSerializer,
)
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .lib.user_validation_code_email import UserValidationCodeEmail
from rest_framework_simplejwt.tokens import RefreshToken, InvalidToken
from rest_framework_simplejwt.exceptions import TokenError

import random

from .lib.certificate_generator import certificate_gen

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"]
        if User.objects.filter(email=email).exists():
            return Response({"error": "Usuário já existe"}, status=status.HTTP_409_CONFLICT)

        user = serializer.save()

        UserValidationCodeEmail(user).send()

        return Response(
            {"message": "Usuário criado. Código de validação enviado por e-mail."},
            status=status.HTTP_201_CREATED
        )


class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            response = Response({
                'message': 'Login succesful'
            }, status=status.HTTP_200_OK)

            # set access token in httponly cookie
            response.set_cookie(
                    key='access_token',
                    value=access,
                    httponly=True,
                    expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME']
                    secure=settings.SESSION_COOKIE_SECURE,
                    samesite='Lax',
            )
            # set refresh token in httponly cookie
            response.set_cookie(
                    key='refresh_token',
                    value=str(refresh),
                    httponly=True,
                    expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                    secure=settings.SESSION_COOKIE_SECURE,
                    samesite='Lax'
            )

        return response


class RefreshAccessTokenView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        if not refresh_token:
            return Response({'detail': 'Refresh token not found'}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            refresh = RefreshToken(refresh_token)
            new_access = str(refresh.access_token)
            response = Response({'message': 'Access token refreshed successfully.'}, status=status.HTTP_200_OK)

            response.set_cookie(
                key='access_token',
                value=new_access,
                httponly=True,
                expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                secure=settings.SESSION_COOKIE_SECURE,
                samesite='Lax'
            )
            
            # meant for token rotation
            if 'ROTATE_REFRESH_TOKENS' in settings.SIMPLE_JWT and settings.SIMPLE_JWT['ROTATE_REFRESH_TOKENS']:
                response.set_cookie(
                    key='refresh_token',
                    value=str(refresh), 
                    httponly=True,
                    expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                    secure=settings.SESSION_COOKIE_SECURE,
                    samesite='Lax'
                )

            return response
        except (TokenError, InvalidToken) as e:
            return Response({'detail': 'Invalid or expired refresh token'}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    """
    Handles clearing of HttpOnly cookies from browser, since frontend can't do this on its own
    """
    def post(self, request, *args, **kwargs):
        response = Response({"message": "Logout successful."}, status=status.HTTP_200_OK)
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        return response

class ValidateCodeView(APIView):
    def post(self, request):
        email = request.data.get("email")
        code = request.data.get("code")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "Usuário não encontrado"}, status=status.HTTP_404_NOT_FOUND)

        try:
            evc = EmailVerificationCode.objects.filter(user=user, code=code, is_used=False).latest("created_at")
        except EmailVerificationCode.DoesNotExist:
            return Response({"error": "Código inválido ou expirado"}, status=status.HTTP_400_BAD_REQUEST)

        user.is_active = True
        user.save()
        evc.is_used = True
        evc.save()

        return Response({"message": "Usuário validado com sucesso"}, status=status.HTTP_200_OK)

class PromoverUsuarioView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if not request.user.is_authenticated:
            return Response({'erro': 'Autenticação necessária.'}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            perfil_solicitante = request.user.perfil
        except PerfilUsuario.DoesNotExist:
            return Response({'erro': 'Usuário sem perfil.'}, status=status.HTTP_403_FORBIDDEN)

        if perfil_solicitante.papel not in [Papel.ORGANIZADOR, Papel.PRESIDENTE]:
            return Response({'erro': 'Permissão negada.'}, status=status.HTTP_403_FORBIDDEN)

        email_alvo = request.data.get('email')
        novo_papel = request.data.get('papel')

        if novo_papel not in Papel.values:
            return Response({'erro': 'Papel inválido.'}, status=status.HTTP_400_BAD_REQUEST)

        if novo_papel == Papel.PRESIDENTE and perfil_solicitante.papel != Papel.PRESIDENTE:
            return Response({'erro': 'Apenas presidentes podem promover para presidente.'}, status=status.HTTP_403_FORBIDDEN)

        user_alvo = get_object_or_404(User, email=email_alvo)
        perfil_alvo, _ = PerfilUsuario.objects.get_or_create(user=user_alvo)

        perfil_alvo.papel = novo_papel
        perfil_alvo.save()

        return Response({'mensagem': f'{email_alvo} promovido para {novo_papel}.'}, status=status.HTTP_200_OK)

class PalestranteView(APIView):
    def get(self, request):
        palestrantes = Palestrante.objects.all()
        serializer = PalestranteSerializer(palestrantes, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PalestranteSerializer(data=request.data)
        if serializer.is_valid():
            palestrante = serializer.save()

            code = f"{random.randint(100000, 999999)}"
            send_mail(
                subject="Seu código de primeiro acesso",
                message=f"Olá {palestrante.display_name}, seu código de validação é: {code}",
                from_email="noreply@symcomp.ime.usp.br",
                recipient_list=[palestrante.email],
                fail_silently=False,
            )

            return Response(PalestranteSerializer(palestrante).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# class AtividadeView(APIView):
#     authentication_classes = [JWTAuthentication]
#     permission_classes = [IsAuthenticated]
#     
#     def get(self, request):
#         atividades = Atividade.objects.all()
#         serializer = AtividadeSerializer(atividades, many=True)
#         return Response(serializer.data)
#     
#     def post(self, request):
#         serializer = AtividadeSerializer(data=request.data)
# 
#         if not request.user.is_authenticated:
#             return Response({'erro': 'Autenticação necessária.'}, status=status.HTTP_401_UNAUTHORIZED)
#         
#         try:
#             perfil_solicitante = request.user.perfil
#         except PerfilUsuario.DoesNotExist:
#             return Response({'erro': 'Usuário sem perfil'}, status=status.HTTP_403_FORBIDDEN)
# 
#         if perfil_solicitante.papel not in [Papel.ORGANIZADOR, Papel.PRESIDENTE]:
#             return Response({'erro': 'Permissão negada.'}, status=status.HTTP_401_UNAUTHORIZED)
# 
#         if serializer.is_valid():
#             atividade = serializer.save()
#             return Response(AtividadeSerializer(atividade).data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# 
# class CertificateView(APIView):
#     #authentication_classes = [JWTAuthentication]
#     #permission_classes = []
# 
#     def post(self, request):
#         nome = request.data.get("name")
#         email = request.data.get("email")
# 
#         if not nome or not email:
#             return Response(status=status.HTTP_400_BAD_REQUEST)
# 
#         hours = ActivityHistory.get_hours(nome)
# 
#         certificate_gen(nome, hours)
#         return Response(status=status.HTTP_201_CREATED)
