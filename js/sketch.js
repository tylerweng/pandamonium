function setup() {
  bg = loadImage("assets/images/background.png");
  createCanvas(800, 800);
  window.board = new Board();
}

function mousePressed() {
  const rowNum = Math.floor(event.layerY / 100);
  const colNum = Math.floor(event.layerX / 100);
  const rowNumOffset = (window.board.numRows <= 8 ? 0 : window.board.numRows - 8);
  const tile = window.board.grid[rowNum + rowNumOffset][colNum];
  tile.handleClick();
}

function draw() {
  background(bg);
  window.board.display();
}

document.addEventListener("DOMContentLoaded", () => {
  window.setup = setup;
  window.draw = draw;
});
