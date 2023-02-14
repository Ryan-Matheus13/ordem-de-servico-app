from django.contrib import admin

from .models import Atendimento, Cliente, Servico
from api.forms import descontoForm


@admin.register(Servico)
class ServicoAdmin(admin.ModelAdmin):
    list_display = ("id", "servico", "valor", "descricao", "data_do_registro")
    list_display_links = ("servico",)
    fieldsets = (
        (
            "Dados do serviços",
            {"classes": ("extrapretty"), "fields": ("servico", "valor", "descricao")},
        ),
    )


@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ("id", "nome", "telefone")
    list_display_links = ("nome",)
    fieldsets = (
        (
            "Dados",
            {
                "classes": ("extrapretty"),
                "fields": ("nome", "telefone"),
            },
        ),
        (
            "Endereço",
            {
                "classes": ("extrapretty"),
                "fields": ("logradouro", "numero", "bairro", "cidade", "estado"),
            },
        ),
    )


@admin.register(Atendimento)
class AtendimentoAdmin(admin.ModelAdmin):
    readonly_fields = ("valor_final",)
    list_display = (
        "id",
        "cliente",
        "servico",
        "valor_final",
        "situacao",
        "data_do_servico",
    )
    list_display_links = ("cliente",)
    raw_id_fields = ["cliente"]
    ordering = ("data_do_registro",)
    list_filter = ("data_do_registro",)
    form = descontoForm
    fieldsets = (
        (
            "Dados do atendimento",
            {
                "classes": ("extrapretty"),
                "fields": (
                    "cliente",
                    "servico",
                    "desconto",
                    "valor_final",
                    "data_do_servico",
                    "situacao",
                ),
            },
        ),
    )

    def valor_final(self, obj: Atendimento) -> str:
        return f"R$ {(obj.valor_pago)}"
