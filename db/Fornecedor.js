const mongoose = require("mongoose");
const moment = require('moment');


const schema = mongoose.Schema({
    
        sequenciadoRegistro: {
            "type": "number"
        },
        codigo: {
            "type": "number"
        },
        tipodePessoa:{
            "type": "string"
        },
        cpfoucnpj:{
            "type": "number"
        },
        nome:{
            "type": "string"
        },
        nomeFantasia:{
            "type": "string"
        },
        tipodoLocaldoIndicadordeInscricaoEstadual:{
            "type": "string"
        },
        inscricao:{
            "type": "mixed"
        },
        inscricaoMunicicipal:{
            "type": "number"
        },
        inscricaoSuframa:{
            "type": "number"
        },
        fornecedorERural:{
            "type": "boolean"
        },
        cooperativa:{
            "type":"string"
        },
        inscricaonoINSS:{
            "type": "number"
        },
        classenoINSS:{
            "type": "string"
        },
        tetoMaximonoINSS:{
            "type": "number"
        },
        salarioBase:{
            "type": "number"
        },
        pisPasep:{
            "type": "number"
        },
        quantidadedeDependente:{
            "type": "number"
        },
        codigoBrasileirodeOcupacao:{
            "type": "number"
        },
        datadeNascimento:{
            "type": "date"
        },
        estadoCivil:{
            "type": "string"
        },
        nacionalidade:{
            "type": "string"
        },
        codigodoPais:{
            "type": "number"
        },
        pais:{
            "type": "string"
        },
        cep:{
            "type": "number"
        },
        endereco:{
            "type": "string"
        },
        numerodoEndereco:{
            "type": "number"
        },
        complementodoEndereco:{
            "type": "string"
        },
        bairro:{
            "type": "string"
        },
        codigodaCidade:{
            "type": "number"
        },
        cidade:{
            "type": "string"
        },
        uf:{
            "type":"string"
        },
        telefone:{
            "type":"number"
        },
        email:{
            "type": "string"
        },
        ativo:{
            "type": "string"
        },
        homologado:{
            "type": "string"
        },
        informacaoesComplementares:{
            "type": "string"
        }

},{collection:'fornecedores'});



const Fornecedor = mongoose.model('fornecedores', schema);
module.exports = Fornecedor;





