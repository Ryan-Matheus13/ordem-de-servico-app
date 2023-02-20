from django.contrib import admin
from django.urls import path, include

from .views import (
    funcionario,
    atendentes,
    servicos,
    servico,
    atendimento,
    atendimentos,
    atendimentosAll,
    cliente,
    clientes,
    forma_de_pagamento,
    formas_de_pagamento,
    helpers,
)

urlpatterns = [
    path("funcionario/<int:pk>", funcionario, name="funcionario"),
    path("atendentes", atendentes, name="atendentes"),
    path("helpers", helpers, name="helpers"),
    path("servicos", servicos, name="servicos"),
    path("servico/<int:pk>", servico, name="servico"),
    path("forma-de-pagamento/<int:pk>", forma_de_pagamento, name="forma_de_pagamento"),
    path("formas-de-pagamento", formas_de_pagamento, name="formas_de_pagamento"),
    path("atendimento/<int:pk>", atendimento, name="atendimento"),
    path("atendimentos/<int:query>", atendimentos, name="atendimentos"),
    path("atendimentos-all", atendimentosAll, name="atendimentos-all"),
    path("cliente/<int:pk>", cliente, name="cliente"),
    path("clientes", clientes, name="clientes"),
]
