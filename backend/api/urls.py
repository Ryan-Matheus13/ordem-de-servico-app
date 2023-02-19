from django.contrib import admin
from django.urls import path, include

from .views import (
    funcionarios,
    atendentes,
    servicos,
    atendimentos,
    clientes,
    forma_de_pagamento,
    helpers,
)

urlpatterns = [
    path("funcionarios", funcionarios, name="funcionarios"),
    path("atendentes", atendentes, name="atendentes"),
    path("helpers", helpers, name="helpers"),
    path("servicos", servicos, name="servicos"),
    path("forma-de-pagamento", forma_de_pagamento, name="forma_de_pagamento"),
    path("atendimentos", atendimentos, name="atendimentos"),
    path("clientes", clientes, name="clientes"),
]
