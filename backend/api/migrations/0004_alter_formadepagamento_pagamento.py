# Generated by Django 4.1.6 on 2023-02-18 21:41

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0003_remove_servico_descricao"),
    ]

    operations = [
        migrations.AlterField(
            model_name="formadepagamento",
            name="pagamento",
            field=models.CharField(max_length=255, verbose_name="pagamento"),
        ),
    ]
