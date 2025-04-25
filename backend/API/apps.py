from django.apps import AppConfig

class APIConfig(AppConfig):  # Make sure this matches your app name
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'API'  # This must match your app's folder name

    def ready(self):
        import API.signals  # ✅ Import your signals module here
