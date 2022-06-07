import "../styles/index.css";
import screenHandler from "./screenHandler";
import SCREENS from "./SCREENS";

screenHandler.changeScreen(
  SCREENS.MAIN,
  document.querySelector("#player-vs-player"),
  document.querySelector("#player-vs-computer")
);
