from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class Usuario(AbstractUser):
  dni = models.CharField(max_length=8, unique=True)
  telefono = models.CharField(max_length=9)

