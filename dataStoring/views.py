from distutils import command
from traceback import print_tb
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from authentication.models import User
from constructor.models import Questionnaire
from dataStoring.models import DataStorage

class SendInfo(APIView):
    permission_classes = [AllowAny]  # IsAuthenticated

    def post(self, request, format=None):
        fields = request.data['data']
        qId = request.data['questionnaireId']
        current_user = User.objects.get(username=request.user)
        questionnaire = Questionnaire.objects.get(id=qId)

        record = DataStorage(
            questionnaire = questionnaire,
            author = current_user,
            data = fields
        )
        record.save()

        # objects = Questionnaire.objects.values(
        #     'id', 'name', 'comment').order_by('-lastEdited')
        # content = objects
        return Response({"aboba": 'a'})


# Create your views here.
