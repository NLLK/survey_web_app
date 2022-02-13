from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User

class GetUserView(APIView):
    # authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        current_user = User.objects.get(username = request.user)
        token = request.headers['Authorization'][6:]
        print(token)
        content = {
            'last_name': current_user.last_name,
            'first_name': current_user.first_name,
            'personnel_id': current_user.personnel_id,
            'username': current_user.username
        }
        return Response(content)
