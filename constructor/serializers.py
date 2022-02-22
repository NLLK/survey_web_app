from email.policy import default
from django.core.validators import MaxValueValidator, MinValueValidator
from rest_framework import serializers
from.models import Questionnaire

class QuestionnaireSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=150)
    comment = serializers.CharField(max_length=300, allow_blank=True)
    fields = serializers.CharField(required=False, default="{}")
    class Meta:
        model = Questionnaire
        fields = ('id', 'name', 'comment','fields')

class QuestionnaireEditSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=150)
    comment = serializers.CharField(max_length=300, allow_blank=True)
    class Meta:
        model = Questionnaire
        fields = ('id', 'name', 'comment')
