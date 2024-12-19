from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .serializer import UserSerializer, LoginSerializer
from rest_framework.authtoken.models import Token
from .models import Usuario

# @api_view(['GET'])
class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save() #ejecutar la funcion create  o update del serializer
            return Response({'message': 'Usuario creado con éxito'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data["user"]
            # Crear o recuperar el token del usuario
            token= Token.objects.get_or_create(user=user)
            # print(token[0])
            return Response({
                "message": "Login exitoso",
                "token": token[0].key,
                "username": user.username
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UserSerializer