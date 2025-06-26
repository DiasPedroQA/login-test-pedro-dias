require('dotenv').config();
const { MailSlurp } = require('mailslurp-client');

// Inicializo o cliente MailSlurp com minha chave da API
const mailslurp = new MailSlurp({ apiKey: process.env.MAILSLURP_API_KEY });

/**
 * Cria uma inbox temporária. A resposta contém id e e-mail.
 */
async function gerarInbox() {
    const inbox = await mailslurp.createInbox();
    return inbox;
}

/**
 * Aguarda o e-mail mais recente chegar e extrai automaticamente o código 2FA (6 dígitos).
 */
async function esperarEmail(inboxId) {
    const email = await mailslurp.waitForLatestEmail(inboxId, 60000, true); // true = only unread
    console.log(`[MailSlurp] E-mail recebido: assunto="${email.subject}"`);
    // Extrai o código 2FA apenas da div correta
    const match = email.body.match(/<div class="verification-code">\s*([0-9]{6})\s*<\/div>/i);
    const codigo = match ? match[1] : null;
    if (!codigo) {
        throw new Error('Não foi possível extrair o código 2FA do e-mail mais recente!');
    }
    return codigo;
}

module.exports = { gerarInbox, esperarEmail };
