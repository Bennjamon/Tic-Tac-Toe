import CELL_STATES from "./CELL_STATES";
import Player from "./Player";

export default class Computer extends Player {
  constructor(name, board, cellState) {
    super(name, board, cellState);
  }

  async getRandomEmptyCell() {
    let row = Math.floor(Math.random() * 3);
    let column = Math.floor(Math.random() * 3);

    while (this.board.board[row][column] !== CELL_STATES.EMPTY) {
      row = Math.floor(Math.random() * 3);
      column = Math.floor(Math.random() * 3);
    }

    return { row, column };
  }

  getMove() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.getRandomEmptyCell().then((coordinates) => {
          resolve(coordinates);
        });
      }, 1000);
    });
  }
}
