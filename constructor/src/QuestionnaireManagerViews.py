from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from constructor.serializers import QuestionnaireSerializer, QuestionnaireEditSerializer, QuestionnaireAddSerializer
from constructor.models import Questionnaire, User


class GetQuestionnaireList(APIView):
    permission_classes = [AllowAny]  # IsAuthenticated

    def get(self, request, format=None):
        objects = Questionnaire.objects.values(
            'id', 'name', 'comment').order_by('-lastEdited')
        content = objects
        return Response(content)


class GetQuestionnaire(APIView):
    permission_classes = [AllowAny]  # IsAuthenticated

    def post(self, request, format=None):
        objects = Questionnaire.objects.get(id=request.data['id'])
        serializer = QuestionnaireSerializer(objects)
        content = serializer.data
        return Response(content)


class CreateQuestionnaire(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        current_user = User.objects.get(username=request.user)

        serializer = QuestionnaireAddSerializer(data=request.data)

        if (serializer.is_valid()):
            rec = Questionnaire(
                name=serializer.validated_data['name'],
                author=current_user,
                comment=serializer.validated_data['comment'],
                fields={}
            )
            rec.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EditQuestionnaire(APIView):
    permission_classes = [AllowAny]#IsAuthenticated

    def post(self, request, format=None):
        serializer = QuestionnaireEditSerializer(data=request.data) #full

        if (serializer.is_valid()):
            id = serializer.validated_data['id']
            record = Questionnaire.objects.get(id=id)

            record.name = serializer.validated_data['name']
            record.comment = serializer.validated_data['comment']
            record.fields = serializer.validated_data['fields']

            record.save()
            return Response(status=status.HTTP_202_ACCEPTED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteQuestionnaire(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        Questionnaire.objects.filter(id=request.data['id']).delete()
        return Response(status.HTTP_200_OK)
