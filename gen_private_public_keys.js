const {generateKeyPair} = require('crypto');

const keyType = {
    RSA: 'rsa',
    DSA: 'dsa',
    EC: 'ec',
    ECDSA: 'ecdsa',
    ED25: 'ed25519',
    ED4: 'ed448', 
    X255: 'x25519', 
    X448: 'x448',
    DH: 'dh'
};

generateKeyPair(keyType.RSA, {
    modulusLength: 4096,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: 'typein_secret_here_!!'
    }
}, (err, pubKey, prvKey) => {
    console.log(`your Keys:\n\nPRIVATE:\n\n${prvKey}\nPUBLIC:\n\n${pubKey}\n\n`);
})



// var crypto = require('crypto');

// var prime_length = 60;
// var diffHell = crypto.createDiffieHellman(prime_length);

// diffHell.generateKeys('base64');
// console.log("Public Key : " ,diffHell.getPublicKey('base64'));
// console.log("Private Key : " ,diffHell.getPrivateKey('base64'));

// console.log("Public Key : " ,diffHell.getPublicKey('hex'));
// console.log("Private Key : " ,diffHell.getPrivateKey('hex'));