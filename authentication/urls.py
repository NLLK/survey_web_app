from xml.etree.ElementInclude import include
from django import urls
from django.contrib.auth import views
from django.urls import path, include, re_path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
     #re_path(r'^create/$', views.CreateUserAPIView.as_view()),
     #re_path(r'^login/$', views.authenticate_user),
     path('passwordreset/', TemplateView.as_view(template_name='registration/password_reset.html')),
     path('', include('django.contrib.auth.urls')),
     path('register/', views.Register.as_view(), name = 'register')
]