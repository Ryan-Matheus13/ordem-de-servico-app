from django import forms
from .models import Atendimento

class descontoForm(forms.ModelForm):
    class Meta:
        model = Atendimento
        fields = ('desconto',)

    def clean_desconto(self):
        if self.cleaned_data["desconto"] > 10:
            raise forms.ValidationError("Limite de desconto excedido")

        return self.cleaned_data["desconto"]