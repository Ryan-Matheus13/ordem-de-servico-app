# Generated by Django 4.1.6 on 2023-02-17 12:29

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("equipe", "0003_funcionario_cargo"),
    ]

    operations = [
        migrations.AddField(
            model_name="funcionario",
            name="first_name",
            field=models.CharField(default="a", max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="funcionario",
            name="last_name",
            field=models.CharField(default="a", max_length=50),
            preserve_default=False,
        ),
    ]