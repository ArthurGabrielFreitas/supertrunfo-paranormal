var cartas = [
  {
    nome: "Mauro Nunes",
    imagem: "images/Miniatura-Mauro-Nunes.png",
    atributos: {
      agilidade: 0,
      forca: 2,
      inteligencia: -1,
      presenca: 1,
      vigor: 2
    }
  },
  {
    nome: "Maya Shizuri",
    imagem:
      "images/Miniatura-Maya-Shuzuri.png",
    atributos: {
      agilidade: 2,
      forca: 1,
      inteligencia: 1,
      presenca: 0,
      vigor: 0
    }
  },
  {
    nome: "Bruna Sampaio",
    imagem: "images/Miniatura-Bruna-Sampaio.png",
    atributos: {
      agilidade: 0,
      forca: 0,
      inteligencia: 2,
      presenca: 2,
      vigor: 0
    }
  },
  {
    nome: "Leandro Weiss",
    imagem: "images/Miniatura-Leandro-Weiss.png",
    atributos: {
      agilidade: 0,
      forca: 1,
      inteligencia: 1,
      presenca: 1,
      vigor: 1
    }
  },
  {
    nome: "Jaime Orthuga",
    imagem: "images/Miniatura-Jaime-Orthuga.png",
    atributos: {
      agilidade: 0,
      forca: 0,
      inteligencia: 1,
      presenca: 2,
      vigor: 1
    }
  },
  {
    nome: "Aniela Ukryty",
    imagem: "images/Miniatura-Aniela-Ukryty.png",
    atributos: {
      agilidade: 0,
      forca: -1,
      inteligencia: 2,
      presenca: 3,
      vigor: 0
    }
  }
];

// TODO Continuar Caso de a máquina escolher o atributo. Deve alterar os atributos do jogador de radio para lista
// Verificar erro em empate

var cartasJogador = []
var cartasMaquina = []

var jogadorEscolheAtributo = true;

document.getElementById("btnSortear").disabled = false;
document.getElementById("btnJogar").disabled = true;
document.getElementById("btnProxima").disabled = true;

function distribuirCartas() {
  var cartasRecebidas = [];
  var cartasNoMonte = cartas.length;
  while ( cartasNoMonte > cartas.length / 2) {
    var cartaNova = cartas[parseInt(Math.random() * cartas.length)];
    if (!cartasRecebidas.includes(cartaNova)) {
      cartasRecebidas.push(cartaNova);
      cartasNoMonte--;
    }
  }
  return cartasRecebidas;
}

function cartasRestantes() {
  var cartasRecebidasMaquina = [];
  for (var carta in cartas) {
    if (!cartasJogador.includes(cartas[carta])) {
      cartasRecebidasMaquina.push(cartas[carta]);
    }
  }
  return cartasRecebidasMaquina;
}

function sortearCarta() {

  cartasJogador = distribuirCartas();
  cartasMaquina = cartasRestantes();

  document.getElementById("qtdCartasJogador").innerHTML = cartasJogador.length + " Cartas";
  document.getElementById("qtdCartasMaquina").innerHTML = cartasMaquina.length + " Cartas";

  document.getElementById("btnSortear").disabled = true;
  document.getElementById("btnJogar").disabled = false;
  document.getElementById("btnProxima").disabled = true;

  exibirCartaJogador();
}

function obtemAtributo() {
  if(jogadorEscolheAtributo){
    var radioAtributos = document.getElementsByName("atributo");
    for (var i = 0; i < radioAtributos.length; i++) {
      if (radioAtributos[i].checked) {
        return radioAtributos[i].value;
      }
    }
    return false;
  } else {
    var vetorAux = []

    // Array com os objetos dos atributos da primeira carta do monte da Máquina.
    var atributos = cartasMaquina[0].atributos

    // O resultado é um array com os valores dos atributos.
    for(var atrib in atributos){
      vetorAux.push(atributos[atrib]);
    }
    console.log(vetorAux)

    // O maior valor encontrado no array dos valores dos atributos.
    max = Math.max.apply(null, vetorAux);
    var indicesValorMaximo = [];
    var idx = vetorAux.indexOf(max)

    // O resultado é um array com todas as posições do valor máximo no array de valores. Necessário caso tenha mais de uma ocorrência do mesmo valor
    while (idx != -1){
      indicesValorMaximo.push(idx);
      idx = vetorAux.indexOf(max, idx+1)
    }
    console.log(indicesValorMaximo)

    // Escolhe um elemento aleatório dentro do array dos índices dos atributos de maior valor e retorna esse índice.
    var indiceRetornado = indicesValorMaximo[parseInt(Math.random() * indicesValorMaximo.length)]
    console.log(indicesValorMaximo.length)
    console.log(indiceRetornado)
    console.log(atributos[indiceRetornado])
    return indiceRetornado;
  }
}

function jogar() {
  var atributoSelecionado = obtemAtributo();

  if (atributoSelecionado) {
    var valorCartaJogador = cartasJogador[0].atributos[atributoSelecionado];
    var valorCartaMaquina = cartasMaquina[0].atributos[atributoSelecionado];

    var elementoResultado = document.getElementById("resultado");
    var htmlResultado;

    if (valorCartaJogador > valorCartaMaquina) {
      htmlResultado =
        "<p class='resultado-final'>Meus parabéns, você venceu... Dessa vez</p>";
      cartasJogador.push(cartasMaquina.shift());
      cartasJogador.push(cartasJogador.shift());
      exibirCartaMaquina();
      jogadorEscolheAtributo = true;
    } else if (valorCartaJogador < valorCartaMaquina) {
      htmlResultado =
        "<p class='resultado-final'>Me parece que a sorte não está ao seu favor. Últimas palavras?</p>";
        cartasMaquina.push(cartasJogador.shift());
        cartasMaquina.push(cartasMaquina.shift());
        exibirCartaMaquina();
        jogadorEscolheAtributo = false;
    } else {
      htmlResultado =
        "<p class='resultado-final'>Que jogo sem graça! De novo! De novo!!!</p>";
    }
    elementoResultado.innerHTML = htmlResultado;

    document.getElementById("qtdCartasJogador").innerHTML = cartasJogador.length + " Cartas";
    document.getElementById("qtdCartasMaquina").innerHTML = cartasMaquina.length + " Cartas";

    document.getElementById("btnJogar").disabled = true;
    document.getElementById("btnProxima").disabled = false;
  } else {
    console.error("Selecione um atributo antes de jogar!");
  }
}

function avancarRodada(){
  document.getElementById("btnJogar").disabled = false;
  document.getElementById("btnProxima").disabled = true;

  exibirCartaJogador();
  resetarCartaMaquina();
}

function exibirCartaJogador() {
  var divCartaJogador = document.getElementById("carta-jogador");
  divCartaJogador.style.backgroundImage = `url(${cartasJogador[0].imagem})`;
  var moldura =
    '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute;">';

  var tagHTML = "<div id='opcoes' class ='carta-status'>";

  var opcoesTexto = "";

  for (var atributo in cartasJogador[0].atributos) {
    opcoesTexto +=
      "<input type='radio' name='atributo' value=" +
      atributo +
      ">" +
      atributo +
      " " +
      cartasJogador[0].atributos[atributo] +
      "<br>";
  }

  var nome = `<p class="carta-subtitle">${cartasJogador[0].nome}</p>`;

  divCartaJogador.innerHTML = moldura + nome + tagHTML + opcoesTexto + "</div>";
}

function exibirCartaMaquina() {
  var divCartaMaquina = document.getElementById("carta-maquina");
  divCartaMaquina.style.backgroundImage = `url(${cartasMaquina[0].imagem})`;
  var moldura =
    '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute; top: 0px;">';

  var tagHTML = "<div id='opcoes' class ='carta-status'>";

  var opcoesTexto = "";

  for (var atributo in cartasMaquina[0].atributos) {
    opcoesTexto +=
      "<p name='atributo' value=" +
      atributo +
      ">" +
      atributo +
      " " +
      cartasMaquina[0].atributos[atributo] +
      "</p>";
  }

  var nome = `<p class="carta-subtitle">${cartasMaquina[0].nome}</p>`;

  divCartaMaquina.innerHTML = moldura + nome + tagHTML + opcoesTexto + "</div>";
}

function resetarCartaMaquina(){
  var divCartaMaquina = document.getElementById("carta-maquina");
  divCartaMaquina.style.backgroundImage = `url()`;
  var moldura =
  '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute; top: 0px;">';

  divCartaMaquina.innerHTML = moldura;
}

// função sorteia metade das cartas para o jogador e o computador fica com as outras
// O jogador começa escolhendo o atributo. Quem ganhar fica com as cartas do oponente e escolhe o próximo atributo.
// Se o computador ganhar, ele deve escolher o atributo de maior valor. O jogador apenas clica no botão de jogar.
// Quem ficar com todas as cartas ganha.
// Após a rodada, a carta da máquina fica em branco e o jogador recebe uma nova carta
