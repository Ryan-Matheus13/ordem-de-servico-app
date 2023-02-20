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


@api_view(["GET", "PUT", "DELETE"])
def funcionario(request, pk):
    try:
        funcionario = Funcionario.objects.get(pk=pk)
    except Funcionario.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serialized_funcionario = FuncionarioSerializer(funcionario)
        return Response(serialized_funcionario.data, status=status.HTTP_200_OK)
    elif request.method == "PUT":
        serialized_funcionario = FuncionarioSerializer(funcionario, data=request.data)
        if serialized_funcionario.is_valid():
            serialized_funcionario.save()
            return Response("Funcionario editado!", status=status.HTTP_200_OK)
        return Response(
            serialized_funcionario.errors, status=status.HTTP_400_BAD_REQUEST
        )
    elif request.method == "DELETE":
        funcionario.delete()
        return Response("Funcionario excluido!", status=status.HTTP_204_NO_CONTENT)


@api_view(["GET", "PUT", "DELETE"])
def servico(request, pk):
    try:
        servico = Servico.objects.get(pk=pk)
    except Servico.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serialized_servico = ServicoSerializer(servico)
        return Response(serialized_servico.data, status=status.HTTP_200_OK)
    elif request.method == "PUT":
        serialized_servico = ServicoSerializer(servico, data=request.data)
        if serialized_servico.is_valid():
            serialized_servico.save()
            return Response("Servico editado!", status=status.HTTP_200_OK)
        return Response(serialized_servico.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        servico.delete()
        return Response("Servico excluido!", status=status.HTTP_204_NO_CONTENT)


@api_view(["POST", "GET"])
def servicos(request):
    servicos = Servico.objects.all()

    if request.method == "GET":
        serialized_servicos = ServicoSerializer(servicos, many=True)
        return Response(serialized_servicos.data, status=status.HTTP_200_OK)

    elif request.method == "POST":
        serializer = ServicoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        servico = serializer.save()

        if servico is not None:
            return Response("Servico adicionado!", status=status.HTTP_200_OK)


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


@api_view(["GET", "PUT", "DELETE"])
def forma_de_pagamento(request, pk):
    try:
        forma_de_pagamento = formaDePagamento.objects.get(pk=pk)
    except formaDePagamento.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serialized_forma_de_pagamento = formaDePagamentoSerializer(forma_de_pagamento)
        return Response(serialized_forma_de_pagamento.data, status=status.HTTP_200_OK)
    elif request.method == "PUT":
        serialized_forma_de_pagamento = formaDePagamentoSerializer(forma_de_pagamento, data=request.data)
        if serialized_forma_de_pagamento.is_valid():
            serialized_forma_de_pagamento.save()
            return Response("forma de pagamento editado!", status=status.HTTP_200_OK)
        return Response(serialized_forma_de_pagamento.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        forma_de_pagamento.delete()
        return Response("forma de pagamento excluido!", status=status.HTTP_204_NO_CONTENT)


@api_view(["POST", "GET"])
def formas_de_pagamento(request):
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


@api_view(["GET", "PUT", "DELETE"])
def atendimento(request, pk):
    try:
        atendimento = Atendimento.objects.get(pk=pk)
    except Atendimento.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serialized_atendimento = AtendimentoSerializer(atendimento)
        return Response(serialized_atendimento.data, status=status.HTTP_200_OK)
    elif request.method == "PUT":
        serialized_atendimento = AtendimentoSerializer(atendimento, data=request.data)
        if serialized_atendimento.is_valid():
            serialized_atendimento.save()
            return Response("Atendimento editado!", status=status.HTTP_200_OK)
        return Response(serialized_atendimento.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        atendimento.delete()
        return Response("Atendimento excluido!", status=status.HTTP_204_NO_CONTENT)


@api_view(["POST", "GET"])
def atendimentos(request, query):
    if request.method == "GET":
        atendimentos = Atendimento.objects.filter(funcionario=query)
        serialized_atendimentos = AtendimentoSerializer(atendimentos, many=True)
        return Response(serialized_atendimentos.data, status=status.HTTP_200_OK)

    elif request.method == "POST":
        serializer = AtendimentoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        atendimento = serializer.save()

        if atendimento is not None:
            return Response("Atendimento adicionado!", status=status.HTTP_200_OK)


@api_view(["GET", "PUT", "DELETE"])
def cliente(request, pk):
    try:
        cliente = Cliente.objects.get(pk=pk)
    except Cliente.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serialized_cliente = ClienteSerializer(cliente)
        return Response(serialized_cliente.data, status=status.HTTP_200_OK)
    elif request.method == "PUT":
        serialized_cliente = ClienteSerializer(cliente, data=request.data)
        if serialized_cliente.is_valid():
            serialized_cliente.save()
            return Response("Cliente editado!", status=status.HTTP_200_OK)
        return Response(serialized_cliente.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        cliente.delete()
        return Response("Cliente excluido!", status=status.HTTP_204_NO_CONTENT)


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

