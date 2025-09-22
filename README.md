# Custom Node n8n: Gerador de Números Aleatórios

Este repositório contém um nó customizado para a plataforma [n8n](https://n8n.io/) que gera números aleatórios utilizando a API do `random.org`. O projeto também inclui um ambiente Docker completo para executar o n8n com um banco de dados PostgreSQL e um workflow de exemplo para demonstrar o uso.

---

## ✨ Funcionalidades

-   **Aleatoriedade**: Utiliza a API do `random.org` para fornecer números aleatórios.
-   **Intervalo Configurável**: Permite definir valores de mínimo e máximo para o gerador.
-   **Integração Simples**: Adiciona o nó "Random" à sua paleta de ferramentas do n8n para ser usado em qualquer workflow.
-   **Ambiente Completo**: Inclui um arquivo `docker-compose.yml` para iniciar rapidamente o n8n e o PostgreSQL.
-   **Workflow de Exemplo**: Um workflow pré-construído demonstra como gerar um número e armazená-lo no banco de dados.

## 🚀 Começando

Siga estas instruções para ter uma cópia do projeto rodando na sua máquina local para desenvolvimento e teste.

### Pré-requisitos

Para executar este projeto, você precisará ter instalados:

-   [Node.js](https://nodejs.org/) (versão 22 LTS)
-   [Docker](https://docs.docker.com/get-docker/)
-   [Docker Compose](https://docs.docker.com/compose/install/)

### ⚙️ Instalação e Configuração

1.  **Clone o repositório:**
    ```sh
    git clone https://github.com/lucasfrgabriel/randnumber.git
    cd randnumber
    ```

2. **Instale as dependências**
    Para instalar as depêndencias de typescript, gulp e n8n, digite no terminal:
    ```sh
    npm install
    ```

3.  **Compile o nó:**
    O código-fonte do nó é escrito em TypeScript. Você precisa compilá-lo para JavaScript para que o n8n possa usá-lo.
    ```sh
    npm run build
    ```

4.  **Inicie os Serviços com Docker Compose:**
    Este comando irá iniciar os contêineres do n8n e do PostgreSQL. O n8n já irá carregar o nó customizado automaticamente.
    ```sh
    docker-compose up -d
    ```

5.  **Acesse o n8n:**
    Abra seu navegador e acesse `http://localhost:5678`.

6.  **Importe o Workflow de Exemplo:**
    - Na tela do n8n, vá em `File` > `Import from File`.
    - Selecione o arquivo `workflow/defaultWorkflow.json` que está na pasta do projeto.

7.  **Configure a Credencial do Banco de Dados:**
    O workflow de exemplo precisa de uma credencial para se conectar ao PostgreSQL.
    - No workflow importado, clique no nó "Insert rows in a table".
    - No parâmetro "Credential", clique em "Create New".
    - Selecione **Postgres**.
    - Preencha o formulário com as seguintes credenciais:`:
        - **Host**: `postgres`
        - **Database**: `dbRand`
        - **User**: `lucasfrgabriel`
        - **Password**: `12345`
        - **Port**: `5432`
    - Salve a credencial.
    - Adicione a mesma credencial ao nó "Select rows from a table".

8.  **Execute o Workflow:**
    Ative o workflow no canto superior direito e clique em "Execute workflow" para vê-lo em ação.

### 🎯 Executando os Testes

Após configurar o ambiente e as credenciais, você pode testar o fluxo para garantir que o nó customizado está funcionando e se integrando corretamente com o banco de dados.

#### Passo a passo

1. **Abra o Workflow**  
   Na interface do n8n, certifique-se de que o workflow importado (`defaultWorkflow.json`) está aberto.

2. **Selecione o Nó "Random"**

3. **Altere os Inputs**  
   Nos campos de propriedade, altere os valores de **Min** e **Max** para um intervalo de sua escolha.  

   **Exemplo:**
   ```plaintext
   Min: 1
   Max: 10

Repita o processo com diferentes intervalos de "Min" e "Max" para verificar se o nó se comporta como esperado e se os dados são persistidos corretamente no banco de dados.
