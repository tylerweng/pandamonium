const COLORS = [
  '#BED8A0', '#E3B4B5', '#FFDF9E', '#63E3E6'
];


class Board {

  static randomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  }

  static isStrawberry() {
    return Math.random() < (1 / 16);
  }

  initializeGrid(numRows, numCols) {
    const grid = [];
    for (let rowNum = 0; rowNum < numRows; rowNum++) {
      const row = [];
      for (let colNum = 0; colNum < numCols; colNum++) {
        const temp = new Tile(this, rowNum, colNum, Board.randomColor(), Board.isStrawberry() );
        row.push(temp)
      }
      grid.push(row);
    }

    this.pandaColNum = Math.floor(Math.random() * numCols);
    grid[0][this.pandaColNum].color = 'panda';

    return grid;
  }


  constructor(numRows=8, numCols=8) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.points = 0;
    this.remainingMoves = 30;
    this.showIndicator = false;

    this.grid = this.initializeGrid(numRows, numCols);
  }

  addRow() {
    const row = [];
    for (let colNum = 0; colNum < this.numCols; colNum++) {
      row.push(new Tile(this, this.numRows, colNum, Board.randomColor(), Board.isStrawberry() ));
    }
    this.grid.push(row);
    this.numRows++;
    this.display();
  }



  outOfBounds(rowNum, colNum) {
    return (rowNum < 0 || rowNum >= this.numRows  || colNum < 0 || colNum >= this.numCols);
  }

  emptyColumn(colNum) {
    for (let rowNum = 0; rowNum < this.numRows; rowNum++) {
      if (this.grid[rowNum][colNum].color !== 'none') return false;
    }

    return true;
  }

  winCondition() {
    this.grid[this.numRows - 1].map(tile => {
      if (tile.color === 'panda') {
        alert('Yay victory!');
        return true;
      };
    });
  }

  lostCondition() {
    if (this.remainingMoves <= 0) {
      alert('Game over!');
      return true;
    }
  }

  display() {
    const upArrow = document.getElementById('uparrow');
    const canvas = document.getElementById('defaultCanvas0');
    const context = canvas.getContext('2d');
    const pandaImg = new Image();

    pandaImg.src = "assets/images/panda.png";
    pandaImg.crossOrigin = 'anonymous';
    const strawberryImg = new Image();
    strawberryImg.src = "assets/images/strawberry.png";
    strawberryImg.crossOrigin = 'anonymous';

    this.showIndicator = true;

    text(`Moves: ${this.remainingMoves}`);
    const s = (this.numRows <= 8 ? 0 : this.numRows - 8);
    for (let i = s, k = 0; i < this.numRows; i++, k++) {
      for (let j = 0, l=0; j < this.numCols; j++, l++) {
        const tile = this.grid[i][j];

        if (tile.color === 'panda') {
          this.showIndicator = false;
          pandaImg.onload = context.drawImage(pandaImg, 90 * l, 90 * k, 90, 90);
        }
        else if (tile.color === 'none') {
        }
        else if (tile.strawberry) {
          stroke(255);
          fill(tile.color);
          rect(90 * l, 90 * k, 90, 90);
          strawberryImg.onload = context.drawImage(strawberryImg, 90 * l, 90 * k, 90, 90);

        } else {
          stroke(255);
          fill(tile.color);
          rect(90 * l, 90 * k, 90, 90);
        }
      }
    }

    upArrow.style.position = 'absolute';
    const offset = 30 + (this.pandaColNum * 90);
    console.log(offset);
    upArrow.style.left = `${offset}px`;
    this.showIndicator
      ? upArrow.className ="fa fa-arrow-up blink-me"
      : upArrow.className ="fa fa-arrow-up blink-me hidden"
  }



}
