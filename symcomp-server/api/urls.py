from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, EmailTokenObtainPairView, ValidateCodeView, PromoverUsuarioView, PalestranteView, RefreshAccessTokenView, MeView
from atividade.views import registrar_presenca 

router = DefaultRouter()

urlpatterns = [
    path("", include(router.urls)),
    path("register/", RegisterView.as_view(), name="register"),
    path("token/", EmailTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('token/refresh/', RefreshAccessTokenView.as_view(), name='token_refresh_cookie'),
    path("validate-code/", ValidateCodeView.as_view(), name="validate_code"),
    path('promover/', PromoverUsuarioView.as_view(), name='promover-usuario'),
    path("palestrante/", PalestranteView.as_view(), name='palestrante'),
    path("me/", MeView.as_view(), name="me"),
    path('atividades/registrar-presenca/', registrar_presenca, name='registrar-presenca'),
]
