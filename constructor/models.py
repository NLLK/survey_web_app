from xml.etree.ElementTree import Comment
from django.db import models
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils import timezone

from authentication.models import User

AUTHOR_PLACEHOLDER = "Не известно"


class Questionnaire(models.Model):
    name = models.CharField(max_length=150)
    author = models.ForeignKey(
        User, on_delete=models.SET_DEFAULT, default=AUTHOR_PLACEHOLDER)
    comment = models.CharField(max_length=150, blank=True)
    fields = models.TextField()
    createdDate = models.DateField(editable=False)
    lastEdited = models.DateTimeField()

    def save(self, *args, **kwargs):
        if not self.id:
            self.createdDate = timezone.now()
        self.lastEdited = timezone.now()
        return super(Questionnaire, self).save(*args, **kwargs)


class DataStorage(models.Model):
    questionnaire = models.ForeignKey(
        Questionnaire, on_delete=models.CASCADE)
    author = models.ForeignKey(
        User, on_delete=models.SET_DEFAULT, default=AUTHOR_PLACEHOLDER)
    data = models.TextField()
