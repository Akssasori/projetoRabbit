const express = require("express");
require("./db/DB");
const Contrato = require('./db/Contrato');
const router = express.Router();
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
// require('./utils/redis')
const cors = require("cors");
var app = express();
const { credentials } = require("amqplib/callback_api");
const axios = require('axios');
const moment = require('moment');
const Utils = require("./utils/utils");
const Fornecedor = require("./db/Fornecedor");
const { ObjectId } = require("mongodb");
var CronJob = require('cron').CronJob;
var fs = require('fs');
let converter = require('json-2-csv');



app.use(cors())
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

var createContrato = function (req, res, next) {

	let cliente = req.body;
	let dataNascimento = moment(cliente.titular.dataNascimento).format('DD/MM/YYYY')
	let contrato = new Contrato(req.body);


	contrato.save(async function (err, contrato) {

		if (err) {
			next(err);
		} else {

			let fornecedor = new Fornecedor(cliente.corretora)
			fornecedor.save((err,forne) =>{
					console.log('fornecedor', forne)
			})
			
			let codigoUfIbge;
			await axios.get(`https://consulta-api.hmg.marlin.com.br/api/v1/municipios/${contrato.titular.endereco.uf}`, { 
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
								Codigo: contrato.titular.id,
								TipodePessoa: "F",
								Nome: contrato.titular.nome,
								CPFouCNPJ: contrato.titular.cpf,
								NomeFantansia: "",
								TipodoLocaldoIndicadordeInscricaoEstadual: "9",
								Inscricao: "",
								InscricaoMunicipal: "",
								InscricaoSuframa: "",
								OrgaoExpeditor: "",
								DatadaExpedicao: "",
								DatadeNascimento: dataNascimento,
								CodigodaNacionalidade: "",
								EstadoCivil: contrato.titular.estadoCivil.descricao,
								Profissao: contrato.titular.profissao.descricao,
								CodigodoGrupo: "",
								CodigodoPais: "",
								Cep: contrato.titular.endereco.cep,
								Endereco: contrato.titular.endereco.logradouro,
								NumerodoEndereco: contrato.titular.endereco.numero,
								ComplementodoEndereco: contrato.titular.endereco.complemento,
								Bairro: contrato.titular.endereco.bairro,
								Uf: contrato.titular.endereco.uf,
								Cidade: contrato.titular.endereco.cidade,
								Email: contrato.titular.email,
								Telefone: contrato.titular.numCelular,
								CodigodaCidade: codigoUfIbge,
								Ativo: "A",
								DatadoCadastro: "",
								DatadeAtualizacao: "",
								DatadeInativacao: "",
								Pais: "Brasil",
								InterfaceContaCorrentedoCliente: [
									{
										SequenciadaConta: 1,
										CodigodoCliente: contrato.titular.id,
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
										NomeCliente: contrato.titular.nome,
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
										CodigoCliente: contrato.titular.id,
										CodigoEmpresa: "01",
										CodigoFilial: "",
										CodigoMoeda: "",
										NumeroContaContabil: "",
										NumeroContaContabilAntecipacao: "",
										OperacaodeIntegracao: "",
										InterfaceGrupoRecebimentodoCliente: [
											{
												CodigoCliente: contrato.titular.id,
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
				}).then(resp => {
					res.json({ "resposta Servidor MXM": resp.data.Messages[0], "Dados Enviados": JSON.parse(resp.config.data), "Processo :": resp.data.Data });
				})

			
			})
		}
	});
};

var getFindContrato = function (req, res, next) {
	let administradora = req.query.administradora;
	let operadora = req.query.operadora;
	let dataNascimento = req.query.dataNascimento;
	let nomeTitular = req.query.nomeTitular;
	let entidade = req.query.entidade;
	let skip = req.query.pagina;
	let limit = req.query.tamanhoPagina;


	if (administradora || operadora || dataNascimento || nomeTitular || entidade ) {

		let primeiro = Utils.retornaCampo(1, administradora);
		let segundo = Utils.retornaCampo(2, operadora)
		let terceiro = Utils.retornaCampo(3, dataNascimento);
		let quarto = nomeTitular && nomeTitular !== undefined ? Utils.retornaCampo(4, nomeTitular) : null;
		let quinto = Utils.retornaCampo(5, entidade);

		let propertyArray = [primeiro, segundo, terceiro, quarto, quinto]
		let validPropertyArray = []

		propertyArray.map(v => {
			if (v && v !== undefined && v !== '')
			validPropertyArray.push(v)
		})

		Contrato.find({ $and: validPropertyArray })
			.then(resp => {
				res.json(resp);
			})
	} else if (skip && limit) {
		Contrato.find().then(resp => {
			res.json(resp);
		}).skip(skip).limit(limit)
	} else {
		Contrato.find(function (err, contratos) {
			if (err) {
				next(err);
			} else {
				res.json(contratos);
			}
		})
	}
};

var getFindByIDContrato = function (req, res, next) {
	let vcodigo = req.params.id;
	Contrato.findById({ _id: vcodigo }).then(dados => {
		res.json(dados);
	})
};

var postContratoCobranca = function (req, res, next) {
	let vcodigo = req.params.id;

	Contrato.findById({ _id: vcodigo }).then(data => {
		let dataVencimento = moment(data.titular.dataVencimento).format('DDMMYYYY')
		let dataVigencia = moment(data.titular.dataVigencia).format('DDMMYYYY')

		axios.post('https://prjqualivida.mxmwebmanager.com.br/api/InterfacedoContasPagarReceber/Gravar', {
			AutheticationToken: {
				Username: "TESTEAPI.QUA",
				Password: "TST90",
				EnvironmentName: "QUALIVIDAPROJ"
			},
			Data: {
				InterfacedoContasPagarReceber: [
					{
						SequenciadoRegistro: data.subcontrato.id,
						Identificacao: "PR",
						CodigoClienteFornecedor: data.titular.id,
						NumerodoTitulo: data.subcontrato.id,
						DocumentoFiscal: "",
						EmpresaEmitente: "001",
						Filial: "",
						EmpresaRecebedora: "001",
						TipodeTitulo: "RP",
						DatadeEmissao: dataVigencia,
						DatadeVencimento: dataVencimento,
						DatadaProgramacao: dataVencimento,
						CodigodaMoeda: "BRL",
						ValordoTitulo: "",
						TipodeCobranca: "BL",
						Banco: "",
						Agencia: "",
						Portador: "",
						Observacao: "",
						ValordeDesconto: "",
						DatadoDesconto: "",
						ValordeBonificacao: "",
						ValordePermanencia: "",
						ValordeMulta: "",
						ValordeAntecipacao: "",
						CodigodoIRRF: "",
						ValordoIRRF: "",
						CodigodoINSS: "",
						ValordoINSS: "",
						CodigodoISS: "",
						ValordoISS: "",
						EnderecodeCobranca: "",
						CondicaodePagamento: "",
						CodigodoPIS: "",
						ValordoPIS: "",
						CodigodoCOFINS: "",
						ValordoCOFINS: "",
						CodigodaContribuicaoSocial: "",
						ValordaContribuicaoSocial: "",
						DatadaEntrada: "",
						FormadePagamento: "",
						CodigodoINSSI: "",
						INSSIDED: "",
						ValordeCotacaodaProvisao: "",
						CodigodaContaDocumento: "",
						NumerodoCheque: "",
						Nominal: "",
						ChequeNominal: "",
						BaixadeCheque: "",
						DatadeCompetencia: "",
						CodigodeControle: "",
						BasedeCalculoIRRF: "",
						BasedeCalculoINSS: "",
						BasedeCalculoISS: "",
						BasedeCalculoPIS: "",
						BasedeCalculoCOFINS: "",
						BasedeCalculoCSOCIAL: "",
						BasedeCalculoINSSI: "",
						BasedeCalculoSEST: "",
						DatadeCredito: "",
						NomeArquivoExtencao: "",
						InterfaceGrupoPagarReceber: [
							{
								CodigodoFornecedor: "07930849000103",
								NumerodoTitulo: data.subcontrato.id,
								CodigodoGrupo: "101.1",
								NumerodoCentrodeCusto: "",
								ValordoGrupo: "1500,00",
								PlanodeCentrodeCusto: "",
								PlanodeFluxodeCaixa: "",
								ContadoFluxodeCaixa: "",
								Historico: "",
								CodigodoProjeto: ""
							}
						],
						InterfaceAcrescimoDecrescimodoContasPagarReceber: [
							{
								CodigoClienteFornecedor: data.titular.id,
								NumerodoTitulo: data.subcontrato.id,
								CodigodoAcrescimoouDecrescimo: "02",
								ValordoAcrescimoouDecresimo: "55,00"
							}
						]
					}
				]
			}
		}).then(resp => {
			res.json({ "resposta Servidor MXM": resp.data.Messages[0], "Dados Enviados": JSON.parse(resp.config.data), "Processo :": resp.data.Data });
		})

	})
};

var getTitulo = function (req, res, next) {

	let cliente = req.params.id
	Contrato.find().then(data => {
		// let job = new CronJob('00 57 11 29 * *', function () {
		axios.post('https://prjqualivida.mxmwebmanager.com.br/api/InterfacedoContasPagarReceber/ConsultaTituloReceber', {

			AutheticationToken: {
				Username: "TESTEAPI.QUA",
				Password: "TST90",
				EnvironmentName: "QUALIVIDAPROJ"
			},
			Data: {
				Cliente: cliente,
				NumeroTitulo: "",
				DocumentoFiscal: "",
				CodigoSRF: "",
				CodigoCondicaoPagamento: "",
				CodigoTipoTitulo: "",
				CodigoTituloCobranca: "",
				EmpresaEmitente: "",
				CodigoFilial: "",
				CodigoEmpresaPagadora: "",
				SqProcesso: ""
			}
		}).then(resp => {
			res.json({ "resposta Servidor MXM": resp.data.Messages[0], "Dados Enviados": JSON.parse(resp.config.data), "Processo :": resp.data.Data });
		})
		// }, null, true, 'America/Sao_Paulo');
		// job.start();
	})
};

var getCarteirinha = function (req, res, next) {
	let carteirinha = parseInt(req.params.carteirinha)

	Contrato.findOne({ $and: [{ "titular.numeroCarteirinha": carteirinha }] }).then(resp => {
		res.json(resp);
	})
};

var getCPF = function (req, res, next) {
	let cpf = req.params.cpf
	Contrato.findOne({ $and: [{ "titular.cpf": cpf }] }).then(resp => {
		res.json(resp);
	})
};

var getProposta = function (req, res, next) {
	let proposta = req.params.proposta

	Contrato.findOne({ "numeroProposta": proposta }).then(data => {
		res.json(data);
	})
};

var getFindByIdCsv = function (req, res){

	let operadoraCodigo = req.params.id;
	
	Contrato.find().where({'operadora.id':operadoraCodigo})
		.then(data =>{

		if (data && data.length > 0 ) {	

			let options = {
				delimiter : {
					wrap  : '"', 
					field : ';', 
					eol   : '\r\n'
				},
				prependHeader: true,
				sortHeader: false,
				excelBOM: true,
				trimHeaderValues : true,
				trimFieldValues  : false,
				trimHeaderFields : true,
				expandArrayObjects: false,
				useLocaleFormat:true,
			};

			let arrayCsv = data;
			let arrayNew = [] ;
			let objUsado ;

			if (operadoraCodigo === '1') {

				let objUnimed = {
					operadora: "UNIMED",
					parentesco: arrayCsv[0].titular.dependente[0].grauParentesco.descricao,
					nome: arrayCsv[0].titular.nome,
					datavigencia: arrayCsv[0].titular.dataVigencia,
					dataNascimento: arrayCsv[0].titular.DatadeNascimento,
					sexo: arrayCsv[0].titular.sexo,
					estadoCivil: arrayCsv[0].titular.estadoCivil.descricao,
					nomeMae: arrayCsv[0].titular.nomeMae,
					cpf: arrayCsv[0].titular.cpf,
					rg: arrayCsv[0].titular.rg,
					orgaoEmissor: arrayCsv[0].titular.orgaoEmissor.descricao,
					cep: arrayCsv[0].titular.endereco.cep,
					cidade: arrayCsv[0].titular.endereco.cidade,
					uf: arrayCsv[0].titular.endereco.uf,
					bairro: arrayCsv[0].titular.endereco.bairro,
					dddTelefone: arrayCsv[0].titular.dddTelefone,
					numTelefone: arrayCsv[0].titular.numTelefone,
					dddCelular: arrayCsv[0].titular.dddCelular,
					numCelular: arrayCsv[0].titular.numCelular,
					logradouro: arrayCsv[0].titular.endereco.logradouro,
					numero: arrayCsv[0].titular.endereco.numCelular,
					complemento: arrayCsv[0].titular.endereco.complemento,
				}

				objUsado = objUnimed
			

			} else if (operadoraCodigo === '2'){
				
				let objAssim = { 
					operadora: "ASSIM",
					IdProposta: arrayCsv[0].numeroProposta,
					nome: arrayCsv[0].titular.nome,
					sexo: arrayCsv[0].titular.sexo,
					estadoCivil: arrayCsv[0].titular.estadoCivil.descricao,
					dataNascimento: arrayCsv[0].titular.dataNascimento,
					logradouro: arrayCsv[0].titular.endereco.logradouro,
					complemento: arrayCsv[0].titular.endereco.complemento,
					bairro: arrayCsv[0].titular.endereco.bairro,
					cep: arrayCsv[0].titular.endereco.cep,
					telefone : arrayCsv[0].titular.numCelular,
					cidade:arrayCsv[0].titular.endereco.cidade,
					uf: arrayCsv[0].titular.endereco.uf,
					dataVigencia: arrayCsv[0].dataVigencia,
					parentesco: arrayCsv[0].titular.dependente[0].grauParentesco.descricao,
					nomeMae: arrayCsv[0].titular.nomeMae,
					cpf: arrayCsv[0].titular.cpf,
					acomodacao: arrayCsv[0].plano.acomodacao.descricao,
				}
		
				objUsado = objAssim

			} else if (operadoraCodigo === '3'){
			
				let objIntegral = {
					operadora: "INTEGRAL SAUDE",
					IdProposta: arrayCsv[0].numeroProposta,
					nome: arrayCsv[0].titular.nome,
					dataNascimento: arrayCsv[0].titular.DatadeNascimento,
					parentesco: arrayCsv[0].titular.parentesco,
					sexo: arrayCsv[0].titular.sexo,
					estadoCivil: arrayCsv[0].titular.estadoCivil.descricao,
					cpf: arrayCsv[0].titular.cpf,
					nomeMae: arrayCsv[0].titular.nomeMae,
					dataInicioContrato: arrayCsv[0].titular.dataVigencia,
					logradouro: arrayCsv[0].titular.logradouro,
					numero: arrayCsv[0].titular.numero,
					complemento: arrayCsv[0].titular.complemento,
					bairro: arrayCsv[0].titular.bairro,
					cep: arrayCsv[0].titular.cep,
					cidade:arrayCsv[0].titular.cidade,
					uf: arrayCsv[0].titular.uf,
					numeroCns: arrayCsv[0].titular.numeroCns,
					email: arrayCsv[0].titular.email
				}

				objUsado = objIntegral

			} else if (operadoraCodigo === '28'){
				let objHealthmed ={
					operadora: "HEALTHMED",
					nome: arrayCsv[0].titular.nome,
					dataVigencia: arrayCsv[0].dataVigencia,
					dataNascimento: arrayCsv[0].titular.dataNascimento,
					sexo: arrayCsv[0].titular.sexo,
					estadoCivil: arrayCsv[0].titular.estadoCivil.descricao,
					nomeMae: arrayCsv[0].titular.nomeMae,
					cpf: arrayCsv[0].titular.cpf,
					dataVigencia: arrayCsv[0].dataVigencia,
					rg: arrayCsv[0].titular.rg,
					orgaoEmissor: arrayCsv[0].titular.orgaoEmissor.descricao,
					cep: arrayCsv[0].titular.endereco.cep,
					cidade:arrayCsv[0].titular.endereco.cidade,
					uf: arrayCsv[0].titular.endereco.uf,
					bairro: arrayCsv[0].titular.endereco.bairro,
					dddTelefone: arrayCsv[0].titular.dddTelefone,
					numTelefone: arrayCsv[0].titular.numTelefone,
					dddCelular: arrayCsv[0].titular.dddCelular,
					numCelular: arrayCsv[0].titular.numCelular,
					logradouro: arrayCsv[0].titular.endereco.logradouro,
					numero: arrayCsv[0].titular.endereco.numCelular,
					complemento: arrayCsv[0].titular.endereco.complemento,
					email: arrayCsv[0].titular.email
				}
			
				objUsado = objHealthmed
			}

			arrayNew.push(objUsado)


			let funcaoCallback = function (err, csv) {
				if (err) {
					console.log("Erro: " + err);
				} else {
					fs.writeFile('file.csv', csv, function (err) {
						if (err) throw err;
					
						console.log('file saved');
						res.header('Contente-Type', 'text/csv');
						res.attachment('file.csv');
						res.send(csv);
					
					});
					
				}
			}

			converter.json2csv(arrayNew, funcaoCallback, options);
			
		}else{
			return res.json("Digite um id de operadora valido")
		}	
	})
};

var getFornecedor = function (req, res, next) { 
	let fornecedor = parseInt(req.params.idFornecedor)
		Fornecedor.find({}).then(resp => {
		res.json(resp);
	})
};

var putFornecedor = function (req, res, next) {
	
	let idFornecedor = ObjectId(req.params.id)
	let fornecedor = req.body
	Fornecedor.updateOne(
			{
				_id:idFornecedor
			},
			{
				$set:{
					
					cnpj:parseInt(fornecedor.cnpj),
					nome:fornecedor.nome,
					razaoSocial:fornecedor.razaoSocial,
					possuiSupervisor:fornecedor.possuiSupervisor,
					codigo:fornecedor.codigo,
					email:fornecedor.email,
					indAtivo:fornecedor.indAtivo,
					indLiberacaoColaborador:fornecedor.indLiberacaoColaborador
					
			}
			}
		)
		.then(resp =>{
		res.json(resp);
	})
	
};

var createFornecedor = function (req, res) {
	let idFornecedor = ObjectId(req.params.idFornecedor);
	console.log('idFornecedor: ', idFornecedor)
	Fornecedor.findById({_id: idFornecedor}).then(data => {

		axios.post('https://prjqualivida.mxmwebmanager.com.br/api/InterfacedoFornecedor/Gravar', {
			AutheticationToken: {
				Username: "TESTEAPI.QUA",
				Password: "TST90",
				EnvironmentName: "QUALIVIDAPROJ"				
			},
			Data: {
				InterfacedoFornecedor: [
					{
						SequenciadoRegistro: data.id,
						Codigo: data.codigo,
						TipodePessoa: "J", 
						CPFouCNPJ: data.cnpj,
						Nome: data.nome,
						NomeFantansia: data.nome,
						TipodoLocaldoIndicadordeInscricaoEstadual: "1",
						Inscricao: "26825520",
						InscricaoMunicicipal: "",
						InscricaoSuframa: "",
						FornecedorERural: "N",
						Cooperativa: "N",
						InscricaonoINSS: "",
						ClassenoINSS: "12",
						TetoMaximonoINSS: "",
						SalarioBase: "",
						PisPasep: "",
						QuantidadedeDependente: "0",
						CodigoBrasileirodeOcupacao: "",
						DatadeNascimento: data.dataNascimento,
						EstadoCivil: data.estadoCivil,
						Nacionalidade: "BRA",
						CodigodoPais: "BRA",
						Pais: "Brasil",
						Cep: "20040-901",
						Endereco: "Endereço fornecedor",
						NumerodoEndereco: "500",
						ComplementodoEndereco: "Quadra 1345",
						Bairro: "Centro",
						CodigodaCidade: "3300605",
						Cidade: "Rio de Janeiro",
						Uf: "RJ",
						Telefone: "99999-9999",
						Email: "joaoemaria@bol.en.br",
						Ativo: "A",
						Homologado: "S",
						InformacaoesComplementares: "N",
					}
				]
			}
		}).then(resp => {
			res.json({ "resposta Servidor MXM": resp.data.Messages[0], "Dados Enviados": JSON.parse(resp.config.data), "Processo :": resp.data.Data });
			console.log(data);
		})
		
	})
	
}

router.route('/contrato_beneficiario/csv/:id')
		.get(getFindByIdCsv);


router.route('/contrato_beneficiario/:id/putfornecedor')
	.put(putFornecedor);


router.route('/contrato_beneficiario')
	.post(createContrato)
	.get(getFindContrato);

router.route('/contrato_beneficiario/fornecedor')
	.get(getFornecedor);


router.route('/contrato_beneficiario/:id')
	.get(getFindByIDContrato);

router.route('/contrato_beneficiario/:id/cobrancas')
	.post(postContratoCobranca);


router.route('/contrato_beneficiario/:id/titulos')
	.get(getTitulo);

router.route('/contrato_beneficiario/:cpf/cpf')
	.get(getCPF);

router.route('/contrato_beneficiario/:proposta/proposta')
	.get(getProposta);


router.route('/contrato_beneficiario/:carteirinha/carteirinha')
	.get(getCarteirinha);

router.route('/contrato_beneficiario/:idFornecedor/fornecedor')
	.get(createFornecedor);
	

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);

app.listen(3001)
module.exports = app;




