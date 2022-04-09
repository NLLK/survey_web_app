from django.core.files import File
from django.http import FileResponse, HttpResponse
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from authentication.models import User
from constructor.models import Questionnaire
from dataStoring.models import DataStorage
from django_project.settings import MEDIA_ROOT

from .excelFunctions import ExcelFunctions

class SendInfo(APIView):
    permission_classes = [AllowAny]  # IsAuthenticated

    def post(self, request, format=None):
        fields = request.data['data']
        qId = request.data['questionnaireId']
        current_user = User.objects.get(username=request.user)
        questionnaire = Questionnaire.objects.get(id=qId)

        record = DataStorage(
            questionnaire=questionnaire,
            author=current_user,
            data=fields
        )
        record.save()
        return Response(status=status.HTTP_200_OK)


class DownloadExcel(APIView):
    permission_classes = [AllowAny]  # IsAuthenticated

    def get(self, request):
        qId = request.query_params['id']
        questionnaire = Questionnaire.objects.get(id = qId)
        fileName = ExcelFunctions.RemoveSpecialSymbols(questionnaire.name+'('+str(questionnaire.id)+')')
        fileName = ExcelFunctions.CreateExcel(fileName, questionnaire.fields, questionnaire.id)

        response = FileResponse(open(fileName, 'rb'))
        return response

# Create your views here.
