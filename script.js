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

var cartaJogador;
var cartaMaquina;

function sortearCarta() {
  var carta1 = parseInt(Math.random() * 6);
  var carta2 = parseInt(Math.random() * 6);

  while (carta1 == carta2) {
    carta2 = parseInt(Math.random() * 4);
  }

  cartaJogador = cartas[carta1];
  cartaMaquina = cartas[carta2];

  console.log(cartaJogador)

  document.getElementById("btnSortear").disabled = true;
  document.getElementById("btnJogar").disabled = false;

  // exibirOpcoes();
  exibirCartaJogador();
}

// function exibirOpcoes() {
//   var opcoes = document.getElementById("opcoes");
//   var opcoesTexto = "";

//   for (var atributo in cartaJogador.atributos) {
//     opcoesTexto +=
//       "<input type='radio' name='atributo' value=" + atributo + ">" + atributo;
//   }
//   opcoes.innerHTML = opcoesTexto;
// }

function obtemAtributo() {
  var radioAtributos = document.getElementsByName("atributo");
  for (var i = 0; i < radioAtributos.length; i++) {
    if (radioAtributos[i].checked) {
      return radioAtributos[i].value;
    }
  }
  return false;
}

function jogar() {
  var atributoSelecionado = obtemAtributo();

  if (atributoSelecionado) {
    var valorCartaJogador = cartaJogador.atributos[atributoSelecionado];
    var valorCartaMaquina = cartaMaquina.atributos[atributoSelecionado];

    var elementoResultado = document.getElementById("resultado");
    var htmlResultado;

    if (valorCartaJogador > valorCartaMaquina) {
      htmlResultado =
        "<p class='resultado-final'>Meus parabéns, você venceu... Dessa vez</p>";
    } else if (valorCartaJogador < valorCartaMaquina) {
      htmlResultado =
        "<p class='resultado-final'>Me parece que a sorte não está ao seu favor. Últimas palavras?</p>";
    } else {
      htmlResultado =
        "<p class='resultado-final'>Que jogo sem graça! De novo! De novo!!!</p>";
    }
    elementoResultado.innerHTML = htmlResultado;
    document.getElementById("btnSortear").disabled = false;
    document.getElementById("btnJogar").disabled = true;
    exibirCartaMaquina();
  } else {
    console.error("Selecione um atributo antes de jogar!");
  }
}

function exibirCartaJogador() {
  var divCartaJogador = document.getElementById("carta-jogador");
  divCartaJogador.style.backgroundImage = `url(${cartaJogador.imagem})`;
  var moldura =
    '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute;">';

  var tagHTML = "<div id='opcoes' class ='carta-status'>";

  var opcoesTexto = "";

  for (var atributo in cartaJogador.atributos) {
    opcoesTexto +=
      "<input type='radio' name='atributo' value=" +
      atributo +
      ">" +
      atributo +
      " " +
      cartaJogador.atributos[atributo] +
      "<br>";
  }

  var nome = `<p class="carta-subtitle">${cartaJogador.nome}</p>`;

  divCartaJogador.innerHTML = moldura + nome + tagHTML + opcoesTexto + "</div>";
}

function exibirCartaMaquina() {
  var divCartaMaquina = document.getElementById("carta-maquina");
  divCartaMaquina.style.backgroundImage = `url(${cartaMaquina.imagem})`;
  var moldura =
    '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute; top: 0px;">';

  var tagHTML = "<div id='opcoes' class ='carta-status'>";

  var opcoesTexto = "";

  for (var atributo in cartaMaquina.atributos) {
    opcoesTexto +=
      "<p name='atributo' value=" +
      atributo +
      ">" +
      atributo +
      " " +
      cartaMaquina.atributos[atributo] +
      "</p>";
  }

  var nome = `<p class="carta-subtitle">${cartaMaquina.nome}</p>`;

  divCartaMaquina.innerHTML = moldura + nome + tagHTML + opcoesTexto + "</div>";
}