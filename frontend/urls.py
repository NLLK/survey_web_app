from django.urls import path
from . import views


urlpatterns = [
    path('', views.index ),
    path('constructor', views.index),
    path('account/login', views.index),
    path('account', views.index),
    
]