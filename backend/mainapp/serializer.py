from rest_framework import serializers
from .models import Usuario
from django.contrib.auth import authenticate
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    # id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Usuario
        fields = ['id','first_name','last_name','dni','telefono','username', 'email', 'password']

    def create(self, validated_data):
        # Crear un usuario con un hash de contraseña
        user = Usuario.objects.create_user(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            dni=validated_data['dni'],
            telefono = validated_data['telefono'],
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        if username and password:
            user = authenticate(username=username, password=password)
            if not user:
                raise serializers.ValidationError("Credenciales inválidas.")
        else:
            raise serializers.ValidationError("Se requieren username y password.")
        
        data["user"] = user
        return data