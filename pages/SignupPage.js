// pages/SignupPage.js
// Este Page Object representa a tela de criação de conta no Skill5.
// Encapsulo os seletores e ações para deixar os testes mais limpos e reutilizáveis.

const { console } = require("inspector");

class SignupPage {
    constructor(page) {
        this.page = page;

        // Tente ambos os placeholders (português e inglês)
        this.emailInput = page.locator('[placeholder="Digite seu e-mail"], [placeholder="Enter your email"]');
        this.accessCodeInput = page.locator('[placeholder="Digite o código de acesso"], [placeholder="Access Code"]');
        this.codeInput = page.locator('[placeholder="Enter the code"], [placeholder="Digite o código"]'); // ajuste se necessário

        // Botões
        this.signInBtn = page.locator('button:has-text("Sign In"), button:has-text("Entrar")'); // novo
        this.continueBtn = page.locator('button:has-text("Continue"), button:has-text("Continuar")');

        // Cadastro
        this.cadastreSeLink = page.locator('a[href*="sign-up"], a:has-text("Cadastre-se"), a:has-text("Sign up")');
        this.inviteCodeInput = page.locator('[placeholder="Insira seu código de convite"], [placeholder="Enter your invite code"]');
        this.verificarCodigoBtn = page.locator('button:has-text("Verificar Código"), button:has-text("Verify Code")');
        this.nomeInput = page.locator('[placeholder="Digite seu nome completo"], [placeholder="Enter your full name"]');
        this.emailCadastroInput = page.locator('[placeholder="Digite seu e-mail"], [placeholder="Enter your email"]');
        this.empresaInput = page.locator('[placeholder="Nome da Empresa"], [placeholder="Company Name"]');
        // Botão de seleção de cargo (Role)
        this.cargoBtn = page.locator('button[aria-haspopup="listbox"], button:has-text("Selecione seu cargo na empresa"), button:has-text("Select your role"), button:has-text("Role")');
        // Opção do cargo (Development/Desenvolvimento)
        this.cargoOption = page.locator('li:has-text("Development"), li:has-text("Desenvolvimento")');
        // Checkbox de aceite dos termos
        this.aceitarTermosCheckbox = page.locator('input[type="checkbox"][name="accept-terms"]');
        // Botão de criar conta
        this.criarContaBtn = page.locator('button:has-text("Criar Conta"), button:has-text("Create Account")');
    }

    // Acesso à página inicial do site
    async acessar() {
        console.log('[SignupPage] Navegando para a página inicial...');
        try {
            await this.page.goto('/');
            console.log('[SignupPage] Página inicial carregada com sucesso.');
        } catch (e) {
            console.error('[SignupPage] Erro ao acessar a página inicial:', e);
            throw e;
        }
    }

    // Preencher e-mail e clicar em "Sign In"
    async preencherEmail(email) {
        console.log(`[SignupPage] Tentando preencher o campo de e-mail com: ${email}`);
        try {
            await this.emailInput.first().waitFor({ state: 'visible', timeout: 10000 });
            await this.emailInput.first().fill(email);
            console.log('[SignupPage] E-mail preenchido com sucesso.');
            console.log('[SignupPage] Clicando no botão Sign In...');
            await this.signInBtn.first().click();
            console.log('[SignupPage] Botão Sign In clicado.');
        } catch (e) {
            console.error('[SignupPage] Erro ao preencher o e-mail ou clicar em Sign In:', e);
            throw e;
        }
    }

    // Preenchimento do código de acesso fornecido nas instruções do desafio
    async preencherAccessCode() {
        console.log('[SignupPage] Tentando preencher o código de acesso...');
        try {
            await this.accessCodeInput.waitFor({ state: 'visible', timeout: 10000 });
            await this.accessCodeInput.fill('SKILL5-BETA-ACCESS');
            console.log('[SignupPage] Código de acesso preenchido.');
            console.log('[SignupPage] Clicando no botão Continue...');
            await this.continueBtn.click();
            console.log('[SignupPage] Botão Continue clicado.');
        } catch (e) {
            console.error('[SignupPage] Erro ao preencher o código de acesso ou clicar em Continue:', e);
            throw e;
        }
    }

    // Preenchimento do código de verificação 2FA recebido por e-mail
    async preencher2FA(code) {
        console.log(`[SignupPage] Tentando preencher o código 2FA: ${code}`);
        try {
            // Seleciona todos os inputs de OTP (um para cada dígito)
            const otpInputs = await this.page.locator('input[type="tel"][maxlength="1"]').elementHandles();
            if (otpInputs.length === 0) {
                throw new Error('Nenhum input de OTP encontrado!');
            }
            if (code.length !== otpInputs.length) {
                throw new Error(`O código 2FA (${code}) não tem o mesmo número de dígitos que os campos (${otpInputs.length})`);
            }
            // Preenche cada input com o dígito correspondente
            for (let i = 0; i < otpInputs.length; i++) {
                await otpInputs[i].fill(code[i]);
            }
            // Clica no botão Confirmar (Confirm)
            const confirmBtn = this.page.locator('button:has-text("Confirm"), button:has-text("Confirmar")');
            await confirmBtn.waitFor({ state: 'visible', timeout: 10000 });
            await confirmBtn.click();
            console.log('[SignupPage] Código 2FA preenchido e confirmado.');
        } catch (e) {
            console.error('[SignupPage] Erro ao preencher o código 2FA:', e);
            await this.page.screenshot({ path: 'erro-preencher2fa.png' });
            throw new Error('[SignupPage] Não foi possível preencher o código 2FA. Veja erro-preencher2fa.png');
        }
    }

    // Após tentar login, verifica se precisa se cadastrar e clica no link se necessário
    async irParaCadastroSeNecessario() {
        console.log('[SignupPage] Verificando se é necessário ir para o cadastro...');
        try {
            const erro = this.page.locator('text=We couldn\'t find a user with that email');
            if (await erro.isVisible({ timeout: 3000 })) {
                console.log('[SignupPage] Mensagem de usuário não encontrado detectada. Clicando no link de cadastro...');
                const linkCadastro = this.page.locator('a[href="/auth/sign-up"]');
                await linkCadastro.click();
                console.log('[SignupPage] Link de cadastro clicado.');
            } else {
                console.log('[SignupPage] Não foi necessário ir para o cadastro.');
            }
        } catch (e) {
            console.error('[SignupPage] Erro ao verificar ou clicar no link de cadastro:', e);
            throw e;
        }
    }

    async clicarNoLinkCadastro() {
        console.log('[SignupPage] Procurando e clicando no link de cadastro...');
        await this.cadastreSeLink.first().waitFor({ state: 'visible', timeout: 20000 });
        await this.cadastreSeLink.first().click();
        console.log('[SignupPage] Link de cadastro clicado.');
        await this.page.waitForTimeout(1000); // Pequeno delay para garantir carregamento
    }

    async preencherCodigoConvite(codigo) {
        console.log(`[SignupPage] Preenchendo código de convite: ${codigo}`);
        await this.inviteCodeInput.waitFor({ state: 'visible', timeout: 30000 });
        await this.inviteCodeInput.fill(codigo);
        await this.verificarCodigoBtn.click();
        console.log('[SignupPage] Código de convite verificado.');
    }

    async preencherFormularioCadastro({ nome, email, empresa }) {
        console.log('[SignupPage] Preenchendo formulário de cadastro...');
        await this.nomeInput.waitFor({ state: 'visible', timeout: 20000 });
        await this.nomeInput.fill(nome);
        await this.emailCadastroInput.fill(email);
        await this.empresaInput.fill(empresa);

        await this.cargoBtn.waitFor({ state: 'visible', timeout: 20000 });
        await this.cargoBtn.click();
        await this.cargoOption.waitFor({ state: 'visible', timeout: 20000 });
        await this.cargoOption.click();

        await this.aceitarTermosCheckbox.waitFor({ state: 'visible', timeout: 20000 });
        await this.aceitarTermosCheckbox.check();

        await this.criarContaBtn.waitFor({ state: 'visible', timeout: 60000 });
        const criarContaBtnHandle = await this.criarContaBtn.elementHandle();
        await this.page.waitForFunction(
            (btn) => btn && !btn.disabled,
            criarContaBtnHandle
        );
        await criarContaBtnHandle.dispose();
        console.log('[SignupPage] Formulário de cadastro preenchido.');
    }

    async submeterCadastro() {
        console.log('[SignupPage] Submetendo cadastro...');
        await this.criarContaBtn.click();
        console.log('[SignupPage] Cadastro submetido.');
    }
}

module.exports = { SignupPage };
