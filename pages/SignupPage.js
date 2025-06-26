// pages/SignupPage.js
// Este Page Object representa a tela de criação de conta no Skill5.
// Encapsulo os seletores e ações para deixar os testes mais limpos e reutilizáveis.

const { console } = require("inspector");

class SignupPage {
    constructor(page) {
        this.page = page;

        // Tente ambos os placeholders (português e inglês)
        this.emailInput = page.locator('[placeholder="Digite seu e-mail"], [placeholder="Enter your email"]');
        console.log('encontrei o seletor do e-mail:', this.emailInput);
        this.accessCodeInput = page.locator('[placeholder="Digite o código de acesso"], [placeholder="Access Code"]');
        console.log('encontrei o seletor do código de acesso:', this.accessCodeInput);
        this.codeInput = page.locator('[placeholder="Enter the code"], [placeholder="Digite o código"]'); // ajuste se necessário
        console.log('encontrei o seletor do código 2FA:', this.codeInput);

        // Botões
        this.signInBtn = page.locator('button:has-text("Sign In"), button:has-text("Entrar")'); // novo
        this.continueBtn = page.locator('button:has-text("Continue"), button:has-text("Continuar")');
    }

    // Acesso à página inicial do site
    async acessar() {
        await this.page.goto('/');
    }

    // Preencher e-mail e clicar em "Sign In"
    async preencherEmail(email) {
        console.log('preenchendo o e-mail:', email);
        // Aguarda o campo aparecer (até 10s)
        try {
            await this.emailInput.first().waitFor({ state: 'visible', timeout: 10000 });
        } catch (e) {
            throw new Error('Campo de e-mail não encontrado! Verifique o placeholder no HTML.');
        }
        await this.emailInput.first().fill(email);
        console.log('E-mail preenchido com sucesso:', email);
        console.log('clicando no botão Sign In');
        await this.signInBtn.first().click();
        console.log('Botão Sign In clicado');
    }

    // Preenchimento do código de acesso fornecido nas instruções do desafio
    async preencherAccessCode() {
        await this.accessCodeInput.fill('SKILL5-BETA-ACCESS');
        await this.continueBtn.click();
    }

    // Preenchimento do código de verificação 2FA recebido por e-mail
    async preencher2FA(code) {
        await this.codeInput.fill(code);
        await this.continueBtn.click();
    }
}

module.exports = { SignupPage };
