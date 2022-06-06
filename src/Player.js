export default class Player {
  constructor(name, board, cellState) {
    this.name = name;
    this.board = board;
    this.cellState = cellState;
  }

  getMove() {
    return this.board.getCell();
  }
}
