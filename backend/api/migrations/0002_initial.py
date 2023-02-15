# Generated by Django 4.1.6 on 2023-02-14 03:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="servico",
            name="registrado_por",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="funcionario_servico",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="formadepagamento",
            name="registrado_por",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="funcionario_pagamento",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="cliente",
            name="registrado_por",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="funcionario_cliente",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="atendimento",
            name="cliente",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="cliente_atendimento",
                to="api.cliente",
            ),
        ),
        migrations.AddField(
            model_name="atendimento",
            name="forma_de_pagamento",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="FormarDePagamento",
                to="api.formadepagamento",
            ),
        ),
        migrations.AddField(
            model_name="atendimento",
            name="funcionario",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="funcionario_atendimento",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="atendimento",
            name="helper",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="Helper",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="atendimento",
            name="servico",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="Servico",
                to="api.servico",
            ),
        ),
    ]