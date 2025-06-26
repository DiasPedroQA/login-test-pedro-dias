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
 * Aguarda o e-mail chegar e extrai automaticamente o código 2FA (6 dígitos).
 */
async function esperarEmail(inboxId) {
    const email = await mailslurp.waitForLatestEmail(inboxId, 60000); // espera até 30s
    const codigo = email.body.match(/\d{6}/)?.[0]; // extrai o código 2FA via regex
    return codigo;
}

module.exports = { gerarInbox, esperarEmail };
