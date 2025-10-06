function hasErrorSymmetricAlgorithm(algorithm, payload, secretKey) {
    if (!algorithm) return "O campo 'Algorithm' é obrigatório.";
    if (!payload) return "O campo 'Payload' é obrigatório.";
    if (!secretKey) return "O campo 'Secret Key' é obrigatório para algoritmos simétricos.";
    return null;
}

function processSecretKey(secretKey) {
    const bufferSecretKey = Buffer.from(secretKey, 'base64');
    return bufferSecretKey.toString('base64') === secretKey ? bufferSecretKey.toString('utf8') : secretKey;
}

module.exports = { hasErrorSymmetricAlgorithm, processSecretKey };