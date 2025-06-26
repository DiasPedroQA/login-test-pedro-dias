// tests/account-creation.test.js
// Este teste cobre todo o fluxo de criação de conta com e-mail temporário e código 2FA.

const { test, expect } = require('@playwright/test');
const { SignupPage } = require('../pages/SignupPage');
const { gerarInbox, esperarEmail } = require('../utils/mailslurp');

test('fluxo completo de cadastro com 2FA via MailSlurp', async ({ page }) => {
    // 1. Cria uma inbox temporária
    const inbox = await gerarInbox();
    console.log(`📧 E-mail gerado: ${inbox.emailAddress}`);

    // 2. Instancia o Page Object
    const signup = new SignupPage(page);

    // 3. Acessa a página inicial
    await signup.acessar();

    // 4. Inicia o fluxo de cadastro
    await signup.clicarNoLinkCadastro();

    // 5. Preenche o código de convite
    await signup.preencherCodigoConvite('SKILL5-BETA-ACCESS');

    // 6. Preenche o formulário de cadastro
    await signup.preencherFormularioCadastro({
        nome: 'Pedro Dias',
        email: inbox.emailAddress,
        empresa: 'Empresa Teste',
        cargo: 'Desenvolvedor'
    });

    // 7. Submete o cadastro
    await signup.submeterCadastro();

    // 8. Aguarda o código 2FA chegar por e-mail
    const codigo = await esperarEmail(inbox.id);
    console.log(`🔐 Código 2FA recebido: ${codigo}`);

    // 9. Preenche o código 2FA
    await signup.preencher2FA(codigo);

    // 10. (Opcional para debug) Pausa para inspeção manual
    // console.log('⏸️ Pausando para inspeção manual. Pressione qualquer tecla para continuar...');
    // await page.pause();

    // 11. Validação final: verifica se o dashboard abriu corretamente
    await expect(page.locator('p:text-is("DASHBOARD")')).toBeVisible({ timeout: 180000 });
});
