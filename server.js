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
const { db } = require("./db/Contrato");
const { ObjectId } = require("mongodb");
var CronJob = require('cron').CronJob;


app.use(cors())
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const handleError = (res, msg) => {
	return err => {
		console.log(err);
		res.status(500).json({ "error": msg });
	};
};

const handleSucess = (res, msg) => {
	return () => {
		res.json({ "ok": msg });
	};
};

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
					console.log('forneceodr', forne)
			})
			//console.log('data.corretora', cliente.corretora)
			
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

		propertyArray.map(property => {
			if (property && property !== undefined && property !== '')
			validPropertyArray.push(property)
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
var getFornecedor = function (req, res, next) {
	let fornecedor = parseInt(req.params.idFornecedor)
		Fornecedor.find({}).then(resp => {
		res.json(resp);
	})
};
var putFornecedor = function (req, res, next) {
	
	let idFornecedor = ObjectId(req.params.id)
	console.log(idFornecedor)
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
	Fornecedor.findById({_id: id}).then(data =>{
		axios.post('https://prjqualivida.mxmwebmanager.com.brapi/InterfacedoFornecedor/Gravar', {
			AutheticationToken: {
				Username: "TESTEAPI.QUA",
				Password: "TST90",
				EnvironmentName: "QUALIVIDAPROJ"
			},
			Data: {
				InterfacedoFornecedor: [
					{
						SequenciadoRegistro: data.id,
						Codigo: "14270428000169",
						TipodePessoa: "J",
						CPFouCNPJ: "14270428000169",
						Nome: "Fornecedor Belem",
						NomeFantansia: "Fornecedor Belem",
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
						DatadeNascimento: "26051999",
						EstadoCivil: "C",
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
						InterfaceContaCorrentedoFornecedor: [
							{
								CodigodoFornecedor: "14270428000169",
								CodigodaContaCorrente: "012",
								CodigodoBanco: "341",
								NomedoBanco: "itau",
								AgenciadoBanco: "0740",
								NomedaAgencia: "Tutoia",
								EnderecodaAgencia: "Rua Tutoia, 300",
								BairrodaAgencia: "Paraiso",
								CidadedaAgencia: "Sao Paulo",
								UFdaAgencia: "SP",
								CepdaAgencia: "04311-080",
								NumerodaContaBancaria: "62533-9",
								TipodeConta: "C",
								StatusdaConta: "A",
								IndicadordeContaPrincipal: "S"
							}
						],
						InterfaceFornecedorContabil: [
							{
								SequenciadoFornecedorContabil: 1,
								CodigoFornecedor: "14270428000169",
								CodigoEmpresa: "001",
								CodigoFilial: "00",
								CodigoMoeda: "BRL",
								NumeroContaContabil: "",
								NumeroContaContabilAntecipacao: "",
								InterfacedoFornecedorGrupoPagamento: [
									{
										SequenciadoFornecedorGrupoPagamento: "1",
										CodigoFornecedor: "14270428000169",
										CodigoEmpresa: "001",
										CodigoFilial: "00",
										CodigoMoeda: "BRL",
										CodigoGrupoPagamento: "201.2",
										CodigoImpostoIR: "",
										CodigoImpostoINSS: "",
										CodigoImpostoISS: "",
										CodigoImpostoPIS: "",
										CodigoImpostoCOFINS: "",
										CodigoImpostoContribuicaoSocial: "",
										CodigoImpostoINSSI: "",
										CodigoImpostoSEST: "",
										IdentificadorTipoServico: "1",
										CodigoAtividadeEconomica: "2"
									}
								]
							}
						],
						InterfaceFornecedorBeneficiario: [
							{
								CodigodoFornecedor: "14270428000169",
								CodigodoBeneficiario: "95318356087",
								CodigodoTipodeRelacionamento: "3"
							}
						],
						InterfaceFornecedorHistorico: [
							{
								CodigodoFornecedor: "14270428000169",
								DatadaOcorrencia: "10/10/19",
								Historico: "Teste de Historico de fornecedor",
								TipoOcorrencia: "01"
							}
						],
						InterfaceFornecedorInformacoesComplementares: [
							{
								InscricaoEstadualdoParticipante: "",
								InscricaonoINSSdoParticipante: "",
								NumerodeIdentificacaodoTrabalhador: "",
								NumerodaNaturezadaRetencao: "",
								CodigoTipodeAssinante: "",
								ClassificacaonoSimplesNacional: "",
								TipodoClienteServicodeComunicacao: "",
								TipodePessoaEstrangeira: "",
								NIFFornecedorEstrangeiro: "",
								BeneficiarodeRendimentonoExterior: "",
								BeneficiarioDispensadodoNIF: "",
								PaisNaoExigeNIF: ""
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






//putFornecedor
router.route('/contrato_beneficiario/:id/putfornecedor')
	.put(putFornecedor);


router.route('/contrato_beneficiario')
	.post(createContrato)
	.get(getFindContrato);
//getFornecedor
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
	.post(createFornecedor);
	

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);

app.listen(3001)
module.exports = app;




