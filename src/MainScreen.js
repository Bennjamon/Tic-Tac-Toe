import Board from "./Board";
import CELL_STATES from "./CELL_STATES";
import Computer from "./Computer";
import Player from "./Player";
import Screen from "./Screen";

export default class MainScreen extends Screen {
  constructor($pvpButton, $pvcButton) {
    super(document.querySelector("#main-screen"));

    this.$pvpButton = $pvpButton;
    this.$pvcButton = $pvcButton;
  }

  start() {
    console.log("MainScreen.start()");

    this.initEvents();
  }

  initEvents() {
    this.$pvpButton.addEventListener("click", () => {
      const board = new Board(document.querySelector("#board"));
      const player1 = new Player("cross", board, CELL_STATES.CROSS);
      const player2 = new Player("circle", board, CELL_STATES.CIRCLE);

      this.screenHandler.changeScreen(
        this.screenHandler.SCREENS.IN_GAME,
        board,
        player1,
        player2
      );
    });

    this.$pvcButton.addEventListener("click", () => {
      const board = new Board(document.querySelector("#board"));
      const player1 = new Player("cross", board, CELL_STATES.CROSS);
      const computer = new Computer("circle", board, CELL_STATES.CIRCLE);

      this.screenHandler.changeScreen(
        this.screenHandler.SCREENS.IN_GAME,
        board,
        player1,
        computer
      );
    });
  }
}
