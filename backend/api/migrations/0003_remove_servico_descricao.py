# Generated by Django 4.1.6 on 2023-02-18 13:03

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0002_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="servico",
            name="descricao",
        ),
    ]
