Ordem de serviço
============

Isso é uma aplicação feita em [Django](https://www.djangoproject.com/).

Instalação
============

1. Baixe o repositorio `ordem-de-servico-app`

        git clone https://github.com/Ryan-Matheus13/ordem-de-servico-app

2. Va até a pasta do backend.

        cd ordem-de-servico-app/backend

3. Crie um ambiente virtual (certifique-se de ter o python instalado).

        python -m venv ambiente

4. Digite o caminho do ambiente virtual para ativar (certifique-se de que seu windows está com a politica de execução de script ativada para executar o script).

        .\ambiente\Scripts\activate

5. Execute o upgrade do pip.

        python -m install --upgrade pip


6. Dentro da pasta backend digite para instalar as dependencias do backend.

        (ambiente) pip install requirements.txt

7. Em outro terminal abra.

        cd ordem-de-servico-app/frontend/frontendapp

8. Dentro da pasta frontendapp digite para instalar as dependencias do frontend (certifique-se de instalar o node.js antes).

        npm install


Execução
============

1. Com o ambiente virtual aberto inicie o backend.

        (ambiente-virtual) python manage.py runserver

2. Em seguida inicie o frontend dentro da pasta frontendapp.

        npm start

3. Credencial admin.

        Usuário: admin@email.com
        Senha: admin1234

4. Credencial gerente.

        Usuário: gerente@email.com
        Senha: admin1234

5. Credencial atendente.

        Usuário: atendente@email.com
        Senha: admin1234

