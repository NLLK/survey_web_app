from django.db import models
from authentication.models import User

from constructor.models import AUTHOR_PLACEHOLDER, Questionnaire

class DataStorage(models.Model):
    questionnaire = models.ForeignKey(
        Questionnaire, on_delete=models.CASCADE)
    author = models.ForeignKey(
        User, on_delete=models.SET_DEFAULT, default=AUTHOR_PLACEHOLDER)
    data = models.TextField()


# Create your models here.
