// tests/account-creation.test.js
// Este teste cobre todo o fluxo de criação de conta com e-mail temporário e código 2FA.

const { test, expect } = require('@playwright/test');
const { SignupPage } = require('../pages/SignupPage');
const { gerarInbox, esperarEmail } = require('../utils/mailslurp');

test('fluxo completo de criação de conta com 2FA via MailSlurp', async ({ page }) => {
    // Crio uma inbox temporária com MailSlurp
    const inbox = await gerarInbox();
    console.log(`📧 E-mail gerado: ${inbox.emailAddress}`);

    // Instancio o Page Object da tela de cadastro
    const signup = new SignupPage(page);

    // Acesso a página inicial
    await signup.acessar();

    // Etapa 1: Preencher o e-mail e clicar em "Sign In"
    await signup.preencherEmail(inbox.emailAddress);
    console.log('E-mail preenchido e botão "Sign In" clicado');

    // Etapa 2: Preencher o código de acesso e clicar em "Continue"
    await signup.preencherAccessCode();

    // Aguardo o código 2FA chegar por e-mail
    const codigo = await esperarEmail(inbox.id);
    console.log(`🔐 Código 2FA recebido: ${codigo}`);

    // Etapa 3: Preencher o código 2FA e finalizar
    await signup.preencher2FA(codigo);

    // Validação final: verifica se a página de sucesso foi carregada (ajuste conforme necessário)
    await expect(page.locator('text=Dashboard')).toBeVisible();
});
