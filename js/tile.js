const DIRS = [
  [-1, 0], [0, 1], [1, 0], [0, -1]
];

class Tile {

  constructor(board, rowNum, colNum, color, strawberry=false) {
    this.board = board;
    this.rowNum = rowNum
    this.colNum = colNum;
    this.color = color;
    this.strawberry = strawberry;
  }

  handleClick() {
    const csct = this.contiguousSameColorTiles();
    csct.sort((tile1, tile2) => tile1.rowNum - tile2.rowNum);
    if (csct.length >= 3) {
      csct.forEach(tile => {
        if (tile.strawberry) this.board.points++;
        tile.downShiftTiles();
        if (tile.board.winCondition()) return;
        if (tile.board.emptyColumn(tile.colNum)) tile.rightShiftColumns();
      });
    }

  }


  downShiftTiles() {

    for (let rowNum = this.rowNum; rowNum >= 0; rowNum--) {
      if (rowNum === 0) {
        this.board.grid[rowNum][this.colNum].color = 'none';
        this.board.grid[rowNum][this.colNum].strawberry = false;
      } else {
        this.board.grid[rowNum][this.colNum].color = this.board.grid[rowNum - 1][this.colNum].color;
        this.board.grid[rowNum][this.colNum].strawberry = this.board.grid[rowNum - 1][this.colNum].strawberry;
      }

    }
  }

  rightShiftColumns() {
    for (let rowNum = this.rowNum; rowNum >= 0; rowNum--) {
      for (let colNum = this.colNum; colNum >= 0; colNum--) {
        if (colNum === 0) {
          this.board.grid[rowNum][colNum].color = 'none';
          this.board.grid[rowNum][colNum].strawberry = false;
        } else {
          this.board.grid[rowNum][colNum].color = this.board.grid[rowNum][colNum - 1].color;
          this.board.grid[rowNum][colNum].strawberry = this.board.grid[rowNum][colNum - 1].strawberry;
        }
      }
    }
  }


  contiguousSameColorTiles(csct = []) {
    DIRS.map(dir => {
      const newRowNum = this.rowNum + dir[0];
      const newColNum = this.colNum + dir[1];
      if (this.board.grid[newRowNum] &&
        this.board.grid[newRowNum][newColNum] &&
        this.sameColor(this.board.grid[newRowNum][newColNum])) {
        const otherTile = this.board.grid[newRowNum][newColNum];
        if (csct.filter(tile => tile.rowNum === otherTile.rowNum && tile.colNum === otherTile.colNum).length === 0) {
          csct.push(otherTile);
          csct.concat(otherTile.contiguousSameColorTiles(csct));
        }
      } else {
        return csct;
      }
    });
    return csct;
  }

  sameColor(otherTile) {
    return (this.color === otherTile.color);
  }

}
