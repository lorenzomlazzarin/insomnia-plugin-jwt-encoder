const { encodeSymmetricJWT } = require('./templates/symmetric.js');
const { encodeAsymmetricJWT } = require('./templates/asymmetric.js');

module.exports.templateTags = [encodeAsymmetricJWT, encodeSymmetricJWT];