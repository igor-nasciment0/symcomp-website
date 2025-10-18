from datetime import timedelta

TOKEN_SETTINGS = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=9),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=14),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "AUTH_COOKIE": "access_token",
}