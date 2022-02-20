from django.contrib.auth import views
from django.urls import path
from .src import QuestionnaireManagerViews as QMviews
urlpatterns = [
    path('getQuestionnaireList/', QMviews.GetQuestionnaireList.as_view()),
    path('createQuestionnaire/', QMviews.CreateQuestionnaire.as_view()),
    path('deleteQuestionnaire/', QMviews.DeleteQuestionnaire.as_view()),
]
