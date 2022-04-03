from distutils import command
from traceback import print_tb
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

class SendInfo(APIView):
    permission_classes = [AllowAny]  # IsAuthenticated

    def post(self, request, format=None):
        # objects = Questionnaire.objects.values(
        #     'id', 'name', 'comment').order_by('-lastEdited')
        # content = objects
        return Response({"aboba": 'a'})


# Create your views here.
