const Fornecedor = require('../db/Fornecedor');

module.exports = {

    retornaCampo: (status, CampoSelecionado) => {
        let statusConvertido = parseInt(status)

        switch (statusConvertido) {

            case 1:
                let administradora
                let administradoraRegex
               

                if (CampoSelecionado){
                    administradoraRegex = new RegExp(CampoSelecionado, 'i');
                    administradora = { "administradora.razaoSocial": { $in: [administradoraRegex] } }
                    // administradora = { "administradora.razaoSocial": CampoSelecionado }
                }

                else
                    administradora = {}

                return administradora;
                break
            case 2:
                let operadora
                let operadoraRegex

                if (CampoSelecionado){
                    operadoraRegex = new RegExp(CampoSelecionado , 'i');
                    operadora = { "operadora.nome": { $in: [operadoraRegex] } }
                }
                    
                else
                    operadora = {}

                return operadora;
                break;
            case 3:

                let dataNascimento
                if (CampoSelecionado){
                    dataNascimentoRegex = new RegExp(CampoSelecionado, 'i');
                    dataNascimento = { "titular.dataNascimento": { $in: [dataNascimentoRegex] }}

                }

                else
                    dataNascimento = {}

                return dataNascimento;
                break;
                
            case 4:
                    let nomeTitular
                if (CampoSelecionado){
                    
                    let testando = CampoSelecionado.split(' ');
                    let nome;
                    let sobrenome;
                    
                    for (var i = 0; i < testando.length; i++) {
                        if (i === 0) {
                            nome = `^${testando[i]}`;
                        } else {
                            sobrenome = `${testando[i]}`;
                        }
                    }
                
                    let sobrenomeRegex;
                    
                    if(sobrenome){
                        sobrenomeRegex = new RegExp(sobrenome,'i');

                    }else{

                        sobrenomeRegex = '';
                    }
                    
                    let nomeRegex = new RegExp(nome,'i');

                    nomeTitular = { "titular.nome": { $in: [nomeRegex, sobrenomeRegex] } }
                }

                else
                    nomeTitular = {}

                return nomeTitular;

                break;

            case 5:
                let entidade
                let entidadeRegex

                if (CampoSelecionado){
                    entidadeRegex = new RegExp(CampoSelecionado, 'i');
                    // entidade = { "entidade.sigla": CampoSelecionado }
                    entidade = { "entidade.sigla": { $in: [entidadeRegex]}}
                }

                else
                    entidade = {}

                return entidade;
                break;

            default:
                return {}

                break;
        }
    },
    fornecedorSave : (collection, corretora) =>{
        console.log('corretora : ', corretora)

        collection.insertMany([corretora], function (err, documents) {
            console.log('insertMany: ',documents)
        })
        
        // let fornecedor = new Fornecedor();
        
        // fornecedor.save(corretora,(err, documents) =>{
        //     console.log('documents: ',documents)
        // })
    }


}