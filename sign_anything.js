const crypto = require('crypto');

  const msg = "I love coding in js.";

  const SIGTYPE = 'SHA256';
  const PASS = '';
  const keyType = {
      RSA: 'rsa',
      DSA: 'dsa',
      ECDSA: 'ecdsa',
      ED25: 'ed25519'
  };
  
  // generate key pair
  crypto.generateKeyPair(keyType.RSA, {
      modulusLength: 2048,
      publicKeyEncoding: {
          type: 'spki',
          format: 'pem'
      },
      privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
        //   cipher: 'aes-256-cbc',
        //   passphrase: PASS    
      }
  }, (err, pubKey, prvKey) => {
      console.log(`your Keys:\n\nPRIVATE:\n\n${prvKey}\nPUBLIC:\n\n${pubKey}\n\n`);
      // signing logic executes here
      const signedData = sign(msg, prvKey+'');
      verify({...signedData, msg:'tampered!!.'}, pubKey);
  })

  function sign(msg, prvKey){      
    console.log('message to be signed: ' + msg);
    
    const signer = crypto.createSign(SIGTYPE);
    // update data to be signed with out private key
    signer.update(msg);
    signer.end();
    return { 
        msg: msg, 
        sig: signer.sign(prvKey, 'hex') 
    };
  }
  
  function verify(signedData, pubKey){
    console.log('Verifying.. :', signedData);
    const verifier = crypto.createVerify(SIGTYPE);
    // update data to be verified against the given signature and our pubkey
    verifier.update(signedData.msg); 
    verifier.end();
    console.log(verifier.verify(pubKey, signedData.sig, 'hex'));
  }