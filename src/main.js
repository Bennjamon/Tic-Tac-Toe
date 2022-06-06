import "../styles/index.css";

import Game from "./Game.js";
import Player from "./Player.js";
import Board from "./Board";
import CELL_STATES from "./CELL_STATES";

const $board = document.querySelector("#board");

const $partialPiece = document.createElement("div");

$partialPiece.classList.add("piece");
$partialPiece.classList.add("cross");
$partialPiece.classList.add("partial");

const board = new Board($board);

const player1 = new Player("cross", board, CELL_STATES.CROSS);
const player2 = new Player("circle", board, CELL_STATES.CIRCLE);

const game = new Game(board, player1, player2);

game.start();
