const jwt = require('jsonwebtoken');
const fs = require('fs');
const { getPlaceHolderPath, hasErrorAsymmetricAlgorithm } = require("../functions/asymmetric.functions");
const { createHeader } = require("../functions/general.functions");

const encodeAsymmetricJWT = {
    name: "encodeAsymmetricJWT",
    displayName: "encode JWT",
    description: "Asymmetric",
    args: [
        {
            type: "enum",
            defaultValue: "RS256",
            displayName: "Algorithm",
            description: "encrypt Algorithm",
            options: [
                { displayName: "RS256", value: "RS256" },
                { displayName: "RS384", value: "RS384" },
                { displayName: "RS512", value: "RS512" },
                { displayName: "ES256", value: "ES256" },
                { displayName: "ES384", value: "ES384" },
                { displayName: "ES512", value: "ES512" },
                { displayName: "PS256", value: "PS256" },
                { displayName: "PS384", value: "PS384" },
                { displayName: "PS512", value: "PS512" },
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
            displayName: "Path Private Key",
            placeholder: getPlaceHolderPath(),
            description: "The private key to use for encoding",
        },
    ],

    async run(context, algorithm, header, timeFromNow, payload, pathPrivateKey) {
        const mensagensDeErro = hasErrorAsymmetricAlgorithm(algorithm, payload, pathPrivateKey);
        if (mensagensDeErro) return mensagensDeErro;

        const headerJson = createHeader(algorithm, header);
        const payloadJson = JSON.parse(payload);
        const privateKey = fs.readFileSync(pathPrivateKey, 'utf8');

        try {
            return jwt.sign(payloadJson, privateKey, { header: headerJson, expiresIn: timeFromNow });
        } catch (err) {
            return `Erro: ${err.message}. Verifique se a chave privada é compatível com o algoritmo ${algorithm}.`;
        }
    }
}

module.exports = { encodeAsymmetricJWT };