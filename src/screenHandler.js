import GameScreen from "./GameScreen";
import MainScreen from "./MainScreen";
import SCREENS from "./SCREENS";

const screenHandler = {
  curentScreen: null,
  SCREENS,
  changeScreen(screen, ...args) {
    if (this.curentScreen) {
      this.curentScreen.hide();
    }

    switch (screen) {
      case this.SCREENS.MAIN:
        this.curentScreen = new MainScreen(...args);
        break;
      case this.SCREENS.IN_GAME:
        this.curentScreen = new GameScreen(...args);
        break;
      default:
        this.curentScreen = null;
    }

    if (this.curentScreen) {
      this.curentScreen.render(this);
    }
  },
};

export default screenHandler;
