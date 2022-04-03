from django.contrib.auth import views
from django.urls import path

from dataStoring.views import SendInfo, DownloadExcel
urlpatterns = [
    path('sendInfo/', SendInfo.as_view()),
    path('downloadExcel/', DownloadExcel.as_view())

]
