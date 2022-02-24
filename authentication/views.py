from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from authentication.serializers import UserSerializer
from .models import User


class Error:
    error = {'Error': "Error"}

    def __init__(self, string):
        self.error = {'Error': string}


class GetUserView(APIView):
    # authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        current_user = User.objects.get(username=request.user)
        # token = request.headers['Authorization'][6:]
        # print(token)
        content = {
            'last_name': current_user.last_name,
            'first_name': current_user.first_name,
            'personnel_id': current_user.personnel_id,
            'username': current_user.username,
            'permissions': current_user.permissions
        }
        return Response(content)


class CreateUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):

        data = request.data

        serializer = UserSerializer(data=data)
        #print("got data", data)
        if (serializer.is_valid()):

            data = serializer.validated_data
            if True:
                # try:
                user = User.objects.create_user(
                    username=data['username'],
                    password=data['password'],
                    last_name=data['last_name'],
                    first_name=data['first_name'],
                    personnel_id=data['personnel_id'],
                )
            # except:
            #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SetPassword(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        password = request.data['password']
        username = request.data['username']

        if (username in ['admin', 'nllk']):
            return Response(Error('Error').error, status=status.HTTP_400_BAD_REQUEST)

        try:
            uid = User.objects.get(username=username)
            print(uid.username)
        except Exception:
            return Response(Error('Error').error, status=status.HTTP_400_BAD_REQUEST)
        else:
            uid.set_password(password)
            uid.save()
            return Response(status.HTTP_200_OK)


class Logout(APIView):
    def get(self, request, format=None):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)
