from rest_framework import serializers
from .models import Usuario
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Usuario
        fields = ['first_name','last_name','username', 'email', 'password']

    def create(self, validated_data):
        # Crear un usuario con un hash de contraseña
        user = Usuario.objects.create_user(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user