let bg, song;
let muteButton, playButton, slider;
let priorVolume = 0.5;
let muted = false;

function mousePressed() {
  const rowNum = Math.floor(event.layerY / 100);
  const colNum = Math.floor(event.layerX / 100);
  const rowNumOffset = (window.board.numRows <= 8 ? 0 : window.board.numRows - 8);
  const tile = window.board.grid[rowNum + rowNumOffset][colNum];
  tile.handleClick();
}


function setup() {
  bg = loadImage("assets/images/background.png");
  createCanvas(800, 800);
  window.board = new Board();
  song = loadSound("assets/audio/theme.mp3", loaded);
  song.volume = 0.5;
  muteButton = createButton("Mute");
  muteButton.mousePressed(muteUnmute);
  slider = createSlider(0, 1, 0.5, 0.01);
}

function muteUnmute() {
  if (muted) {
    song.setVolume(priorVolume);
    muted = false;
  } else {
    priorVolume = slider.value();
    muted = true;
  }

}

function loaded() {
  song.loop();
}

function draw() {
  background(bg);
  window.board.display();
  if (muted) {
    song.setVolume(0);
  } else {
    song.setVolume(slider.value());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.setup = setup;
  window.draw = draw;
});
