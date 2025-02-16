const crypto = require('node:crypto');
const payloadHashingImpl = require('./payload-hashing-impl');

function payloadHashing(obj){
    const result = payloadHashingImpl(obj, null);
    return crypto.createHash('sha1').update(result).digest('base64');
}

module.exports = payloadHashing