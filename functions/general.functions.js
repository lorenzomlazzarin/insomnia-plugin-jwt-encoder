function createHeader(algorithm, header) {
    const headerJson = header ? createPersonalHeader(algorithm, header) : { alg: algorithm, typ: 'JWT' };
    return headerJson;
}

function createPersonalHeader(algorithm, header) {
    let headerJson = JSON.parse(header);
    headerJson.alg = algorithm;
    headerJson.typ = 'JWT';
    return headerJson;
}

module.exports = { createHeader };