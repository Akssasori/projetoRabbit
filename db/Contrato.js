const mongoose = require("mongoose");
const moment = require('moment');

const schema = mongoose.Schema({
  "subcontrato": {
    "id": {
      "type": "Number"
    }
  },
  "contrato": {
    "id": {
      "type": "Number"
    }
  },
  dataVigencia: {
    "type": "Mixed"
  },
  dataVencimento: {
    "type": "Mixed"
  },
  "operadora": {
    "id": {
      "type": "Number"
    },
    "cnpj": {
      "type": "String"
    },
    "nome": {
      "type": "String"
    },
    "site": {
      "type": "String"
    },
    "telefone": {
      "type": "String"
    }
  },
  "entidade": {
    "id": {
      "type": "Number"
    },
    "sigla": {
      "type": "String"
    },
    "nome": {
      "type": "String"
    }
  },
  "plano": {
    "id": {
      "type": "Number"
    },
    "nome": {
      "type": "String"
    },
    "codigoANS": {
      "type": "String"
    },
    "tipoContratacao": {
      "id": {
        "type": "Number"
      },
      "descricao": {
        "type": "String"
      }
    },
    "acomodacao": {
      "id": {
        "type": "Number"
      },
      "descricao": {
        "type": "String"
      }
    },
    "fatorModerador": {
      "id": {
        "type": "Number"
      },
      "descricao": {
        "type": "String"
      }
    },
    "cobertura": {
      "id": {
        "type": "Number"
      },
      "descricao": {
        "type": "String"
      }
    },
    "abrangenciaGeografica": {
      "id": {
        "type": "Number"
      },
      "descricao": {
        "type": "String"
      }
    },
    "areaAtuacao": {
      "id": {
        "type": "Number"
      },
      "descricao": {
        "type": "String"
      }
    },
    "operadora": {
      "id": {
        "type": "Number"
      },
      "cnpj": {
        "type": "String"
      },
      "nome": {
        "type": "String"
      },
      "site": {
        "type": "String"
      },
      "telefone": {
        "type": "String"
      }
    },
    "adicionais": {
      "type": "Mixed"
    },
    "formacaoDePreco": {
      "type": "Mixed"
    },
    "quantidadeVidas": {
      "type": "Number"
    },
    "valorTotal": {
      "type": "Mixed"
    },
    "valorTotalTabela": {
      "type": "Mixed"
    },
    "recorrenciaPromocaoMeses": {
      "type": "Mixed"
    },
    "indPromocional": {
      "type": "Mixed"
    },
    "indPossuiOpcional": {
      "type": "Boolean"
    }
  },
  titular: {
    "id": {
      "type": "Number"
    },
    "cpf": {
      "type": "String"
    },
    "rg": {
      "type": "String"
    },
    "nome": {
      "type": "String"
    },
    dataNascimento: {
      "type": "Mixed"
    },
    "nomeMae": {
      "type": "String"
    },
    "sexo": {
      "type": "String"
    },
    "cns": {
      "type": "Mixed"
    },
    "dnv": {
      "type": "Mixed"
    },
    "email": {
      "type": "String"
    },
    "dddTelefone": {
      "type": "Mixed"
    },
    "numTelefone": {
      "type": "Mixed"
    },
    "dddCelular": {
      "type": "String"
    },
    "numCelular": {
      "type": "String"
    },
    "valor": {
      "type": "Number"
    },
    "idade": {
      "type": "Number"
    },
    "numeroCarteirinha": {
      "type": "Mixed"
    },
    "estadoCivil": {
      "id": {
        "type": "Number"
      },
      "descricao": {
        "type": "String"
      }
    },
    "orgaoEmissor": {
      "id": {
        "type": "Number"
      },
      "descricao": {
        "type": "String"
      }
    },
    "endereco": {
      "id": {
        "type": "Number"
      },
      "cep": {
        "type": "String"
      },
      "logradouro": {
        "type": "String"
      },
      "numero": {
        "type": "Mixed"
      },
      "complemento": {
        "type": "String"
      },
      "bairro": {
        "type": "String"
      },
      "cidade": {
        "type": "String"
      },
      "uf": {
        "type": "String"
      }
    },
    "representanteLegal": {
      "type": "Mixed"
    },
    "carencia": {
      "type": "Mixed"
    },
    "dependente": {
      "type": [
        "Mixed"
      ]
    },
    "profissao": {
      "id": {
        "type": "Number"
      },
      "descricao": {
        "type": "String"
      }
    }
  },
  "corretora": {
    "id": {
      "type": "Number"
    },
    "cnpj": {
      "type": "String"
    },
    "nome": {
      "type": "String"
    },
    "razaoSocial": {
      "type": "Mixed"
    },
    "possuiSupervisor": {
      "type": "Boolean"
    },
    "codigo": {
      "type": "String"
    },
    "email": {
      "type": "String"
    },
    "indAtivo": {
      "type": "Mixed"
    },
    "indLiberacaoColaborador": {
      "type": "Mixed"
    }
  },
  "administradora": {
    "id": {
      "type": "Number"
    },
    "codigoANS": {
      "type": "String"
    },
    "site": {
      "type": "String"
    },
    "telefone": {
      "type": "String"
    },
    "cnpj": {
      "type": "String"
    },
    "nomeFantasia": {
      "type": "String"
    },
    "razaoSocial": {
      "type": "String"
    }
  },
  "corretor": {
    "id": {
      "type": "Number"
    },
    "cpf": {
      "type": "String"
    },
    "nome": {
      "type": "String"
    },
    "email": {
      "type": "String"
    },
    "celular": {
      "type": "String"
    }
  },
  "supervisor": {
    "id": {
      "type": "Number"
    },
    "corretor": {
      "id": {
        "type": "Number"
      },
      "cpf": {
        "type": "String"
      },
      "nome": {
        "type": "String"
      },
      "email": {
        "type": "String"
      },
      "celular": {
        "type": "Mixed"
      }
    },
    "corretora": {
      "type": "Mixed"
    }
  },
  "valorTotal": {
    "type": "Number"
  },
  "valorTaxaAssociativa": {
    "type": "Number"
  },
  "taxaCadastro": {
    "type": "Number"
  },
  "valorTotalMensal": {
    "type": "Number"
  },
  "numeroProposta": {
    "type": "String"
  },
  "qtdRecorrenciaAnualTaxaAssociativa": {
    "type": "Mixed"
  },
  "descricaoRecorrenciaTaxaAssociativa": {
    "type": "String"
  }
}, { collection: 'mensage' });

schema.pre('save', function (next) {
  this.titular.dataNascimento = moment().format('YYYY-MM-DD');
  this.dataVigencia = moment().format('YYYY-MM-DD');
  this.dataVencimento  = moment().format('YYYY-MM-DD'); 

  next();

})


const Contrato = mongoose.model('contratos', schema);
module.exports = Contrato;
