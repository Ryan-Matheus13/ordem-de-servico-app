from django.contrib import admin
from django.urls import path, include

from .views import funcionarios

urlpatterns = [
    path('funcionarios', funcionarios, name="teste-view"),
]
