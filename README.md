# bar

## **Visão Geral**

Este projeto é um sistema de gerenciamento de bar desenvolvido para facilitar as operações diárias, como gerenciamento de pedidos, controle de estoque e geração de relatórios. O sistema é composto por um frontend construído em React, um backend em Python (usando Flask) e um banco de dados MySQL.

## **Funcionalidades Principais**

- **Gestão de Pedidos**: Permite que os funcionários do bar registrem e acompanhem os pedidos dos clientes.
- **Controle de Estoque**: Monitora o estoque de bebidas e ingredientes, alertando sobre a necessidade de reabastecimento.
- **Relatórios**: Geração de relatórios diários, semanais e mensais sobre vendas e estoque.
- **Interface Amigável**: Um design intuitivo e responsivo que pode ser utilizado tanto em desktops quanto em tablets.

## **Tecnologias Utilizadas**

- **Frontend**: React
  - Biblioteca de componentes: React Router
  - Estilização: TailWind
- **Backend**: Python
  - Framework: Flask
- **Banco de Dados**: MySQL
  - ORM: SQLAlchemy
- **Outras Ferramentas**:
  - Gerenciamento de Pacotes: npm (Node Package Manager) para o frontend, pip para o backend
  - Controle de Versão: Git

## **Pré-requisitos**

Certifique-se de ter as seguintes ferramentas instaladas em seu ambiente de desenvolvimento:

- Node.js
- Python
- MySQL

## **Instalação**

### **1. Clonar o Repositório**

### **2. Configuração do Backend (Python/Flask)**

1. Crie e ative um ambiente virtual:

2. Instale as dependências:

   ```bash
   pip install -r requirements.txt
   ```

3. Configure o banco de dados:
   - Crie um banco de dados MySQL e configure as credenciais no arquivo `.env`.

### **3. Configuração do Frontend (React)**

1. Navegue até o diretório do frontend:

   ```bash
   cd frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```
