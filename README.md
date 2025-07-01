# 🕒 Sistema de Registro de Ponto

> No projeto é possivel fazer as seguintes operações:
> - Visualização atualizada das horas trabalhadas no dia atual
> - Possibilidade de iniciar ou finalizar um turno
> - Adicionar um comentário complementar ao turno antes de finalizá-lo
> - Acompanhamento do total de horas trabalhadas nos dias anteriores

![Sistema de Ponto - Google Chrome 2025-06-29 20-23-52](https://github.com/user-attachments/assets/8c18e995-c13c-4ac1-9b93-3761fe5e3143)

## Link para o protótipo no Figma

https://www.figma.com/slides/3MtpvKLPVbfhN6WteE9HCA/Sistema-de-ponto---Isabelle-Nunes?node-id=1-95&t=2niZO5CNLwSwKc0s-1

---

## 📚 Menu

- [🔗 Link para o protótipo no Figma]
- [📦 Clonando o projeto]
- [⚙️ Requisitos]
- [🐘 Configuração do banco de dados]
  - [1. Abra o pgAdmin]
  - [2. Crie um servidor]
  - [3. Crie um banco de dados chamado `registro_ponto`]
  - [4. Crie as tabelas]
  - [5. Insira um usuário para teste]
- [🔐 Configuração do arquivo `.env`]
- [🧩 Instalação das dependências]

---

Este é um projeto simples para registro de ponto, feito com:

- **Frontend**: React + TypeScript + Vite + PrimeReact  
- **Backend**: Node.js + Express  
- **Banco de dados**: PostgreSQL
- **Extensão para formatação**: Prettier
- **Plataforma para prototipo**: Figma
  
### 🐳 Sobre o Docker

Este projeto inclui arquivos `Dockerfile` e `docker-compose.yml` preparados para uma futura execução totalmente containerizada (PostgreSQL, backend e frontend). Atualmente, o projeto é executado manualmente. Os containers ainda não estão funcionando 100% e exigem ajustes, então optei por deixar o uso do Docker como opcional no momento.

---

## 📁 Clonando o projeto

Para começar, clone este repositório usando o terminal do VS Code:

```bash
git clone https://github.com/IsabelleNFerreira/sistema-de-ponto-ilumeo.git
cd sistema-de-ponto-ilumeo
```

## ⚙️ Requisitos

Antes de rodar o projeto, você precisa ter os seguintes softwares instalados na sua máquina:

- [**Node.js (versão LTS)**](https://nodejs.org/) — necessário para rodar `npm install` e iniciar o projeto.
- [**PostgreSQL**](https://www.postgresql.org/download/) — para criar o banco de dados e as tabelas.

---

## 🐘 Configuração do banco de dados

Você precisa ter o **PostgreSQL** instalado e rodando.
É necessario criar as tabelas com os nomes corretos e adicionar um dado na tabela de Usuarios para ser possível fazer o registro de ponto ao usar a tela.

### 1. Abra o pgAdmin

Após instalar o PostgreSQL, abra o **pgAdmin** (a interface gráfica que vem com ele).

Se for seu primeiro acesso, será necessário criar uma conexão com o servidor local.

### 2. Crie um servidor (caso ainda não exista)

1. No canto esquerdo (em **Servers**), clique com o botão direito em **"Servers"** e selecione **Create > Server...**
2. Na aba **General**, coloque um nome, como: `Local`
3. Na aba **Connection**:
   - **Host name/address**: `localhost`
   - **Port**: `5432`
   - **Username**: `postgres` (ou o que você definiu na instalação)
   - **Password**: sua senha do PostgreSQL
4. Clique em **Save**

---

### 3. Crie um banco de dados chamado `registro_ponto`

1. No menu lateral, expanda seu servidor > clique com o botão direito em **Databases** > **Create > Database**
2. Defina o nome: `registro_ponto`
3. Clique em **Save**

---

### 4. Crie as tabelas

Com o banco `registro_ponto` selecionado, vá em **Query Tool** e cole os comandos abaixo:

```sql
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  senha TEXT NOT NULL
);

CREATE TABLE registros (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES usuarios(id),
  entrada TIMESTAMP,
  saida TIMESTAMP,
  comentario TEXT,
  total_horas INTERVAL
);
```

### 5. Insira um usuário para teste

```sql
INSERT INTO usuarios (email, senha)
VALUES ('teste@empresa.com', '123456');
```

## 🔐 Configuração do arquivo `.env`

No diretório do **backend**, crie um arquivo chamado `.env` com o seguinte conteúdo:

```env
DB_HOST=localhost
DB_PORT=5432  #porta padrão
DB_USER=postgres   #usuario padrão
DB_PASSWORD=****    #preencha com a senha que voce definiu no postgrsql
DB_DATABASE=registro_ponto   #nome do banco criado anteriormente
```

> ⚠️ **Atenção:** O arquivo `.env` não é incluído no repositório por segurança.  
> Você precisa criá-lo manualmente conforme mostrado acima.

## 🧩 Instalação das dependências

Abra **dois terminais** (ou abas) no VS Code:

### ▶️ Terminal 1 – Backend

```bash
cd backend
npm install
node index.js
```
### ▶️ Terminal 2 – Frontend

```bash
cd frontend
npm install
npm run dev
```
