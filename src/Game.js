import CELL_STATES from "./CELL_STATES.js";
import popup from "./popup.js";

export default class Game {
  #currentPlayer = CELL_STATES.CROSS;

  constructor($board, player1, player2) {
    this.$board = $board;
    this.player1 = player1;
    this.player2 = player2;
    this.#currentPlayer = CELL_STATES.CROSS;
    this.board = [...Array(3)].map(() =>
      [...Array(3)].map(() => CELL_STATES.EMPTY)
    );
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
    this.board = [...Array(3)].map(() =>
      [...Array(3)].map(() => CELL_STATES.EMPTY)
    );

    this.draw();
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
      .then(([row, column]) => {
        this.board[row][column] = this.#currentPlayer;
        this.draw();
        this.checkWinner();
        this.switchPlayer();
        this.start();
      })
      .catch((e) => {
        if (e.message === "End of game") {
          this.determineWinner(e.coordinates);
        }
      });
  }

  switchPlayer() {
    this.#currentPlayer =
      this.#currentPlayer === CELL_STATES.CROSS
        ? CELL_STATES.CIRCLE
        : CELL_STATES.CROSS;
  }

  draw() {
    this.board.forEach((row, i) => {
      row.forEach((cell, j) => {
        const $cell = this.$board.children[i * 3 + j];

        if (cell === CELL_STATES.EMPTY) {
          if (
            $cell.firstChild &&
            !$cell.firstChild.classList.contains("partial")
          ) {
            $cell.removeChild($cell.firstChild);
          }

          return;
        }

        if ($cell.firstChild) {
          if ($cell.firstChild.classList.contains("piece")) {
            return;
          }

          $cell.removeChild($cell.firstChild);
        }

        const $piece = document.createElement("div");

        $piece.classList.add("piece");

        $piece.classList.add(cell === CELL_STATES.CROSS ? "cross" : "circle");

        $cell.appendChild($piece);
      });
    });
  }

  drawScores() {
    const selector = `#player-${this.#currentPlayer}-score`;

    document.querySelector(selector).textContent =
      this.scores[this.#currentPlayer];
  }

  determineWinner(coordinates) {
    this.scores[this.#currentPlayer]++;
    this.drawScores();

    coordinates.forEach(([row, column]) => {
      const $cell = this.$board.children[row * 3 + column];

      $cell.firstChild.classList.add("winner");
    });

    popup.show(`Player ${this.#currentPlayer} wins!`);
  }

  checkWinner() {
    for (let i = 0; i < 3; i++) {
      if (
        this.board[i][0] === this.board[i][1] &&
        this.board[i][1] === this.board[i][2] &&
        this.board[i][0] !== CELL_STATES.EMPTY
      ) {
        const error = new Error("End of game");

        error.coordinates = [
          [i, 0],
          [i, 1],
          [i, 2],
        ];

        throw error;
      }

      if (
        this.board[0][i] === this.board[1][i] &&
        this.board[1][i] === this.board[2][i] &&
        this.board[0][i] !== CELL_STATES.EMPTY
      ) {
        const error = new Error("End of game");

        error.coordinates = [
          [0, i],
          [1, i],
          [2, i],
        ];

        throw error;
      }
    }

    if (
      this.board[0][0] === this.board[1][1] &&
      this.board[1][1] === this.board[2][2] &&
      this.board[0][0] !== CELL_STATES.EMPTY
    ) {
      const error = new Error("End of game");

      error.coordinates = [
        [0, 0],
        [1, 1],
        [2, 2],
      ];

      throw error;
    }

    if (
      this.board[0][2] === this.board[1][1] &&
      this.board[1][1] === this.board[2][0] &&
      this.board[0][2] !== CELL_STATES.EMPTY
    ) {
      const error = new Error("End of game");

      error.coordinates = [
        [0, 2],
        [1, 1],
        [2, 0],
      ];

      throw error;
    }
  }
}
