from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from equipe.models import Funcionario, Cargo
from .models import Cliente, Servico, formaDePagamento, Atendimento

from .serializers import (
    FuncionarioSerializer,
    ClienteSerializer,
    ServicoSerializer,
    formaDePagamentoSerializer,
    AtendimentoSerializer,
    AtendenteSerializer,
    HelperSerializer,
)


@api_view(["GET"])
def funcionarios(request):
    if request.method == "GET":
        funcionarios = Funcionario.objects.all()
        serialized_funcionarios = FuncionarioSerializer(funcionarios, many=True)
        return Response(serialized_funcionarios.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def atendentes(request):
    if request.method == "GET":
        atendentes = Funcionario.objects.filter(cargo__icontains="Atendente")
        serialized_atendentes = AtendenteSerializer(atendentes, many=True)
        return Response(serialized_atendentes.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def helpers(request):
    if request.method == "GET":
        helpers = Funcionario.objects.filter(cargo__icontains="Helper")
        serialized_helpers = HelperSerializer(helpers, many=True)
        return Response(serialized_helpers.data, status=status.HTTP_200_OK)


@api_view(["POST", "GET"])
def servicos(request):
    if request.method == "GET":
        servicos = Servico.objects.all()
        serialized_servicos = ServicoSerializer(servicos, many=True)
        return Response(serialized_servicos.data, status=status.HTTP_200_OK)

    elif request.method == "POST":
        serializer = ServicoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        servico = serializer.save()

        if servico is not None:
            return Response("Servico adicionado!", status=status.HTTP_200_OK)


@api_view(["POST", "GET"])
def forma_de_pagamento(request):
    if request.method == "GET":
        forma_de_pagamento = formaDePagamento.objects.all()
        serialized_forma_de_pagamento = formaDePagamentoSerializer(
            forma_de_pagamento, many=True
        )
        return Response(serialized_forma_de_pagamento.data, status=status.HTTP_200_OK)

    elif request.method == "POST":
        serializer = formaDePagamentoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        forma_de_pagamento = serializer.save()

        if forma_de_pagamento is not None:
            return Response("Forma de pagamento adicionado!", status=status.HTTP_200_OK)


@api_view(["POST", "GET"])
def atendimentos(request):
    if request.method == "GET":
        atendimentos = Atendimento.objects.all()
        serialized_atendimentos = AtendimentoSerializer(atendimentos, many=True)
        return Response(serialized_atendimentos.data, status=status.HTTP_200_OK)

    elif request.method == "POST":
        serializer = AtendimentoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        atendimento = serializer.save()

        if atendimento is not None:
            return Response("Atendimento adicionado!", status=status.HTTP_200_OK)


@api_view(["POST", "GET"])
def clientes(request):
    if request.method == "GET":
        clientes = Cliente.objects.all()
        serialized_clientes = ClienteSerializer(clientes, many=True)
        return Response(serialized_clientes.data, status=status.HTTP_200_OK)

    elif request.method == "POST":
        serializer = ClienteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        cliente = serializer.save()

        if cliente is not None:
            return Response("Cliente adicionado!", status=status.HTTP_200_OK)
