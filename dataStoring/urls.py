from django.contrib.auth import views
from django.urls import path

from dataStoring.views import SendInfo
urlpatterns = [
    path('sendInfo/', SendInfo.as_view()),

]
