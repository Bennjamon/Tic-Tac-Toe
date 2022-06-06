import "../styles/index.css";

import Game from "./Game.js";
import { Player } from "./Player.js";

const $board = document.querySelector("#board");

const $partialPiece = document.createElement("div");

$partialPiece.classList.add("piece");
$partialPiece.classList.add("cross");
$partialPiece.classList.add("partial");

const player1 = new Player();
const player2 = new Player();

const game = new Game($board, player1, player2);

player1.defineGame(game);
player2.defineGame(game);

game.start();
