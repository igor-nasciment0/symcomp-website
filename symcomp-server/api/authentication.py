from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        raw_token = request.COOKIES.get(settings.SIMPLE_JWT.get('AUTH_COOKIE', 'access_token'))
        
        if raw_token is None:
            return None

        # if a token is found validate it
        validated_token = self.get_validated_token(raw_token)
        
        # get the user associated with the token
        return self.get_user(validated_token), validated_token
