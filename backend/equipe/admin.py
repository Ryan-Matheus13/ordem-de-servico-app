from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth.models import Group

from .forms import FuncionarioChangeForm, FuncionarioCreationForm
from .models import Cargo, Funcionario


@admin.register(Funcionario)
class FuncionarioAdmin(auth_admin.UserAdmin):
    form = FuncionarioChangeForm
    add_form = FuncionarioCreationForm
    model = Funcionario
    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (("Informação pessoal"), {"fields": ("first_name", "last_name", "email")}),
        (
            ("Permições do cargo"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                ),
            },
        )
    )


@admin.register(Cargo)
class GroupAdmin(auth_admin.GroupAdmin):
    model = Cargo

admin.site.unregister(Group)
