from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.validators import UnicodeUsernameValidator

class User(AbstractUser):
    #id = models.BigAutoField(primary_key=True)
    permissions = models.SmallIntegerField(
        validators=[MaxValueValidator(2), MinValueValidator(0)], default=0)
    #0 - unauthenticated, 1 - call manager, 2 - senior manager, 3 - admin
    personnel_id = models.CharField(max_length=30, blank=True)
    pass
