let numSorteados = [];
let limiteNum = 10;
let numSecreto = gerarNumAleatorio();
let tentativas = 1;

function exbirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
}

function exibirTela() {
    exbirTexto('h1', 'Jogo do número secreto');
    exbirTexto('p', 'Escolha um número entre 1 e 10');
}
exibirTela();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numSecreto) {
        exbirTexto('h1', 'Acertou!');
        let palaTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto! Com ${tentativas} ${palaTentativa}`;
        exbirTexto('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numSecreto) {
            exbirTexto('p', `O número secreto é menor que ${chute}`);
        } else {
            exbirTexto('p', `O número secreto é maior que ${chute}`);
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumAleatorio() {
    let numEscolhido = parseInt(Math.random() * limiteNum + 1);
    let quantlista = numSorteados.length;

    if (quantlista == limiteNum) {
        numSorteados = [];
    }

    if (numSorteados.includes(numEscolhido)) {
        return gerarNumAleatorio()
    } else {
        numSorteados.push(numEscolhido);
        console.log(numSorteados);
        return numEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numSecreto = gerarNumAleatorio();
    limparCampo();
    tentativas = 1;
    exibirTela();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
