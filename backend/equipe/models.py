from django.db import models
from django.contrib.auth.models import AbstractUser, Group


class Funcionario(AbstractUser):
    class Meta:
        verbose_name = "funcionario"
        verbose_name_plural = "funcionarios"
        db_table = "funcionarios"


class Cargo(Group):
    class Meta:
        verbose_name = "cargo"
        verbose_name_plural = "cargos"
