var amqp = require('amqplib/callback_api');
const express = require('express');
var MongoClient = require("mongodb").MongoClient;
var bodyParser = require('body-parser');
const assert = require('assert');
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const queue = require("./queue");
const CryptoJS = require('crypto-js');
var app = express();
var fs = require('fs');
const moment = require('moment'); //lucas
const axios = require('axios');
const Utils = require('./utils')

amqp.connect('amqp://hadministradora:h4Dm1n44@10.190.4.17', function (err, conn) {
    conn.createChannel(function (err, ch) {
        var q = 'Roots.HAdministradora.PosVenda.CadastroContratoBeneficiario';
        ch.assertQueue(q, { durable: false });
        ch.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        ch.consume(q, function
            (msg) {




            let privateKey = "ml}^*uQiQjsy#{(Z";

            let iv = CryptoJS.lib.WordArray.create([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            console.log('iv: ', iv);

            this.keyHash = CryptoJS.SHA256(CryptoJS.enc.Utf8.parse(privateKey));
            console.log('keyHash: ', this.keyHash);

            let key = CryptoJS.lib.WordArray.create(this.keyHash.words.slice(0, 8), 32);
            console.log('key: ', key);

            let cipherBuffer = CryptoJS.enc.Base64.parse(msg.content.toString());
            console.log('cipherBuffer: ', cipherBuffer);

            let cfg = { iv: iv };
            console.log('cfg: ', cfg);

            let paramsData = {
                ciphertext: cipherBuffer
            };
            console.log('ParamsData: ', paramsData);
            let decrypted = CryptoJS.AES.decrypt(msg.content.toString(), key, cfg);
            console.log('decrypted: ', decrypted);

            let resp = decrypted.toString(CryptoJS.enc.Utf8);
            console.log('resp: ', resp);
            

            console.log('decript: ', decrypted.toString(CryptoJS.enc.Utf8));


            
            console.log(" Recebido e decriptografado ", decrypted.toString(CryptoJS.enc.Utf8));
            MongoClient.connect(url, async function (err, database) {
                if (err) {
                    console.log('Erro: ', err);
                } else {
                    var db = database.db("marlin01");
                    var collection = db.collection("mensage");
                    console.log(msg.content.toString());
                    let contratoBeneficiario = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
                    
                  
                    collection.insertMany([contratoBeneficiario], function (err, documents) {
                    console.log({ error: err, affected: documents });
                   
                    let fornecedores = db.collection('fornecedores')
                        documents.ops.map(doc =>{
                            Utils.fornecedorSave(fornecedores, doc.corretora)
                        })
                    })

                    let codigoUfIbge;
                    let dataNascimento = moment(contratoBeneficiario.titular.dataNascimento).format('DD/MM/YYYY')
                    console.log('contratoBeneficiario.titular.endereco: ', contratoBeneficiario.titular.endereco)
                    await axios.get(`https://consulta-api.hmg.marlin.com.br/api/v1/municipios/${contratoBeneficiario.titular.endereco.uf}`, { //work2
                        headers: {
                            'Authorization': 'Bearer _mrwY32qaEeF25TTyrWuRw==',
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }).then(async (resp) => {
                        resp.data.map(data => {
                            codigoUfIbge = data.CodigoIbge
                        })
                        await axios.post('https://prjqualivida.mxmwebmanager.com.br/api/InterfacedoCliente/Gravar', {
                            AutheticationToken: {
                                Username: "TESTEAPI.QUA",
                                Password: "TST90",
                                EnvironmentName: "QUALIVIDAPROJ"
                            },
                            Data: {
                                InterfacedoCliente: [
                                    {
                                        SequenciadoRegistro: 1,
                                        Codigo: contratoBeneficiario.titular.cpf,
                                        TipodePessoa: "F",
                                        Nome: contratoBeneficiario.titular.nome,
                                        CPFouCNPJ: contratoBeneficiario.titular.cpf,
                                        NomeFantansia: "",
                                        TipodoLocaldoIndicadordeInscricaoEstadual: "9",
                                        Inscricao: "",
                                        InscricaoMunicipal: "",
                                        InscricaoSuframa: "",
                                        OrgaoExpeditor: "",
                                        DatadaExpedicao: "",
                                        DatadeNascimento: dataNascimento,
                                        CodigodaNacionalidade: "",
                                        EstadoCivil: contratoBeneficiario.titular.estadoCivil.descricao,
                                        Profissao: contratoBeneficiario.titular.profissao.descricao,
                                        CodigodoGrupo: "",
                                        CodigodoPais: "",
                                        Cep: contratoBeneficiario.titular.endereco.cep,
                                        Endereco: contratoBeneficiario.titular.endereco.logradouro,
                                        NumerodoEndereco: contratoBeneficiario.titular.endereco.numero,
                                        ComplementodoEndereco: contratoBeneficiario.titular.endereco.complemento,
                                        Bairro: contratoBeneficiario.titular.endereco.bairro,
                                        Uf: contratoBeneficiario.titular.endereco.uf,
                                        Cidade: contratoBeneficiario.titular.endereco.cidade,
                                        Email: contratoBeneficiario.titular.email,
                                        Telefone: contratoBeneficiario.titular.numCelular,
                                        CodigodaCidade: codigoUfIbge,
                                        Ativo: "A",
                                        DatadoCadastro: "",
                                        DatadeAtualizacao: "",
                                        DatadeInativacao: "",
                                        Pais: "Brasil",
                                        InterfaceContaCorrentedoCliente: [
                                            {
                                                SequenciadaConta: 1,
                                                CodigodoCliente: contratoBeneficiario.titular.id,
                                                CodigodaContaCorrente: "001",
                                                CodigodoBanco: "341",
                                                NomedoBanco: "",
                                                AgenciadoBanco: "0740",
                                                NomedaAgencia: "",
                                                EnderecodaAgencia: "",
                                                BairrodaAgencia: "",
                                                CidadedaAgencia: "",
                                                UFdaAgencia: "",
                                                CepdaAgencia: "",
                                                NumerodaContaBancaria: "62535-9",
                                                TipodeConta: "",
                                                Competencia: "",
                                                OperacaodeIntegracao: ""
                                            }
                                        ],
                                        InterfaceEnderecodoCliente: [
                                            {
                                                SequenciaClienteEndereco: "1",
                                                CodigoEnderecoAlternativo: "A01",
                                                DescricaoEnderecoAlternativo: "Endereço de cobrança",
                                                NomeCliente: contratoBeneficiario.titular.nome,
                                                EnderecoAlernativo: "",
                                                Numero: "",
                                                Complemento: "",
                                                Bairro: "",
                                                Cidade: "",
                                                UF: "RJ",
                                                CEP: "",
                                                Telefone: "",
                                                CNPJ: "26782341859",
                                                InscricaoEstadual: "",
                                                CodigoRegiao: "",
                                                Email: "",
                                                InscricaoMunicipal: "",
                                                InscricaoSUFRAMA: "",
                                                CodigoCidadeIBGE: "",
                                                CodigoPaisIBGE: "",
                                                TipoLocalIndicadorInscricaoEstadual: "1",
                                                OperacaodeIntegracao: ""
                                            }
                                        ],
                                        InterfaceContabildoCliente: [
                                            {
                                                CodigoCliente: contratoBeneficiario.titular.id,
                                                CodigoEmpresa: "01",
                                                CodigoFilial: "",
                                                CodigoMoeda: "",
                                                NumeroContaContabil: "",
                                                NumeroContaContabilAntecipacao: "",
                                                OperacaodeIntegracao: "",
                                                InterfaceGrupoRecebimentodoCliente: [
                                                    {
                                                        CodigoCliente: contratoBeneficiario.titular.id,
                                                        CodigoEmpresa: "01",
                                                        CodigoFilial: "",
                                                        CodigoMoeda: "",
                                                        CodigoGrupoRecebimento: "310053",
                                                        CodigoImpostoIRRF: "",
                                                        CodigoImpostoINSS: "",
                                                        CodigoImpostoISS: "",
                                                        CodigoImpostoPIS: "",
                                                        CodigoImpostoCOFINS: "",
                                                        CodigoImpostoContribuicaoSocial: "",
                                                        IndicadorGrupoPrincipal: "",
                                                        IdentificadorTipoServico: "",
                                                        CodigoAtividadeEconomica: ""
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                            
                        }).then(resposta => {
                            console.log('=============RESPOSTA================',resposta.data.Messages[0])
                        
                        }).catch(err=>{
                            console.log('mxm fora do ar')    
                        })
                    }).catch(err => {
                        console.log(err)
                    })                  
                }
                    database.close();
                })
        }, { noAck: true });
    });
});



