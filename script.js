async function buscaEndereco(cep) {
  var mensagemErro = document.getElementById("erro");
  mensagemErro.innerHTML = "";
  try {
    var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    var consultaCEPConvertido = await consultaCep.json();
    if (consultaCEPConvertido.erro) {
      throw Error("CEP não existente!");
    }
    var cidade = document.getElementById("cidade");
    var logradouro = document.getElementById("endereco");
    var estado = document.getElementById("estado");

    cidade.value = consultaCEPConvertido.localidade;
    logradouro.value = consultaCEPConvertido.logradouro;
    estado.value = consultaCEPConvertido.uf;
    console.log(consultaCEPConvertido);
    return consultaCEPConvertido;
  } catch (erro) {
    mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
    console.log(erro);
  }
}

var cep = document.getElementById("cep");
cep.addEventListener("focusout", () => buscaEndereco(cep.value));
