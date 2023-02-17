from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from equipe.models import Funcionario, Cargo
from .models import Cliente, Servico, formaDePagamento, Atendimento

from .serializers import (
    FuncionarioSerializer,
    CargoSerializer,
    ClienteSerializer,
    ServicoSerializer,
    formaDePagamentoSerializer,
    AtendimentoSerializer,
    AtendenteSerializer,
)


@api_view(["GET", "POST"])
def funcionarios(request):
    funcionarios = Funcionario.objects.all()
    serialized_funcionarios = FuncionarioSerializer(funcionarios, many=True)
    return Response(serialized_funcionarios.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def atendentes(request):
    atendentes = Funcionario.objects.filter(cargo__icontains="Atendente")
    serialized_atendentes = AtendenteSerializer(atendentes, many=True)
    return Response(serialized_atendentes.data, status=status.HTTP_200_OK)

@api_view(["GET"])
def servicos(request):
    atendentes = Funcionario.objects.filter(cargo__icontains="Atendente")
    serialized_atendentes = AtendenteSerializer(atendentes, many=True)
    return Response(serialized_atendentes.data, status=status.HTTP_200_OK)

@api_view(["GET"])
def atendimentos(request):
    atendentes = Funcionario.objects.filter(cargo__icontains="Atendente")
    serialized_atendentes = AtendenteSerializer(atendentes, many=True)
    return Response(serialized_atendentes.data, status=status.HTTP_200_OK)