# Desafio Skill5 - Testes Automatizados com Playwright e MailSlurp

Este projeto automatiza o fluxo de cadastro de usuário na plataforma Skill5, incluindo validação de código 2FA recebido por e-mail temporário (MailSlurp), usando Playwright.

## Pré-requisitos

- Node.js 20+
- Conta no [MailSlurp](https://mailslurp.com/) para geração de e-mails temporários
- Chave de API do MailSlurp

## Instalação

```bash
npm ci
```

## Configuração

Crie um arquivo `.env` na raiz do projeto com sua chave do MailSlurp:

```bash
MAILSLURP_API_KEY=seu_token_aqui
```

## Estrutura dos Arquivos

- `pages/SignupPage.js`: Page Object Model para a tela de cadastro.
- `utils/mailslurp.js`: Funções utilitárias para criar inbox e extrair o código 2FA do e-mail.
- `tests/account-creation.test.js`: Teste E2E cobrindo todo o fluxo de cadastro com 2FA.
- `.github/workflows/playwright.yml`: Pipeline GitHub Actions para rodar os testes automaticamente.

## Rodando os Testes Localmente

```bash
npx playwright test
```

Para depuração visual (modo headed):

```bash
npx playwright test --headed
```

## Pipeline CI (GitHub Actions)

O workflow `.github/workflows/playwright.yml` executa os testes automaticamente a cada push ou pull request na branch `main`.

**Importante:**  
Adicione o segredo `MAILSLURP_API_KEY` nas configurações do repositório no GitHub (`Settings > Secrets and variables > Actions > New repository secret`).

Exemplo de trecho para usar o segredo no workflow:

```yaml
env:
  MAILSLURP_API_KEY: ${{ secrets.MAILSLURP_API_KEY }}
```

## Fluxo Automatizado

1. Cria uma inbox temporária no MailSlurp.
2. Acessa a página inicial e inicia o cadastro.
3. Preenche o formulário, submete e aguarda o e-mail com o código 2FA.
4. Extrai o código 2FA do HTML do e-mail (apenas da `<div class="verification-code">`).
5. Preenche o código 2FA no formulário.
6. Valida se o dashboard foi aberto corretamente.

## Dicas de Debug

- Prints e screenshots são gerados automaticamente em caso de erro.
- Para pausar o teste e inspecionar a tela, descomente `await page.pause();` no teste.

## Personalização

- Ajuste os seletores no `SignupPage.js` caso o front-end mude.
- Para maior robustez, peça ao time de front-end para adicionar `data-testid` nos elementos críticos.

---

**Qualquer dúvida ou sugestão, abra uma issue ou pull request!**

---

## 🔒 Observações finais

Todos os testes são **automatizados do início ao fim**. Não há necessidade de passos manuais. A cada execução, uma nova inbox temporária é criada, o que evita conflitos e garante estabilidade no fluxo.

---

## 📆 Entrega

Este repositório foi desenvolvido para ser enviado como solução até a data limite de **02/07/2025** às 23h59 (horário de Brasília), conforme solicitado.

---

Desenvolvido por **Pedro Dias**
