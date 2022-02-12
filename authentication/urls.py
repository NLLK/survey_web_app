from xml.etree.ElementInclude import include
from django import urls
from django.contrib.auth import views
from django.urls import path, include, re_path
from . import views
from django.views.generic import TemplateView
from django.urls import path, re_path
from rest_framework.authtoken import views as auth_views
urlpatterns = [
    # re_path(r'^create/$', views.CreateUserAPIView.as_view()),
    # re_path(r'^login/$', views.authenticate_user),
    # URLs that do not require a session or valid token\
    # path('login', )
    path('api-token-auth/', auth_views.obtain_auth_token, name = 'api-token-auth'),
    path('who-am-i/', views.ExampleView.as_view())

]
