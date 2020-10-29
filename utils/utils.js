module.exports = {

    retornaCampo: (status, CampoSelecionado) => {
        let statusConvertido = parseInt(status)

        switch (statusConvertido) {

            case 1:
                let administradora
                if (CampoSelecionado)
                    administradora = { "administradora.razaoSocial": CampoSelecionado }

                else
                    administradora = {}

                return administradora;
                break
            case 2:
                let operadora
                if (CampoSelecionado)
                    operadora = { "operadora.nome": CampoSelecionado }

                else
                    operadora = {}

                return operadora;
                break;
            case 3:

                let dataNascimento
                if (CampoSelecionado)
                    dataNascimento = { "titular.dataNascimento": CampoSelecionado }

                else
                    dataNascimento = {}

                return dataNascimento;
                break;
            case 4:
                let nomeTitular
                let testando = CampoSelecionado.toLowerCase().split(' ');
                let nome;
                let sobrenome;
                
                for (var i = 0; i < testando.length; i++) {
                    if (i === 0) {
                        testando[i] = testando[i][0].toUpperCase() + testando[i].slice(1);
                        nome = `^${testando[i]}`;
                    } else {
                        testando[i] = testando[i][0].toUpperCase() + testando[i].slice(1);
                        sobrenome = `${testando[i]}`;
                    }
                }
                let nomeRegex = new RegExp(nome);
                let sobrenomeRegex = new RegExp(sobrenome);
            
                if (CampoSelecionado){
                    console.log('nomeRegex: ',nomeRegex)
                    nomeTitular = { "titular.nome": { $in: [nomeRegex, sobrenomeRegex] } }
                }
              

                else
                    nomeTitular = {}

                return nomeTitular;
                break;

            case 5:
                let entidade
                if (CampoSelecionado)
                    entidade = { "entidade.sigla": CampoSelecionado }

                else
                    entidade = {}

                return entidade;
                break;

            default:
                return {}

                break;
        }
    }

}