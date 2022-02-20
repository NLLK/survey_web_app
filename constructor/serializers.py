from django.core.validators import MaxValueValidator, MinValueValidator
from rest_framework import serializers
from.models import Questionnaire

class QuestionnaireSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=150)
    comment = serializers.CharField(max_length=300, allow_blank=True)

    class Meta:
        model = Questionnaire
        fields = ['name', 'comment']
        optional_fields = ['fields', ]