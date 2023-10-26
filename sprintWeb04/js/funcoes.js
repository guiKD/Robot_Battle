(function () {
  const cnv = document.querySelector('#canvas');
  const ctx = cnv.getContext('2d');

  //----------------------------------

  //movimentos
  let moveLeft = false;
  let moveUp = false;
  let moveRight = false;
  let moveDown = false;
  let moveA4 = false;
  let moveW4 = false;
  let moveD4 = false;
  let moveS4 = false;

  //----------------------------------

  //vidas
  let vidaRobo1 = 100;
  let vidaRobo2 = 100;

  //----------------------------------

  // arrays
  const quadrados = [];

  //----------------------------------

  //colisão
  let colisoes = 0;

  //--------------------------------

  //Audio-------------------------------
  document.addEventListener("DOMContentLoaded", function() {
    let audio = document.getElementById("meuAudio");
    const faixas = [
        "./audio/chop_suey_8b.mp3",
        "./audio/discord.mp3",
        "./audio/Square_Hammer.mp3",
        "./audio/The_Imperial_March_Synthwave.mp3"
    ];
    //Escolhe uma faixa aleatória para tocar
    function tocarMusica() {
        let faixaAleatoria = faixas[Math.floor(Math.random() * faixas.length)];
        audio.src = faixaAleatoria;
        audio.play();
    }

    // Adiciona um ouvinte de eventos ao botão
    document.getElementById("ativarMusica").addEventListener("click", function() {
        tocarMusica();
    });

    // Adiciona um ouvinte de eventos para reiniciar a música manualmente
    audio.addEventListener("timeupdate", function() {
        if (audio.currentTime >= audio.duration - 1) {
            tocarMusica();
        }
    });
});

  //--------------------------------

  // quadrados
  const quadrado1 = new quadrado(60, 20, 100, 80, "", 5);
  quadrados.push(quadrado1);

  const quadrado2 = new quadrado(180, 100, 400, 55, "", 0);
  quadrados.push(quadrado2);

  const quadrado3 = new quadrado(360, 300, 400, 55, "", 0);
  quadrados.push(quadrado3);

  const quadrado4 = new quadrado(870, 410, 100, 90, "", 5);
  quadrados.push(quadrado4);

  //----------------------------------

  // imagens
  const imagem1 = new Image();
  imagem1.src = "image/personagem (1).png";

  const imagem2 = new Image();
  imagem2.src = "image/obstaculodogame (1).png";

  const imagem3 = new Image();
  imagem3.src = "image/obstaculodogame (1).png";

  const imagem4 = new Image();
  imagem4.src = "image/pngwing.com (11).png";

  //----------------------------------

  // pressionar as teclas(player 1)
  window.addEventListener('keydown', function (r) {
    const nomeKey = r.key;
    console.log(nomeKey);
    switch (nomeKey) {
      case 'ArrowLeft':
        moveLeft = true;
        break;
      case 'ArrowUp':
        moveUp = true;
        break;
      case 'ArrowRight':
        moveRight = true;
        break;
      case 'ArrowDown':
        moveDown = true;
        break;
    }
  });

  // pressionar as teclas(player 2)
  window.addEventListener('keydown', function (e) {
    const nomeKeyR = e.key.toLowerCase();
    console.log(nomeKeyR);
    switch (nomeKeyR) {
      case 'a':
        moveA4 = true;
        break;
      case 'w':
        moveW4 = true;
        break;
      case 'd':
        moveD4 = true;
        break;
      case 's':
        moveS4 = true;
        break;
    }
  });

  //----------------------------------

  //soltar as teclas(player 1)
  window.addEventListener('keyup', (r) => {
    const key = r.key;
    switch (key) {
      case 'ArrowLeft':
        moveLeft = false;
        break;
      case 'ArrowUp':
        moveUp = false;
        break;
      case 'ArrowRight':
        moveRight = false;
        break;
      case 'ArrowDown':
        moveDown = false;
        break;
    }
  });

  //soltar as teclas(player 2)
  window.addEventListener('keyup', function (e) {
    const KeyR = e.key.toLowerCase();
    console.log(KeyR);
    switch (KeyR) {
      case 'a':
        moveA4 = false;
        break;
      case 'w':
        moveW4 = false;
        break;
      case 'd':
        moveD4 = false;
        break;
      case 's':
        moveS4 = false;
        break;
    }
  });

  //---------------------------------- mover quadrado 1 + 
  // colisão quadrados

  function moverQuadrados() {
    if (moveLeft ) {
      quadrado1.posX -= quadrado1.velocidade;

      if (quadrado1.posX < quadrado2.posX + (quadrado2.width) &&
        quadrado1.posX + (quadrado1.width) > quadrado2.posX &&
        quadrado1.posY < quadrado2.posY + quadrado2.height &&
        quadrado1.posY + quadrado1.height > quadrado2.posY ||
        quadrado1.posX < quadrado3.posX + (quadrado3.width) &&
        quadrado1.posX + (quadrado1.width) > quadrado3.posX &&
        quadrado1.posY < quadrado3.posY + quadrado3.height &&
        quadrado1.posY + quadrado1.height > quadrado3.posY
      ) {
        quadrado1.posX += quadrado1.velocidade;
      }
    }
    if (moveRight) {
      quadrado1.posX +=quadrado1.velocidade

      if (quadrado1.posX < quadrado2.posX + (quadrado2.width) &&
      quadrado1.posX + (quadrado1.width) > quadrado2.posX &&
      quadrado1.posY < quadrado2.posY + quadrado2.height &&
      quadrado1.posY + quadrado1.height > quadrado2.posY ||
      quadrado1.posX < quadrado3.posX + (quadrado3.width) &&
      quadrado1.posX + (quadrado1.width) > quadrado3.posX &&
      quadrado1.posY < quadrado3.posY + quadrado3.height &&
      quadrado1.posY + quadrado1.height > quadrado3.posY
    ) {
      quadrado1.posX -= quadrado1.velocidade;
    }

    }
    if (moveUp ) {
      quadrado1.posY -= quadrado1.velocidade;
      
    }
    if (moveDown ) {
      quadrado1.posY += quadrado1.velocidade;
      
    }

    //fixar na tela
    quadrado1.posX = Math.max(0, Math.min(cnv.width - quadrado1.width, quadrado1.posX));
    quadrado1.posY = Math.max(0, Math.min(cnv.height - quadrado1.height, quadrado1.posY));
    
    if (
      quadrado1.posX < quadrado2.posX + (quadrado2.width) &&
      quadrado1.posX + (quadrado1.width) > quadrado2.posX &&
      quadrado1.posY < quadrado2.posY + quadrado2.height &&
      quadrado1.posY + quadrado1.height > quadrado2.posY 
      ) {
        if(quadrado2.posY - quadrado2.height > quadrado1.posY){
          quadrado1.posY = Math.max(quadrado2.posY - quadrado1.height);

        }else{
          quadrado1.posY = Math.max(quadrado2.posY + quadrado2.height);

        }
    }
    if (
      quadrado1.posX < quadrado3.posX + (quadrado3.width) &&
      quadrado1.posX + (quadrado1.width) > quadrado3.posX &&
      quadrado1.posY < quadrado3.posY + quadrado3.height &&
      quadrado1.posY + quadrado1.height > quadrado3.posY 
      ) {
        if(quadrado3.posY - quadrado3.height > quadrado1.posY){
          quadrado1.posY = Math.max(quadrado3.posY - quadrado1.height);

        }else{
          quadrado1.posY = Math.max(quadrado3.posY + quadrado3.height);

        }
      }
    

    if (
      quadrado1.posX < quadrado2.posX + (quadrado2.width) &&
      quadrado1.posX + (quadrado1.width) > quadrado2.posX &&
      quadrado1.posY < quadrado2.posY + quadrado2.height &&
      quadrado1.posY + quadrado1.height > quadrado2.posY ||
      quadrado1.posX < quadrado3.posX + (quadrado3.width) &&
      quadrado1.posX + (quadrado1.width) > quadrado3.posX &&
      quadrado1.posY < quadrado3.posY + quadrado3.height &&
      quadrado1.posY + quadrado1.height > quadrado3.posY
    ) {

    }
  }

  //---------------------------------- mover quadrado 2 + 
  // colisão quadrados

  function moverQuadrado4() {
    if (moveA4 && !moveD4) {
      quadrado4.posX -= quadrado4.velocidade;
      if (
        quadrado4.posX < quadrado2.posX + (quadrado2.width) &&
        quadrado4.posX + (quadrado4.width) > quadrado2.posX &&
        quadrado4.posY < quadrado2.posY + quadrado2.height &&
        quadrado4.posY + quadrado4.height > quadrado2.posY ||
        quadrado4.posX < quadrado3.posX + (quadrado3.width) &&
        quadrado4.posX + (quadrado4.width) > quadrado3.posX &&
        quadrado4.posY < quadrado3.posY + quadrado3.height &&
        quadrado4.posY + quadrado4.height > quadrado3.posY
      ) {
        quadrado4.posX += quadrado4.velocidade;
      }
    }
    if (moveD4 && !moveA4) {
      quadrado4.posX += quadrado4.velocidade;
      if (
        quadrado4.posX < quadrado2.posX + (quadrado2.width) &&
        quadrado4.posX + (quadrado4.width) > quadrado2.posX &&
        quadrado4.posY < quadrado2.posY + quadrado2.height &&
        quadrado4.posY + quadrado4.height > quadrado2.posY ||
        quadrado4.posX < quadrado3.posX + (quadrado3.width) &&
        quadrado4.posX + (quadrado4.width) > quadrado3.posX &&
        quadrado4.posY < quadrado3.posY + quadrado3.height &&
        quadrado4.posY + quadrado4.height > quadrado3.posY
      ) {
        quadrado4.posX -= quadrado4.velocidade;
      }
    }
    if (moveW4 && !moveS4) {
      quadrado4.posY -= quadrado4.velocidade;
      
    }
    if (moveS4 && !moveW4) {
      quadrado4.posY += quadrado4.velocidade;
      
    }

    //fixar na tela
    quadrado4.posX = Math.max(0, Math.min(cnv.width - quadrado4.width, quadrado4.posX));
    quadrado4.posY = Math.max(0, Math.min(cnv.height - quadrado4.height, quadrado4.posY));

    if (
      quadrado4.posX < quadrado2.posX + (quadrado2.width) &&
      quadrado4.posX + (quadrado4.width) > quadrado2.posX &&
      quadrado4.posY < quadrado2.posY + quadrado2.height &&
      quadrado4.posY + quadrado4.height > quadrado2.posY 
      ) {
        if(quadrado2.posY - quadrado2.height > quadrado4.posY){
          quadrado4.posY = Math.max(quadrado2.posY - quadrado4.height);

        }else{
          quadrado4.posY = Math.max(quadrado2.posY + quadrado2.height);

        }
    }
    if (
      quadrado4.posX < quadrado3.posX + (quadrado3.width) &&
      quadrado4.posX + (quadrado4.width) > quadrado3.posX &&
      quadrado4.posY < quadrado3.posY + quadrado3.height &&
      quadrado4.posY + quadrado4.height > quadrado3.posY 
      ) {
        if(quadrado3.posY - quadrado3.height > quadrado4.posY){
          quadrado4.posY = Math.max(quadrado3.posY - quadrado4.height);

        }else{
          quadrado4.posY = Math.max(quadrado3.posY + quadrado3.height);

        }
      }
  }

  //----------------------------------

  //atualizar para vermelho com vida abaixo de 70
  function atualizarBarraDeVida() {
    const progressBar1 = document.getElementById('vida-robo1-progress-bar');
    const progressBar2 = document.getElementById('vida-robo2-progress-bar');

    if (vidaRobo1 < 70) {
      progressBar1.querySelector('.progress-bar').classList.remove('bg-success');
      progressBar1.querySelector('.progress-bar').classList.add('bg-danger');
    } else {
      progressBar1.querySelector('.progress-bar').classList.remove('bg-danger');
      progressBar1.querySelector('.progress-bar').classList.add('bg-success');
    }

    if (vidaRobo2 < 70) {
      progressBar2.querySelector('.progress-bar').classList.remove('bg-success');
      progressBar2.querySelector('.progress-bar').classList.add('bg-danger');
    } else {
      progressBar2.querySelector('.progress-bar').classList.remove('bg-danger');
      progressBar2.querySelector('.progress-bar').classList.add('bg-success');
    }
  }

  //--------- colisão acerto

  function colisaoAcerto() {
    if (
      quadrado1.posX < quadrado4.posX + (quadrado4.width) &&
      quadrado1.posX + (quadrado1.width) > quadrado4.posX &&
      quadrado1.posY < quadrado4.posY + quadrado4.height &&
      quadrado1.posY + quadrado1.height > quadrado4.posY
    ) {

      quadrado1.posX = 20; quadrado1.posY = 10;
      quadrado4.posX = 930; quadrado4.posY = 420;

      let sorteioVida1 = (parseInt (Math.random() * 20));
      let sorteioVida2 = (parseInt (Math.random() * 20));

      vidaRobo1 -= sorteioVida1;
      vidaRobo2 -= sorteioVida2;

      const progressBar1 = document.getElementById('vida-robo1-progress-bar');
      const progressBar2 = document.getElementById('vida-robo2-progress-bar');
      progressBar1.style.width = `${vidaRobo1}%`;
      progressBar2.style.width = `${vidaRobo2}%`;

      colisoes++;

      if (colisoes >= 5) {

        if (vidaRobo1 > vidaRobo2) {
          document.getElementById('vencedor').textContent = 'MoBo';
        } else if (vidaRobo1 < vidaRobo2) {
          document.getElementById('vencedor').textContent = 'Turbo';
        } else {
          document.getElementById('vencedor').textContent = 'Empate';
        }

        colisoes = 0;

      }
    }
    robos.querySelector('.vidaRobo1').textContent = vidaRobo1.toFixed();
    robos.querySelector('.vidaRobo2').textContent = vidaRobo2.toFixed();
  }

  //----------------------------------

  function reiniciarJogo() {
    document.querySelector("#reiniciarJogo").onclick = function () {
      document.location.reload()
    }
  }

  //----------------------------------

  function exibirImagens() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.drawImage(imagem1, quadrado1.posX, quadrado1.posY, quadrado1.width, quadrado1.height);
    ctx.drawImage(imagem2, quadrado2.posX, quadrado2.posY, quadrado2.width, quadrado2.height);
    ctx.drawImage(imagem3, quadrado3.posX, quadrado3.posY, quadrado3.width, quadrado3.height);
    ctx.drawImage(imagem4, quadrado4.posX, quadrado4.posY, quadrado4.width, quadrado4.height);
  }

  function exibirQuadrados() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    for (const i in quadrados) {
      const spr = quadrados[i];
      ctx.fillStyle = spr.color;
      ctx.fillRect(spr.posX, spr.posY, spr.width, spr.height);
    }

    //----------------------------------

  }
  //solicitar uma animação ao browser e chamar a função
  //que é a propria função atualizarTela
  function atualizarTela() {

    if (document.getElementById('vencedor').textContent !== '') {
      return;
    }

    window.requestAnimationFrame(atualizarTela, cnv);
    moverQuadrados();
    moverQuadrado4();
    colisaoAcerto();
    exibirQuadrados();
    exibirImagens();
    reiniciarJogo();
    atualizarBarraDeVida();
  }
  atualizarTela();
}());