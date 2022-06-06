import CELL_STATES from "./CELL_STATES.js";
import popup from "./popup.js";

export default class Game {
  #currentPlayer = CELL_STATES.CROSS;

  constructor(board, player1, player2) {
    this.board = board;
    this.player1 = player1;
    this.player2 = player2;
    this.#currentPlayer = CELL_STATES.CROSS;
    this.scores = {
      [CELL_STATES.CROSS]: 0,
      [CELL_STATES.CIRCLE]: 0,
    };
  }

  get currentPlayer() {
    return this.#currentPlayer === CELL_STATES.CROSS
      ? this.player1
      : this.player2;
  }

  reset() {
    this.#currentPlayer = CELL_STATES.CROSS;
    this.board.clear();

    this.getMove();
  }

  start() {
    popup.addListener(() => {
      this.reset();
    });

    this.getMove();
  }

  getMove() {
    this.currentPlayer
      .getMove()
      .then(({ row, column }) => {
        this.board.addPiece(row, column, this.currentPlayer);

        this.board.checkWinner();
        this.board.checkTie();
        this.switchPlayer();
        this.getMove();
      })
      .catch((e) => {
        if (e.message === "End of game") {
          if (e.coordinates.length === 0) {
            popup.show("It's a tie!");
          } else {
            this.determineWinner(e.coordinates);
          }

          return;
        }

        throw e;
      });
  }

  switchPlayer() {
    this.#currentPlayer =
      this.#currentPlayer === CELL_STATES.CROSS
        ? CELL_STATES.CIRCLE
        : CELL_STATES.CROSS;
  }

  drawScores() {
    const selector = `#player-${this.#currentPlayer}-score`;

    document.querySelector(selector).textContent =
      this.scores[this.#currentPlayer];
  }

  determineWinner(coordinates) {
    this.scores[this.#currentPlayer]++;
    this.drawScores();

    this.board.determineWinner(coordinates);

    popup.show(`Player ${this.#currentPlayer} wins!`);
  }
}
