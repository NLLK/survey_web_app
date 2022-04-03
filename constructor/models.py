from xml.etree.ElementTree import Comment
from django.db import models
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator, RegexValidator
from django.utils import timezone

from authentication.models import User

AUTHOR_PLACEHOLDER = "Не известно"

class Questionnaire(models.Model):
    name = models.CharField(max_length=150)
    author = models.ForeignKey(
        User, on_delete=models.SET_DEFAULT, default=AUTHOR_PLACEHOLDER)
    comment = models.CharField(max_length=300, blank=True)
    fields = models.TextField()
    createdDate = models.DateField(editable=False)
    lastEdited = models.DateTimeField()
    hidden = models.PositiveSmallIntegerField(validators=[RegexValidator(regex = "[01]")])

    introduction = models.TextField(blank=True)
    editing = models.PositiveSmallIntegerField(validators=[RegexValidator(regex = "[01]")])
    userComment = models.TextField(blank=True)

    def save(self, *args, **kwargs):
        if not self.id:
            self.createdDate = timezone.now()
        self.lastEdited = timezone.now()
        return super(Questionnaire, self).save(*args, **kwargs)
