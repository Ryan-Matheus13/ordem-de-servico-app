# Generated by Django 4.1.6 on 2023-02-14 03:21

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Atendimento",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "valor_pago",
                    models.DecimalField(
                        decimal_places=2, max_digits=6, verbose_name="Valor pago"
                    ),
                ),
                (
                    "desconto",
                    models.DecimalField(
                        decimal_places=0, help_text="Desconto até 10%\n", max_digits=2
                    ),
                ),
                (
                    "data_do_servico",
                    models.DateTimeField(verbose_name="Data do serviço"),
                ),
                (
                    "situacao",
                    models.CharField(
                        choices=[
                            ("Em andamento", "Em andamento"),
                            ("Concluido", "Concluido"),
                            ("Cancelado", "Cancelado"),
                        ],
                        max_length=12,
                    ),
                ),
                ("data_do_registro", models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name="Cliente",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "nome",
                    models.CharField(max_length=255, verbose_name="Nome completo"),
                ),
                ("telefone", models.CharField(max_length=11, verbose_name="Telefone")),
                (
                    "logradouro",
                    models.CharField(max_length=255, verbose_name="Logradouro"),
                ),
                ("numero", models.CharField(max_length=11, verbose_name="Numero")),
                ("bairro", models.CharField(max_length=50, verbose_name="Bairro")),
                ("cidade", models.CharField(max_length=50, verbose_name="Cidade")),
                ("estado", models.CharField(max_length=2, verbose_name="Estado")),
                ("data_do_registro", models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name="formaDePagamento",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("pagamento", models.CharField(max_length=255, verbose_name="Serviço")),
                ("data_do_registro", models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name="Servico",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("servico", models.CharField(max_length=255, verbose_name="Serviço")),
                (
                    "valor",
                    models.DecimalField(
                        decimal_places=2, max_digits=6, null=True, verbose_name="Valor"
                    ),
                ),
                ("descricao", models.TextField(verbose_name="Descrição")),
                ("data_do_registro", models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
