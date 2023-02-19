from rest_framework import serializers

from equipe.models import Funcionario, Cargo
from .models import Cliente, Servico, formaDePagamento, Atendimento


class FuncionarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Funcionario
        fields = "__all__"


class AtendenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Funcionario
        fields = ("id", "first_name", "last_name", "email", "created_at")


class HelperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Funcionario
        fields = ("id", "first_name", "last_name", "email", "created_at")


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = "__all__"


class ServicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servico
        fields = "__all__"


class formaDePagamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = formaDePagamento
        fields = "__all__"


class AtendimentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Atendimento
        fields = "__all__"
