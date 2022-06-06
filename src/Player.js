import CELL_STATES from "./CELL_STATES.js";

export class Player {
  defineGame(game) {
    this.game = game;
  }

  getMove() {
    return new Promise((resolve, reject) => {
      const listener = (e) => {
        const $cell = e.target;

        if ($cell.classList.contains("partial")) {
          $cell = $cell.parentNode;
        }

        if (
          !$cell.classList.contains("cell") ||
          ($cell.firstChild && !$cell.firstChild.classList.contains("partial"))
        ) {
          return;
        }

        this.game.$board.removeEventListener("click", listener);

        const idx = Array.from(this.game.$board.children).indexOf($cell);

        const row = Math.floor(idx / 3);
        const column = idx % 3;

        if (this.game.board[row][column] !== CELL_STATES.EMPTY) {
          return;
        }

        resolve([row, column]);
      };

      this.game.$board.addEventListener("click", listener);
    });
  }
}
