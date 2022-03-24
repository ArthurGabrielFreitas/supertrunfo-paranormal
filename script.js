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
    imagem: "images/Miniatura-Maya-Shuzuri.png",
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

var cartasJogador = [];
var cartasMaquina = [];

var jogadorEscolheAtributo = true;
var atributosJaEscolhidosMaquina = [];
var rodada = 1;

document.getElementById("btnSortear").disabled = false;
document.getElementById("btnJogar").disabled = true;
document.getElementById("btnProxima").disabled = true;

// Função para o botão Sortear Cartas.
function sortearCartas() {
  cartasJogador = distribuirCartas();
  cartasMaquina = cartasRestantes();

  rodada = 1;

  resetarCartaMaquina();

  document.getElementById("atrbt").innerHTML = "Escolha seu atributo";

  document.getElementById("resultado").innerHTML = "";

  document.getElementById("qtdCartasJogador").innerHTML =
    cartasJogador.length + " Cartas";
  document.getElementById("qtdCartasMaquina").innerHTML =
    cartasMaquina.length + " Cartas";

  document.getElementById("rodada").innerHTML = "Rodada " + rodada;

  document.getElementById("btnSortear").disabled = true;
  document.getElementById("btnJogar").disabled = false;
  document.getElementById("btnProxima").disabled = true;

  exibirCartaJogador();
}

// Função para o botão Jogar.
function jogar() {
  var atributoSelecionado = obtemAtributo();

  if (atributoSelecionado) {
    if (!jogadorEscolheAtributo) {
      document.getElementById("atrbt").innerHTML += atributoSelecionado;
    }
    var valorCartaJogador = cartasJogador[0].atributos[atributoSelecionado];
    var valorCartaMaquina = cartasMaquina[0].atributos[atributoSelecionado];

    var elementoResultado = document.getElementById("resultado");
    var htmlResultado;

    if (valorCartaJogador > valorCartaMaquina) {
      exibirCartaJogador(atributoSelecionado);
      exibirCartaMaquina(atributoSelecionado);
      cartasJogador.push(cartasMaquina.shift());
      cartasJogador.push(cartasJogador.shift());
      console.log(cartasMaquina.length);
      htmlResultado =
        "<p class='resultado-final'>Meus parabéns, você venceu... Essa rodada</p>";
      jogadorEscolheAtributo = true;
      atributosJaEscolhidosMaquina = [];
    } else if (valorCartaJogador < valorCartaMaquina) {
      exibirCartaJogador(atributoSelecionado);
      exibirCartaMaquina(atributoSelecionado);
      cartasMaquina.push(cartasJogador.shift());
      cartasMaquina.push(cartasMaquina.shift());
      htmlResultado =
        "<p class='resultado-final'>O jogo pode ser brutal, mas não se preocupe, você terá mais chances de me prover entretenimento!</p>";
      jogadorEscolheAtributo = false;
      atributosJaEscolhidosMaquina = [];
    } else {
      exibirCartaJogador(atributoSelecionado);
      htmlResultado =
        "<p class='resultado-final'>Que jogo sem graça! De novo! De novo!!!</p>";
    }

    document.getElementById("qtdCartasJogador").innerHTML =
      cartasJogador.length + " Cartas";
    document.getElementById("qtdCartasMaquina").innerHTML =
      cartasMaquina.length + " Cartas";

    if (cartasMaquina.length == 0 || cartasJogador.length == 0) {
      fimDeJogo();
    } else {
      elementoResultado.innerHTML = htmlResultado;

      document.getElementById("btnJogar").disabled = true;
      document.getElementById("btnProxima").disabled = false;
    }
  } else {
    console.error("Selecione um atributo antes de jogar!");
  }
}

// Função para o botão Próxima Rodada.
function avancarRodada() {
  rodada++;

  document.getElementById("rodada").innerHTML = "Rodada " + rodada;

  document.getElementById("btnJogar").disabled = false;
  document.getElementById("btnProxima").disabled = true;

  document.getElementById("resultado").innerHTML = "";

  if (jogadorEscolheAtributo) {
    document.getElementById("atrbt").innerHTML = "Escolha seu atributo";
  } else {
    document.getElementById("atrbt").innerHTML =
      "A máquina escolhe o atributo ";
  }

  exibirCartaJogador();
  resetarCartaMaquina();
}

// Distribui as cartas para o Jogador aleatoriamente.
function distribuirCartas() {
  var cartasRecebidas = [];
  var cartasNoMonte = cartas.length;
  while (cartasNoMonte > cartas.length / 2) {
    var cartaNova = cartas[parseInt(Math.random() * cartas.length)];
    if (!cartasRecebidas.includes(cartaNova)) {
      cartasRecebidas.push(cartaNova);
      cartasNoMonte--;
    }
  }
  return cartasRecebidas;
}

// Distribui as cartas restantes para a Máquina.
function cartasRestantes() {
  var cartasRecebidasMaquina = [];
  for (var carta in cartas) {
    if (!cartasJogador.includes(cartas[carta])) {
      cartasRecebidasMaquina.push(cartas[carta]);
    }
  }
  return cartasRecebidasMaquina;
}

/**
 * Obtém o atributo selecionado.
 * Se for a vez do Jogador escolher, obtém o valor do radio button selecionado.
 * Se for a vez da Máquina escolher, é definido um atributo aleatoriamente entre os atributos de maior valor.
 * Em caso de empate e novo atributo precise ser selecionado, o escolhido na rodada anterior recebe valor -infinito no vetor auxiliar para não ser escolhido novamente.
 */
function obtemAtributo() {
  if (jogadorEscolheAtributo) {
    var radioAtributos = document.getElementsByName("atributo");
    for (var i = 0; i < radioAtributos.length; i++) {
      if (radioAtributos[i].checked) {
        return radioAtributos[i].value;
      }
    }
    return false;
  } else {
    // Máquina escolhe o atributo da rodada.

    var vetorAux = [];

    // Array com os objetos dos atributos da primeira carta do monte da Máquina.
    var atributos = cartasMaquina[0].atributos;

    // O resultado é um array com os valores dos atributos. Atributos que já foram escolhidos na rodada recebem valor -infinito para não serem escolhidos de novo.
    for (var atrib in atributos) {
      if (atributosJaEscolhidosMaquina.indexOf(atrib) == -1) {
        vetorAux.push(atributos[atrib]);
      } else {
        vetorAux.push(-Infinity);
      }
    }

    // O maior valor encontrado no array dos valores dos atributos.
    max = Math.max.apply(null, vetorAux);
    var indicesValorMaximo = [];
    var idx = vetorAux.indexOf(max);

    // O resultado é um array com todas as posições do valor máximo no array de valores. Necessário caso tenha mais de uma ocorrência do mesmo valor.
    while (idx != -1) {
      indicesValorMaximo.push(idx);
      idx = vetorAux.indexOf(max, idx + 1);
    }

    // Escolhe um elemento aleatório dentro do array dos índices dos atributos de maior valor.
    var indiceRetornado =
      indicesValorMaximo[parseInt(Math.random() * indicesValorMaximo.length)];

    // Retorna o atributo com maior valor escolhido e adiciona o mesmo à lista de atributos já escolhidos pela máquina na rodada atual.
    var atributoSelecionadoMaquina = Object.keys(atributos)[indiceRetornado];
    atributosJaEscolhidosMaquina.push(atributoSelecionadoMaquina);

    return atributoSelecionadoMaquina;
  }
}

function exibirCartaJogador(atributoSelecionado = null) {
  var divCartaJogador = document.getElementById("carta-jogador");
  divCartaJogador.style.backgroundImage = `url(${cartasJogador[0].imagem})`;
  var moldura =
    '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute;">';

  var tagHTML = "<div id='opcoes' class ='carta-status'>";

  var opcoesTexto = "";

  if (jogadorEscolheAtributo) {
    for (var atributo in cartasJogador[0].atributos) {
      opcoesTexto += "<input type='radio' name='atributo' value=";
      opcoesTexto +=
        atributo +
        ">" +
        atributo +
        " " +
        cartasJogador[0].atributos[atributo] +
        "<br>";
    }
  } else {
    for (var atributo in cartasJogador[0].atributos) {
      if (atributo == atributoSelecionado) {
        opcoesTexto += "<p name='atributo' style='font-weight: bold;' value=";
      } else {
        opcoesTexto += "<p name='atributo' value=";
      }
      opcoesTexto +=
        atributo +
        ">" +
        atributo +
        " " +
        cartasJogador[0].atributos[atributo] +
        "</p>";
    }
  }

  var nome = `<p class="carta-subtitle">${cartasJogador[0].nome}</p>`;

  divCartaJogador.innerHTML = moldura + nome + tagHTML + opcoesTexto + "</div>";
}

function exibirCartaMaquina(atributoSelecionado = null) {
  var divCartaMaquina = document.getElementById("carta-maquina");
  divCartaMaquina.style.backgroundImage = `url(${cartasMaquina[0].imagem})`;
  var moldura =
    '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute; top: 0px;">';

  var tagHTML = "<div id='opcoes' class ='carta-status'>";

  var opcoesTexto = "";

  for (var atributo in cartasMaquina[0].atributos) {
    if (atributo == atributoSelecionado) {
      opcoesTexto += "<p name='atributo' style='font-weight: bold;' value=";
    } else {
      opcoesTexto += "<p name='atributo' value=";
    }
    opcoesTexto +=
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

function resetarCartaMaquina() {
  var divCartaMaquina = document.getElementById("carta-maquina");
  divCartaMaquina.style.backgroundImage = `url()`;
  var moldura =
    '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute; top: 0px;">';

  divCartaMaquina.innerHTML = moldura;
}

function fimDeJogo() {
  jogadorEscolheAtributo = true;
  atributosJaEscolhidosMaquina = [];

  document.getElementById("btnSortear").disabled = false;
  document.getElementById("btnJogar").disabled = true;
  document.getElementById("btnProxima").disabled = true;

  var elementoResultado = document.getElementById("resultado");
  var htmlResultado;
  if (cartasMaquina.length == 0) {
    htmlResultado =
      "<p class='resultado-final'>Esse jogo não é divertido!? Você até saiu vivo(a), eu considero isso como um bônus. Deseja testar sua sorte novamente?</p>";
  } else {
    htmlResultado =
      "<p class='resultado-final'>Me parece que a sorte não está ao seu favor. Últimas palavras?</p>";
  }
  elementoResultado.innerHTML = htmlResultado;
}
