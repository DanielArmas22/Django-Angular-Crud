from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class Usuario(AbstractUser):
  dni = models.CharField(max_length=8, unique=True)
  telefono = models.CharField(max_length=9)

# class Producto(models.Model):
#   nombre = models.CharField(max_length=50)
#   precio = models.FloatField()
#   descripcion = models.TextField()
#   stock = models.IntegerField()
#   imagen = models.ImageField(upload_to='productos', null=True, blank=True)
