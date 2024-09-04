//Registrando o service worker

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registrado com sucesso:', registration);
      })
      .catch(error => {
        console.log('Falha ao registrar o Service Worker:', error);
      });
  });
}

//Sistema de quiz

const contadorVida = document.getElementById('contador-vida');
const valorInicial = 5;
const pergunta = document.getElementById('pergunta');
const opcoesRespostas = document.getElementById('opcoes-respostas');
const botaoProximaPergunta = document.getElementById('botao-proxima-pergunta');

const perguntas = [
  {
    pergunta: 'Qual o tipo de variável para valores inteiros?',
    respostaCerta: 'int',
    respostasErradas: ['float', 'char', 'double']
  },
  {
    pergunta: 'Qual é o maior planeta do sistema solar?',
    respostaCerta: 'Júpiter',
    respostasErradas: ['Saturno', 'Marte', 'Vênus']
  },
  {
    pergunta: '3?',
    respostaCerta: 'Júpiter',
    respostasErradas: ['Saturno', 'Marte', 'Vênus']
  },
  {
    pergunta: '44?',
    respostaCerta: 'Júpiter',
    respostasErradas: ['Saturno', 'Marte', 'Vênus']
  },
  {
    pergunta: '55?',
    respostaCerta: 'Júpiter',
    respostasErradas: ['Saturno', 'Marte', 'Vênus']
  },
];

let perguntasNormais = [...perguntas];
let perguntasErradas = [];
let currentQuestionIndex = 0;

contadorVida.textContent = valorInicial;


function aumentarVida() {
  const valorAtual = parseInt(contadorVida.textContent);
  contadorVida.textContent = valorAtual + 1;
}


function diminuirVida() {
  const valorAtual = parseInt(contadorVida.textContent);
  if (valorAtual > 0) {
    contadorVida.textContent = valorAtual - 1;
  }
  if (parseInt(contadorVida.textContent) === 0) {
    alert('Você perdeu todas as vidas!');
    // implementar lógica de reiniciar o jogo
  }
}

function mostrarPergunta() {
  if (perguntasNormais.length === 0 && perguntasErradas.length === 0) {
    alert('Parabéns! Você completou todas as tarefas!');
    return;
  }

  let perguntaAtual;
  if (perguntasNormais.length > 0) {
    perguntaAtual = perguntasNormais[currentQuestionIndex];
  } else if (perguntasErradas.length > 0) {
    perguntaAtual = perguntasErradas[0];
  }

  if (!perguntaAtual) {
    proximaPergunta();
    return;
  }

  pergunta.textContent = perguntaAtual.pergunta;
  const respostas = [];

  const respostaCertaBotao = document.createElement('button');
  respostaCertaBotao.textContent = perguntaAtual.respostaCerta;
  respostaCertaBotao.addEventListener('click', () => {
    alert('Você acertou!');
    bloquearRespostas();
    botaoProximaPergunta.disabled = false;
    if (perguntasNormais.length > 0) {
      perguntasNormais.splice(currentQuestionIndex, 1); 
    } else {
      perguntasErradas.shift();
    }
  });
  respostas.push(respostaCertaBotao);

  perguntaAtual.respostasErradas.forEach((respostaErrada) => {
    const respostaErradaBotao = document.createElement('button');
    respostaErradaBotao.textContent = respostaErrada;
    respostaErradaBotao.addEventListener('click', () => {
      diminuirVida();
      alert('Você errou!');
      if (perguntasNormais.length > 0) {
        adicionarPerguntaErrada(perguntasNormais[currentQuestionIndex]);
        perguntasNormais.splice(currentQuestionIndex, 1);
      }
      bloquearRespostas();
      botaoProximaPergunta.disabled = false;
    });
    respostas.push(respostaErradaBotao);
  });

  opcoesRespostas.innerHTML = '';
  respostas.sort(() => Math.random() - 0.5); // embaralha as respostas
  respostas.forEach((button) => {
    opcoesRespostas.appendChild(button);
  });

  botaoProximaPergunta.disabled = true; 
}

function bloquearRespostas() {
  const botoes = opcoesRespostas.querySelectorAll('button');
  botoes.forEach((botao) => {
    botao.disabled = true;
  });
}

function adicionarPerguntaErrada(perguntaErrada) {
  const perguntaExistente = perguntasErradas.find(p => p.pergunta === perguntaErrada.pergunta);
  if (!perguntaExistente) {
    perguntasErradas.push({ ...perguntaErrada, erros: 1 });
  } else {
    perguntaExistente.erros++;
  }
}

function proximaPergunta() {
  if (perguntasNormais.length > 0) {
    if (currentQuestionIndex >= perguntasNormais.length) {
      currentQuestionIndex = 0;
    }
  } else if (perguntasErradas.length > 0) {
    currentQuestionIndex = 0; 
  }

  mostrarPergunta();
}

botaoProximaPergunta.addEventListener('click', () => {
  proximaPergunta();
});

// inicializa o jogo
mostrarPergunta();

const setaAumentar = document.createElement('button');
setaAumentar.textContent = '↑';
setaAumentar.onclick = aumentarVida;

const setaDiminuir = document.createElement('button');
setaDiminuir.textContent = '↓';
setaDiminuir.onclick = diminuirVida;

document.body.appendChild(setaAumentar);
document.body.appendChild(contadorVida);
document.body.appendChild(setaDiminuir);