````markdown
# 💻 Desafio QA Automatizador — login-test-pedro-dias

Este projeto é a minha solução para o desafio técnico de QA Automatizador proposto pela Skill5, cujo objetivo era automatizar todo o fluxo de criação de conta com autenticação 2FA (do tipo email-code) utilizando Playwright e a API do MailSlurp.

## ✅ Objetivo do desafio

Automatizar de forma **100% automatizada** o seguinte fluxo:

1. Acessar a aplicação: [https://beta.skill5.com/pt](https://beta.skill5.com/pt)
2. Gerar um e-mail temporário com a API do MailSlurp
3. Iniciar o processo de criação de conta com esse e-mail
4. Informar o código de acesso: `SKILL5-BETA-ACCESS`
5. Aguardar o recebimento do e-mail com o código de verificação (2FA)
6. Capturar esse código via API e concluir o cadastro
7. Validar que o login foi realizado com sucesso (ex: dashboard visível)

---

## 🧠 Minhas escolhas técnicas

### 🧪 Playwright

Escolhi o Playwright pela sua robustez, suporte nativo a múltiplos browsers e pela facilidade de escrita de testes end-to-end confiáveis. Estou utilizando **JavaScript** puro, sem transpilers ou complicações, para manter o projeto simples e direto.

### 📧 MailSlurp

Para lidar com a verificação por e-mail, utilizei o `mailslurp-client`, que permite criar inboxes temporárias e acessar mensagens via API com segurança e dinamismo. Assim, consigo manter meus testes **idempotentes**, ou seja, podem ser executados várias vezes sem colisão de dados.

### ♻️ Page Object Model (POM)

Implementei a automação com o padrão **Page Object Model**, separando a lógica de páginas (`pages/`) da lógica de testes (`tests/`). Isso melhora a organização, facilita a manutenção e permite reutilizar ações comuns entre testes futuros.

---

## 🛠️ Instalação e execução

### 1. Clonar o repositório
```bash
git clone https://github.com/DiasPedroQA/login-test-pedro-dias.git
cd login-test-pedro-dias
````

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz com a sua API Key do MailSlurp:

```env
MAILSLURP_API_KEY=sua-chave-aqui
```

Use o arquivo `.env.example` como referência.

### 4. Executar os testes

```bash
npx playwright test
```

---

## 📁 Estrutura do projeto

```
login-test-pedro-dias/
├── tests/          # Scripts de teste automatizado
├── pages/          # Page Objects com ações das telas
├── utils/          # Funções auxiliares (ex: MailSlurp)
├── .env.example    # Exemplo de variáveis de ambiente
├── .gitignore
├── package.json
├── playwright.config.js
└── README.md
```

---

## 🔒 Observações finais

Todos os testes são **automatizados do início ao fim**. Não há necessidade de passos manuais. A cada execução, uma nova inbox temporária é criada, o que evita conflitos e garante estabilidade no fluxo.

---

## 📆 Entrega

Este repositório foi desenvolvido para ser enviado como solução até a data limite de **02/07/2025** às 23h59 (horário de Brasília), conforme solicitado.

---

Desenvolvido por **Pedro Dias**

```

---

Se quiser, posso adaptar esse conteúdo para Markdown já formatado e salvar como arquivo local, pronto para ser commitado.

Deseja que eu gere esse `README.md` agora no seu projeto com esse conteúdo ou deseja revisar algum trecho antes?
```
