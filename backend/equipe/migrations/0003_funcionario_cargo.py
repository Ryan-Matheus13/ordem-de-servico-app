# Generated by Django 4.1.6 on 2023-02-15 03:14

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("equipe", "0002_alter_funcionario_managers_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="funcionario",
            name="cargo",
            field=models.CharField(default="Gerente", max_length=50),
            preserve_default=False,
        ),
    ]