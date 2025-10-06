const fs = require('fs');

function getPlaceHolderPath() {
    return process.platform === 'win32' ? 'C:\\temp\\private-key.pem' : "/Users/username/Documents/keys/private-key.pem";
}

function hasErrorAsymmetricAlgorithm(algorithm, payload, pathPrivateKey) {
    if (!algorithm) return "O campo 'Algorithm' é obrigatório.";
    if (!payload) return "O campo 'Payload' é obrigatório.";
    if (!pathPrivateKey) return "O campo 'path private key' é obrigatório e tem que terminar em um arquivo .pem.";
    if (!fs.existsSync(pathPrivateKey)) return `Arquivo de chave não encontrado: ${pathPrivateKey}`;
    return null;
}

module.exports = { hasErrorAsymmetricAlgorithm, getPlaceHolderPath };