var amqp = require('amqplib/callback_api');
const CryptoJS = require('crypto-js');
 
amqp.connect('amqp://hadministradora:h4Dm1n44@10.190.4.17', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'Roots.HAdministradora.PosVenda.CadastroContratoBeneficiario';
    var msg = '{"subcontrato":{"id":20},"contrato":{"id":7},"dataVigencia":"2020-09-01T00:00:00","dataVencimento":"2020-07-01T00:00:00","operadora":{"id":2,"cnpj":"31925548000176","nome":"UNIMED","site":"assim.com.br","telefone":"08007239797"},"entidade":{"id":16.0,"sigla":"UNIPRO","nome":"ASSOCIACAO BRASILEIRA DE DESENVOLVIMENTO SOCIAL DOS PROFISSIONAIS LIBERAIS"},"plano":{"id":25,"nome":"ASSIM MAX QC","codigoANS":"483.898/19-0","tipoContratacao":{"id":1,"descricao":"Adesão"},"acomodacao":{"id":1,"descricao":"ENFERMARIA"},"fatorModerador":{"id":1,"descricao":"SEM COPARTICIPAÇÃO"},"cobertura":{"id":4,"descricao":"AMBULATORIAL + HOSPITALAR COM OBSTETRICIA"},"abrangenciaGeografica":{"id":1,"descricao":"GRUPO DE MUNICIPIO"},"areaAtuacao":{"id":14,"descricao":"RIO DE JANEIRO / SÃO GONÇALO / DUQUE DE CAXIAS / MESQUITA / NITERÓI"},"operadora":{"id":2,"cnpj":"31925548000176","nome":"ASSIM SAÚDE","site":"assim.com.br","telefone":"08007239797"},"adicionais":null,"formacaoDePreco":null,"quantidadeVidas":0,"valorTotal":null,"valorTotalTabela":null,"recorrenciaPromocaoMeses":null,"indPromocional":null,"indPossuiOpcional":false},"titular":{"id":45678997874,"cpf":"12310252719","rg":"1111111111111","nome":"Lucas Teste","dataNascimento":"1991-09-17T00:00:00","nomeMae":"Maria teste","sexo":"M","cns":null,"dnv":null,"email":"ldomingues.hcommerce.corretor@gmail.com","dddTelefone":null,"numTelefone":null,"dddCelular":"21","numCelular":"932132132","valor":225.87,"idade":28,"numeroCarteirinha":215423457,"estadoCivil":{"id":1,"descricao":"Casado(a)"},"orgaoEmissor":{"id":1,"descricao":"Detran"},"endereco":{"id":20052,"cep":"20031-144","logradouro":"México","numero":"11","complemento":"","bairro":"Centro","cidade":"Rio de Janeiro","uf":"RJ"},"representanteLegal":null,"carencia":null,"dependente":[{"id":6,"cpf":"87830426015","nome":"Amanda Ribeiro Sbaraini","dataNascimento":"2000-06-28T00:00:00","nomeMae":"Maria Evana Borges Ribeiro","sexo":"F","cns":"","dnv":"","valorPlano":205.34,"idade":20,"numeroCarteirinha":null,"estadoCivil":{"id":1,"descricao":"Casado(a)"},"grauParentesco":{"id":10,"descricao":"OUTROS"},"carencia":null}],"profissao":{"id":85,"descricao":"PROFISSIONAL LIBERAL"}},"corretora":{"id":10003.0,"cnpj":"35855718000144","nome":"TESTE MARLIN\r\n","razaoSocial":null,"possuiSupervisor":true,"codigo":"999999","email":"hcommerce@marlin.com.br\r\n","indAtivo":null,"indLiberacaoColaborador":null},"administradora":{"id":2,"codigoANS":"420662","site":"www.a4rio.com.br","telefone":"22112000","cnpj":"26143483000177","nomeFantasia":"hadministradora","razaoSocial":"Hadministradora"},"corretor":{"id":4,"cpf":"12688278789","nome":"LUCAS DOMINGUES","email":"ldomingues@marlin.com.br","celular":"21979656322"},"supervisor":{"id":10003,"corretor":{"id":4,"cpf":"12688278789","nome":"LUCAS DOMINGUES","email":"ldomingues@marlin.com.br","celular":null},"corretora":null},"valorTotal":431.21,"valorTaxaAssociativa":5.00,"taxaCadastro":20.00,"valorTotalMensal":436.21,"numeroProposta":"ON00401087","qtdRecorrenciaAnualTaxaAssociativa":null,"descricaoRecorrenciaTaxaAssociativa":"MÊS"}';
   
   
    msg = msg.replace(/\r/g, "");
    msg = msg.replace(/\n/g, "");
    msg = msg.replace(/\\/g, "");

          let privateKey = "ml}^*uQiQjsy#{(Z";
          let iv = CryptoJS.lib.WordArray.create([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
          let keyHash = CryptoJS.SHA256(CryptoJS.enc.Utf8.parse(privateKey));
          let key = CryptoJS.lib.WordArray.create(keyHash.words.slice(0, 8), 32);
          let cfg = { iv: iv };
          let encrypted = CryptoJS.AES.encrypt(msg, key, cfg);
          console.log('Texto encriptado: ', CryptoJS.enc.Base64.stringify(encrypted.ciphertext));
          //res.status(200).send({ "Criptografou": CryptoJS.enc.Base64.stringify(encrypted.ciphertext) });
    

   //let {data,changed} = jsonFix(msg.replace("",''));



    //console.log(CryptoJS.enc.Base64.stringify(encrypted.ciphertext));
    channel.assertQueue(queue, {
     durable: false
   });

    channel.sendToQueue(queue, Buffer.from(CryptoJS.enc.Base64.stringify(encrypted.ciphertext)));
    console.log("Criptografado e enviado", CryptoJS.enc.Base64.stringify(encrypted.ciphertext));
  });
});
