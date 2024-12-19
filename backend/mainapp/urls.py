from django.urls import path,include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'usuarios', views.UserViewSet,'usuarios')
urlpatterns = [
  
    path('register/', views.UserRegistrationView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('users/v1/',include(router.urls)),
]
