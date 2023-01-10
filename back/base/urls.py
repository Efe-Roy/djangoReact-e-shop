from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('', include('accounts.urls')),
    path('admin/', admin.site.urls),
    path('api/', include("store.api.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root= settings.STATIC_ROOT)