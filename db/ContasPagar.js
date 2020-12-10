const mongoose = require("mongoose");
const moment = require('moment');


const schema = mongoose.Schema({
    
    
    SequenciadoRegistro: {
        "type": "Number"
    },
    Identificacao: {
        "type": "Mixed"
    },
    CodigoClienteFornecedor:{
        "type": "Number"
    },
    NumerodoTitulo:{
        "type": "Number"
    },
    DocumentoFiscal:{
        "type": "Number"
    },
    EmpresaEmitente:{
        "type": "Number"
    },
    Filial:{
        "type": "String"
    },
    EmpresaRecebedora:{
        "type": "Number"
    },
    TipodeTitulo:{
        "type": "String"
    },
    DatadeEmissao:{
        "type": "Mixed"
    },
    DatadaEntrada: {
        "type": "Mixed"
    },
    DatadeVencimento: {
        "type": "Mixed"
    },
    DatadaProgramacao:{
        "type": "Mixed"
    },
    CodigodaMoeda:{
        "type": "Mixed"
    },
    ValordoTitulo:{
        "type": "Number"
    },
    TipodeCobranca:{
        "type": "Mixed"
    },
    Banco:{
        "type": "Mixed"
    },
    Agencia:{
        "type": "Mixed"
    },
    Portador:{
        "type": "Mixed"
    },
    Observacao:{
        "type": "String"
    },
    ValordeDesconto:{
        "type": "Number"
    },
    DatadoDesconto:{
        "type": "Mixed"
    },
    ValordeBonificacao:{
        "type": "Mixed"
    },
    ValordePermanencia:{
        "type": "Mixed"
    },
    ValordeMulta:{
        "type": "Mixed"
    },
    ValordeAntecipacao:{
        "type": "Mixed"
    },
    CodigodoIRRF:{
        "type": "Mixed"
    },
    ValordoIRRF:{
        "type": "Mixed"
    },
    CodigodoINSS:{
        "type": "Mixed"
    },
    ValordoINSS:{
        "type": "String"
    },
    CodigodoISS:{
        "type": "Number"
    },
    ValordoISS:{
        "type": "Mixed"
    },
    EnderecodeCobranca:{
        "type": "Mixed"
    },
    CondicaodePagamento:{
        "type": "Mixed"
    },
    CodigodoPIS:{
        "type": "Mixed"
    },
    ValordoPIS:{
        "type": "Mixed"
    },
    CodigodoCOFINS:{
        "type": "Mixed"
    },
    ValordoCOFINS:{
        "type": "Mixed"
    },
    CodigodaContribuicaoSocial:{
        "type": "Mixed"
    },
    ValordaContribuicaoSocial:{
        "type": "Mixed"
    },
    CodigodoINSSI:{
        "type": "Mixed"
    },
    INSSIDED:{
        "type": "Mixed"
    },
    ValordeCotacaodaProvisao:{
        "type": "Mixed"
    },
    CodigodaContaDocumento:{
        "type": "Mixed"
    },
    NumerodoCheque:{
        "type": "Mixed"
    },
    Nominal:{
        "type": "Mixed"
    },
    ChequeNominal:{
        "type": "Mixed"
    },
    BaixadeCheque:{
        "type": "Mixed"
    },
    DatadeCompetencia:{
        "type": "Mixed"
    },
    CodigodeControle:{
        "type": "Mixed"
    },
    BasedeCalculoIRRF:{
        "type": "Mixed"
    },
    BasedeCalculoINSS:{
        "type": "Mixed"
    },
    BasedeCalculoISS:{
        "type": "Mixed"
    },
    BasedeCalculoPIS:{
        "type": "Mixed"
    },
    BasedeCalculoCOFINS:{
        "type": "Mixed"
    },
    BasedeCalculoCSOCIAL:{
        "type": "Mixed"
    },
    BasedeCalculoINSSI:{
        "type": "Mixed"
    },
    BasedeCalculoSEST:{
        "type": "Mixed"
    },
    CodigodoTipodeRendimentoDIRF:{
        "type": "Mixed"
    },
    CodigodaFormadeTributacaoDIRF:{
        "type": "Mixed"
    },
    CodigoSRFdeArreacadacaodoImposto:{
        "type": "Mixed"
    },
    CodigodaObra:{
        "type": "Mixed"
    },
    CodigoFornecedorBeneficiario:{
        "type": "Mixed"
    },
    CodigoDiferimento:{
        "type": "Mixed"
    },
    NomeArquivoExtencao:{
        "type": "Mixed"
    },
    ////interfaceFrupoPagarReceber
    InterfaceGrupoPagarReceber:[{
    
        SequenciadoGrupoPagarReceber:{
            "type": "Mixed"
        },
        CodigodoFornecedor:{
            "type": "Mixed"
        },
        NumerodoTitulo:{
            "type": "Mixed"
        },
        CodigodoGrupo:{
            "type": "Mixed"
        },
        NumerodoCentrodeCusto:{
            "type": "Mixed"
        },
        ValordoGrupo:{
            "type": "Mixed"
        },
        PlanodeCentrodeCusto:{
            "type": "Mixed"
        },
        Historico:{
            "type": "Mixed"
        }
    }]
    
});

// schema.pre('save', function (next) {
//     this.ContasPagar.DatadaProgramacao = moment().format('YYYY-MM-DD');
//     this.ContasPagar.DatadeCompetencia = moment().format('YYYY-MM-DD');
//     this.ContasPagar.DatadeEmissao = moment().format('YYYY-MM-DD');
//     this.ContasPagar.DatadeVencimento = moment().format('YYYY-MM-DD');
//     this.ContasPagar.DatadoDesconto = moment().format('YYYY-MM-DD');
//     this.ContasPagar.DatadaEntrada = moment().format('YYYY-MM-DD');
//     next();
  
//     })

const ContasPagar = mongoose.model('ContasPagar', schema);
module.exports = ContasPagar;
