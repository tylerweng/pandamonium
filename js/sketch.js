let bg, song, intro;
let muteButton, playButton, slider, remainingMoves, strawberryLabel, strawberryProgress, strawberryImg;
let priorVolume = 0.5;
let muted = false;
let gamePlaying = false;

function preload() {
  intro = createImg("assets/images/intro.gif");
  muteButton = document.getElementById('mutebutton');
  muteButton.className = 'hidden';
  playButton = document.getElementById('playbutton');
  slider = document.getElementById('volumeslider');
  slider.className = 'hidden'
  remainingMoves = document.getElementById('remainingmoves');
  remainingMoves.className = 'hidden';

  strawberryLabel = document.getElementById('strawberrylabel');
  strawberryLabel.className = 'hidden';
  strawberryProgress = document.getElementById('strawberryprogress');
  strawberryProgress.className = 'hidden';
  strawberryImg = document.getElementById('strawberryimg');
  strawberryImg.className = 'hidden';
}

function mousePressed() {
  if (!gamePlaying) return;
  const rowNum = Math.floor(event.layerY / 100);
  const colNum = Math.floor(event.layerX / 100);
  const rowNumOffset = (window.board.numRows <= 8 ? 0 : window.board.numRows - 8);
  const tile = window.board.grid[rowNum + rowNumOffset][colNum];
  tile.handleClick();
}


function setup() {
  const canvasEl = createCanvas(800, 800);
  canvasEl.parent('canvas-wrapper')
  window.board = new Board();
  bg = loadImage("assets/images/background.png");
  song = loadSound("assets/audio/theme.mp3");
  song.volume = 0.5;
}

function playGame() {
  if (!gamePlaying) {
    gamePlaying = true;
    window.setInterval(window.board.addRow.bind(window.board), 4000);
    song.loop();
    muteButton.className = 'fa fa-volume-up';
    slider.className = '';
    playButton.className = 'hidden';
    remainingMoves.className = '';
    strawberryLabel.className = '';
    strawberryProgress.className = '';
    strawberryImg.className = '';
  }
}

function muteUnmute() {
  if (muted) {
    song.setVolume(priorVolume);
    muted = false;
    muteButton.className = 'fa fa-volume-up';
  } else {
    priorVolume = parseFloat(slider.value);
    muted = true;
    muteButton.className = 'fa fa-volume-off';
  }
}

function draw() {
  if (gamePlaying) {
    intro.size(0, 0)
    background(bg);
    window.board.display();
    if (muted) {
      song.setVolume(0);
    } else {
      song.setVolume(parseFloat(slider.value));
    }
  } else {
    intro.position((window.innerWidth - intro.width) / 2, (window.innerHeight - intro.height) / 2);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.setup = setup;
  window.draw = draw;
});
