const payloadHashingImpl = require('./payload-hashing-impl');

async function payloadHashing(obj){
    const result = payloadHashingImpl(obj, null);
    return await window.crypto.subtle.digest("SHA-1", new TextEncoder().encode(result));
}

module.exports = payloadHashing