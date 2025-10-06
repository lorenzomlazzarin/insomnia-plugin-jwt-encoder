const jwt = require('jsonwebtoken');
const { hasErrorSymmetricAlgorithm, processSecretKey } = require("../functions/symmetric.functions");
const { createHeader } = require("../functions/general.functions");

const encodeSymmetricJWT = {
    name: "encodeSymmetricJWT",
    displayName: "encode JWT",
    description: "Symmetric",
    args: [
        {
            type: "enum",
            defaultValue: "HS256",
            displayName: "Algorithm",
            description: "encrypt Algorithm",
            options: [
                { displayName: "HS256", value: "HS256" },
                { displayName: "HS384", value: "HS384" },
                { displayName: "HS512", value: "HS512" },
            ],
        },
        {
            type: "string",
            defaultValue: "",
            displayName: "Itens to add on Header",
            description: "The personal header to encode",
            placeholder: '{"kid": "1234"}',
        },
        {
            type: "string",
            defaultValue: "1h",
            displayName: "Time Until Expiration",
            description: "The time until the token expires",
        },
        {
            type: "string",
            defaultValue: "",
            displayName: "Payload",
            description: "The payload to encode",
            placeholder: '{"sub": "1234", "userId": "user_1234"}',
        },
        {
            type: "string",
            defaultValue: "",
            displayName: "Secret Key",
            description: "The secret key to use for encoding (HMAC)",
            placeholder: "your secret key here, normal or base64",
        },
    ],

    async run(context, algorithm, header, timeFromNow, payload, secretKey) {
        const mensagensDeErro = hasErrorSymmetricAlgorithm(algorithm, payload, secretKey);
        if (mensagensDeErro) return mensagensDeErro;

        const headerJson = createHeader(algorithm, header);
        const payloadJson = JSON.parse(payload);
        const secretKeyDescoded = processSecretKey(secretKey)

        try {
            return jwt.sign(payloadJson, secretKeyDescoded, { header: headerJson, expiresIn: timeFromNow });
        } catch (err) {
            return `Erro: ${err.message}. Verifique se a chave secreta está correta para o algoritmo ${algorithm}.`;
        }
    }
}

module.exports = { encodeSymmetricJWT };