// test-mailslurp.js
// Script rápido para validar a criação de uma inbox temporária via MailSlurp API

require('dotenv').config(); // Carrega variáveis do .env
const { gerarInbox } = require('../utils/mailslurp');

(async () => {
    try {
        // Crio uma inbox temporária
        const inbox = await gerarInbox();

        // Exibo no console o e-mail criado para usar nos testes
        console.log(`Inbox criada com sucesso: ${inbox.emailAddress}`);
    } catch (error) {
        console.error('Erro ao criar inbox:', error);
    }
})();
