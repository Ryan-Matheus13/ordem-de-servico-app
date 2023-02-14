from django.contrib.auth import forms

from .models import Funcionario


class FuncionarioChangeForm(forms.UserChangeForm):
    class Meta(forms.UserChangeForm.Meta):
        model = Funcionario

class FuncionarioCreationForm(forms.UserCreationForm):
    class Meta(forms.UserCreationForm.Meta):
        model = Funcionario