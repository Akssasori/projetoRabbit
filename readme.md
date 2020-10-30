app.post("/encript", (req, res) => {
    let texto = req.body.texto;
    if (texto != null) {
        let privateKey = "ml}^*uQiQjsy#{(Z";
        let iv = CryptoJS.lib.WordArray.create([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        let keyHash = CryptoJS.SHA256(CryptoJS.enc.Utf8.parse(privateKey));
        let key = CryptoJS.lib.WordArray.create(keyHash.words.slice(0, 8), 32);
        let cfg = { iv: iv };
        let encrypted = CryptoJS.AES.encrypt(texto, key, cfg);
        console.log('Texto encriptado: ', CryptoJS.enc.Base64.stringify(encrypted.ciphertext));
        res.status(200).send({ "Criptografou": CryptoJS.enc.Base64.stringify(encrypted.ciphertext) });
    } else {
        console.log("xiiii");
        res.status(403).send({ "error": "Não criptografou" });
    }
});



app.post("/decript", (req, res) => {
    let texto = req.body.texto;
    //let data = "CgWLPFMJOYZ2xy9LWOrXo6vllS7jCXRnb2IRqn33a0fR43gu0j2VOF2ulh0pOYHx9Ff4UfSMw0rfLG6PhanIRQ7Jze46awPQBPcqCGmOvt0ElEFgC1j1Evx79bP4g39rZAcv1+1Nl7lCuXF3TfqcHM/qoM7rFIY15QbO97xX5i2PxFxCj6v5cztOuyrwGAjRM3LD5JfFJaHqk89KjYFRcQ==";

    if (texto != null) {
        this.privateKey = "ml}^*uQiQjsy#{(Z";

        let iv = CryptoJS.lib.WordArray.create([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        console.log('iv: ', iv);

        this.keyHash = CryptoJS.SHA256(CryptoJS.enc.Utf8.parse(this.privateKey));
        console.log('keyHash: ', this.keyHash);

        let key = CryptoJS.lib.WordArray.create(this.keyHash.words.slice(0, 8), 32);
        console.log('key: ', key);

        let cipherBuffer = CryptoJS.enc.Base64.parse(texto);
        console.log('cipherBuffer: ', cipherBuffer);

        let cfg = { iv: iv };
        console.log('cfg: ', cfg);

        this.paramsData = {
            ciphertext: cipherBuffer
        };
        console.log('ParamsData: ', this.paramsData);
        let decrypted = CryptoJS.AES.decrypt(texto, key, cfg);
        console.log('decrypted: ', decrypted);

        let resp = decrypted.toString(CryptoJS.enc.Utf8);
        console.log('resp: ', resp);

        console.log('decript: ', decrypted.toString(CryptoJS.enc.Utf8));
        JSON.stringify(this.resp);
        // return decrypted.toString(CryptoJS.enc.Utf8);
        res.status(200).send({ "Decriptografou": decrypted.toString(CryptoJS.enc.Utf8) });
    } else {
        console.log("xiiii");
        res.status(403).send({ "error": "Não Decriptografou" });
    }
});

//"host": "api-hadministradora.hmg.marlin.com.br",
