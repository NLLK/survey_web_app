from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


class User(AbstractUser):
    id = models.BigAutoField(primary_key=True)
    username = models.CharField(
        max_length=140, default='username', unique=True)
    permissions = models.SmallIntegerField(
        validators=[MaxValueValidator(2), MinValueValidator(0)], default=0)
    personnel_id = models.CharField(max_length=30, default='0')
    pass
