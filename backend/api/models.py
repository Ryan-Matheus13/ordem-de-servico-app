from django.db import models
from equipe.models import Funcionario


class Cliente(models.Model):
    nome = models.CharField("Nome completo", max_length=255, null=False, blank=False)
    telefone = models.CharField("Telefone", max_length=11, null=False, blank=False)
    cpf = models.CharField("cpf", max_length=15, null=False, blank=False, unique=True)

    logradouro = models.CharField("Logradouro", max_length=255, null=False, blank=False)
    numero = models.CharField("Numero", max_length=11, null=False, blank=False)
    bairro = models.CharField("Bairro", max_length=50, null=False, blank=False)
    cidade = models.CharField("Cidade", max_length=50, null=False, blank=False)
    estado = models.CharField("Estado", max_length=2, null=False, blank=False)

    data_do_registro = models.DateTimeField(auto_now_add=True)
    registrado_por = models.ForeignKey(
        Funcionario,
        on_delete=models.deletion.CASCADE,
        null=False,
        blank=False,
        related_name="funcionario_cliente",
    )


class Servico(models.Model):
    servico = models.CharField("Serviço", max_length=255, null=False, blank=False)
    valor = models.DecimalField(
        "Valor", max_digits=6, decimal_places=2, null=True, blank=False
    )

    data_do_registro = models.DateTimeField(auto_now_add=True)
    registrado_por = models.ForeignKey(
        Funcionario,
        on_delete=models.deletion.CASCADE,
        null=False,
        blank=False,
        related_name="funcionario_servico",
    )

    def __str__(self):
        return self.servico


class formaDePagamento(models.Model):
    pagamento = models.CharField("pagamento", max_length=255, null=False, blank=False)

    data_do_registro = models.DateTimeField(auto_now_add=True)
    registrado_por = models.ForeignKey(
        Funcionario,
        on_delete=models.deletion.CASCADE,
        null=False,
        blank=False,
        related_name="funcionario_pagamento",
    )


class Atendimento(models.Model):
    SITUACAO_CHOICES = (
        ("Em andamento", "Em andamento"),
        ("Concluido", "Concluido"),
        ("Cancelado", "Cancelado"),
    )

    servico = models.ForeignKey(
        Servico,
        on_delete=models.deletion.CASCADE,
        null=False,
        blank=False,
        related_name="Servico",
    )
    funcionario = models.ForeignKey(
        Funcionario,
        on_delete=models.deletion.CASCADE,
        null=False,
        blank=False,
        related_name="funcionario_atendimento",
    )
    cliente = models.ForeignKey(
        Cliente,
        on_delete=models.deletion.CASCADE,
        null=False,
        blank=False,
        related_name="cliente_atendimento",
    )
    helper = models.ForeignKey(
        Funcionario,
        on_delete=models.deletion.CASCADE,
        null=False,
        blank=False,
        related_name="Helper",
    )
    valor_pago = models.DecimalField(
        "Valor pago", max_digits=6, decimal_places=2, null=False, blank=False
    )
    desconto = models.DecimalField(max_digits=2, decimal_places=0, help_text='Desconto até 10%\n', null=False)
    forma_de_pagamento = models.ForeignKey(
        formaDePagamento,
        on_delete=models.deletion.CASCADE,
        null=False,
        blank=False,
        related_name="FormarDePagamento",
    )
    data_do_servico = models.DateTimeField(
        "Data do serviço",
    )
    cliente = models.ForeignKey(
        Cliente,
        on_delete=models.deletion.CASCADE,
        null=False,
        blank=False,
        related_name="cliente_atendimento",
    )
    situacao = models.CharField(max_length=12, choices=SITUACAO_CHOICES)
    data_do_registro = models.DateTimeField(auto_now_add=True)
