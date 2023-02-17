from django.contrib import admin
from django.urls import path, include

from .views import funcionarios, atendentes

urlpatterns = [
    path('funcionarios', funcionarios, name="funcionarios"),
    path('atendentes', atendentes, name="atendentes"),
]
