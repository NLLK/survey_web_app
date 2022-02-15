from dataclasses import fields
from unittest.util import _MAX_LENGTH
from wsgiref.validate import validator
from rest_framework import serializers
from.models import User
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.core.validators import MaxValueValidator, MinValueValidator
class UserSerializer(serializers.ModelSerializer):
    # username = serializers.CharField(
    #     max_length = 140,
    #     validators = [UnicodeUsernameValidator()]
    # )
    first_name = serializers.CharField(
        max_length = 150
    )
    last_name = serializers.CharField(
        max_length = 150
    )
    
    class Meta:
        model = User
        fields = '__all__'
        #fields = ('username','password','first_name','last_name','permissions','personnel_id')