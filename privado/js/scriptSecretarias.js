
 import Secretarias from "../Modelos/secretaria.js";
  function validarCPF(cpf) {
    const regexCPF = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2})$/;
  
    if (!regexCPF.test(cpf)) {
      return false;
    }
  
    const partesCPF = cpf.split('-');
  
    const primeiroDigitoVerificador = calcularDigitoVerificador(partesCPF[0]);
  
    const segundoDigitoVerificador = calcularDigitoVerificador(partesCPF[0] + primeiroDigitoVerificador);
  
    return (
      primeiroDigitoVerificador === parseInt(partesCPF[1]) &&
      segundoDigitoVerificador === parseInt(partesCPF[2])
    );
  
    function calcularDigitoVerificador(numero) {
      const soma = numero
        .split('')
        .map(numero => parseInt(numero))
        .reduce((soma, numero, indice) => soma + (numero * (11 - indice)), 0);
      const resto = soma % 11;
      const digitoVerificador = resto === 0 || resto === 1 ? 0 : 11 - resto;
      return digitoVerificador;
    }};

   
    const formularioSecretaria = document.getElementById('formSecretarias');

    formularioSecretaria.onsubmit = validarFormulario;

    function validarFormulario(evento) {

        if (formularioSecretaria.checkValidity()) {
          formularioSecretaria.classList.remove('was-validated');
          const setor = document.getElementById('setor').value;
          const nome_secretaria = document.getElementById('nome_secretaria').value;
          const titular = document.getElementById('titular').value;
          const cpf = document.getElementById('cpf').value;
          
          	
          const secretaria = new Secretarias(nome, telefone, email, endereco, cidade, estado, cpf, nascimento);
          cadastrarSecretaria(secretaria);
        }
       else{
          formularioSecretaria.classList.add('was-validated');	//diz ao bootstrap exibir mensagens de validação
       }
       evento.preventDefault(); //onsubmit deixa de ter o comportamento padrão de envio de formulário
       evento.stopPropagation(); //Outros interessados no evento de submissão não saberão que ele aconteceu.
      
    }
    function cadastrarsecretaria(secretaria){
      // FETCH API para fazer requisiçoes http
      fetch('http://localhost:3000/secretarias', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(secretaria)
       }).then((resposta) => {
            return resposta.json(); 
      }).then((dados) => {
        if(dados.status){
          formularioSecretaria.reset();
          mostrarMensagem(dados.mensagem, true);

        } else {
          mostrarMensagem(dados.mensagem, false);
        };
        
      })
      .catch(erro) => {
        mostrarMensagem(erro.message, false);
      };
    };

    function mostrarMensagem(mensagem, sucesso = false){
      const divMensagem = document.getElementById('mensagem');

      if (sucesso){
        divMensagem.innerHTML = `
        <div class="alert alert-success" role="alert">
        ${mensagem}
        </div>`	; //string literals
    } 
      else{
        divMensagem.innerHTML=` 
        <div class="alert alert-danger" role="alert">
        ${mensagem} 
        </div>`;
    }
      setTimeout(() => {
        divMensagem.innerHTML = '';
    }, 5000);

}
    
