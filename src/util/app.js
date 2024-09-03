const contadorVida = document.getElementById('contador-vida');
const valorInicial = 5;


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
}


const setaAumentar = document.createElement('button');
setaAumentar.textContent = '↑';
setaAumentar.onclick = aumentarVida;

const setaDiminuir = document.createElement('button');
setaDiminuir.textContent = '↓';
setaDiminuir.onclick = diminuirVida;


document.body.appendChild(setaAumentar);
document.body.appendChild(contadorVida);
document.body.appendChild(setaDiminuir);