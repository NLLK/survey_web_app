from django.contrib.auth import views
from django.urls import path
from . import views
urlpatterns = [
    path('getQuestionnaireList/', views.GetQuestionnaireList.as_view())
]
