const mongoose = require("mongoose");
const moment = require('moment');


const schema = mongoose.Schema({  
   
        SequenciadoRegistro: {
            "type": "number"
        },
        Identificacao: {
            "type": "mixed"
        },
        CodigoClienteFornecedor:{
            "type": "number"
        },
        NumerodoTitulo:{
            "type": "number"
        },
        DocumentoFiscal:{
            "type": "number"
        },
        EmpresaEmitente:{
            "type": "number"
        },
        Filial:{
            "type": "mixed"
        },
        EmpresaRecebedora:{
            "type": "mixed"
        },
        TipodeTitulo:{
            "type": "mixed"
        },
        DatadeEmissao:{
            "type": "mixed"
        },
        DatadeVencimento: {
            "type": "mixed"
        },
        DatadaProgramacao:{
            "type": "mixed"
        },
        CodigodaMoeda:{
            "type": "mixed"
        },
        ValordoTitulo:{
            "type": "number"
        },
        TipodeCobranca:{
            "type": "mixed"
        },
        Banco:{
            "type": "mixed"
        },
        Agencia:{
            "type": "mixed"
        },
        Portador:{
            "type": "mixed"
        },
        Observacao:{
            "type": "string"
        },
        ValordeDesconto:{
            "type": "number"
        },
        DatadoDesconto:{
            "type": "mixed"
        },
        ValordeBonificacao:{
            "type": "mixed"
        },
        ValordePermanencia:{
            "type": "mixed"
        },
        ValordeMulta:{
            "type": "mixed"
        },
        ValordeAntecipacao:{
            "type": "mixed"
        },
        CodigodoIRRF:{
            "type": "mixed"
        },
        ValordoIRRF:{
            "type": "mixed"
        },
        CodigodoINSS:{
            "type": "mixed"
        },
        ValordoINSS:{
            "type": "string"
        },
        CodigodoISS:{
            "type": "number"
        },
        ValordoISS:{
            "type": "mixed"
        },
        EnderecodeCobranca:{
            "type": "mixed"
        },
        CondicaodePagamento:{
            "type": "mixed"
        },
        CodigodoPIS:{
            "type": "mixed"
        },
        ValordoPIS:{
            "type": "mixed"
        },
        CodigodoCOFINS:{
            "type": "mixed"
        },
        ValordoCOFINS:{
            "type": "mixed"
        },
        CodigodaContribuicaoSocial:{
            "type": "mixed"
        },
        ValordaContribuicaoSocial:{
            "type": "mixed"
        },
        DatadaEntrada: { 
            "type": "mixed"
        },
        FormadePagamento: { 
            "type": "mixed"
        },
        CodigodoINSSI:{
            "type": "mixed"
        },
        INSSIDED:{
            "type": "mixed"
        },
        ValordeCotacaodaProvisao:{
            "type": "mixed"
        },
        CodigodaContaDocumento:{
            "type": "mixed"
        },
        NumerodoCheque:{
            "type": "mixed"
        },
        Nominal:{
            "type": "mixed"
        },
        ChequeNominal:{
            "type": "mixed"
        },
        BaixadeCheque:{
            "type": "mixed"
        },
        DatadeCompetencia:{
            "type": "mixed"
        },
        CodigodeControle:{
            "type": "mixed"
        },
        BasedeCalculoIRRF:{
            "type": "mixed"
        },
        BasedeCalculoINSS:{
            "type": "mixed"
        },
        BasedeCalculoISS:{
            "type": "mixed"
        },
        BasedeCalculoPIS:{
            "type": "mixed"
        },
        BasedeCalculoCOFINS:{
            "type": "mixed"
        },
        BasedeCalculoCSOCIAL:{
            "type": "mixed"
        },
        BasedeCalculoINSSI:{
            "type": "mixed"
        },
        BasedeCalculoSEST:{
            "type": "mixed"
        },
        DatadeCredito:{
            "type": "mixed"
        },
        NomeArquivoExtencao:{
            "type": "mixed"
        },
        //InterfaceGrupopagarReceber
        InterfaceGrupoPagarReceber:[{

        CodigodoFornecedor:{
            "type": "number"
        },
        NumerodoTitulo:{
            "type": "number"
        },
        CodigodoGrupo:{
            "type": "mixed"
        },
        NumerodoCentrodeCusto:{
            "type": "mixed"
        },
        ValordoGrupo:{
            "type": "mixed"
        },
        PlanodeCentrodeCusto:{
            "type": "mixed"
        },
        Historico:{
            "type": "mixed"
        }
    }]


});

    // schema.pre('save', function (next) {
    // this.ContasReceber.DatadeCredito = moment().format('YYYY-MM-DD');
    // this.ContasReceber.DatadeCompetencia = moment().format('YYYY-MM-DD');
    // this.ContasReceber.DatadeEmissao = moment().format('YYYY-MM-DD');
    // this.ContasReceber.DatadeVencimento = moment().format('YYYY-MM-DD');
    // this.ContasReceber.DatadoDesconto = moment().format('YYYY-MM-DD');
    // next();
  
    // })

const ContasReceber = mongoose.model('ContasReceber', schema);
module.exports = ContasReceber;
