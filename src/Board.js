import CELL_STATES from "./CELL_STATES";

export default class Board {
  constructor($board) {
    this.$board = $board;
    this.board = [...Array(3)].map(() =>
      [...Array(3)].map(() => CELL_STATES.EMPTY)
    );

    this.startPartial();
  }

  getCell() {
    return new Promise((resolve, reject) => {
      const listener = (e) => {
        let $cell = e.target;

        if ($cell.classList.contains("partial")) {
          $cell = $cell.parentNode;
        }

        if (!$cell.classList.contains("cell")) {
          return;
        }

        if (
          $cell.firstChild &&
          !$cell.firstChild.classList.contains("partial")
        ) {
          return;
        }

        $cell.removeChild($cell.firstChild);

        const idx = Array.from(this.$board.children).indexOf($cell);

        resolve({
          row: Math.floor(idx / 3),
          column: idx % 3,
        });

        this.$board.removeEventListener("click", listener);
      };

      this.$board.addEventListener("click", listener);
    });
  }

  addPiece(row, column, player) {
    const $cell = this.$board.children[row * 3 + column];
    const $piece = document.createElement("div");

    $piece.classList.add("piece");
    $piece.classList.add(player.name);

    $cell.appendChild($piece);

    this.board[row][column] = player.cellState;

    this.$partial.classList.toggle("cross");
    this.$partial.classList.toggle("circle");
  }

  clear() {
    this.board = [...Array(3)].map(() =>
      [...Array(3)].map(() => CELL_STATES.EMPTY)
    );

    Array.from(this.$board.children).forEach(($cell) => {
      while ($cell.firstChild) {
        $cell.removeChild($cell.firstChild);
      }
    });

    this.$partial.classList.add("cross");
    this.$partial.classList.remove("circle");
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

  checkTie() {
    if (!this.board.flat().includes(CELL_STATES.EMPTY)) {
      const error = new Error("End of game");

      error.coordinates = [];

      throw error;
    }
  }

  determineWinner(coordinates) {
    coordinates.forEach(([row, column]) => {
      const $cell = this.$board.children[row * 3 + column];

      $cell.firstChild.classList.add("winner");
    });
  }

  startPartial() {
    this.$partial = document.createElement("div");

    this.$partial.classList.add("partial");
    this.$partial.classList.add("piece");
    this.$partial.classList.add("cross");

    this.$board.addEventListener("mousemove", (e) => {
      if (e.target === this.$partial) {
        return;
      }

      if (this.$partial.parentNode) {
        if (this.$partial.parentNode === e.target) {
          return;
        }

        this.$partial.parentNode.removeChild(this.$partial);
      }

      if (e.target.classList.contains("cell") && !e.target.firstChild) {
        e.target.appendChild(this.$partial);
      }
    });
  }
}
