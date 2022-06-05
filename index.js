const $ = (selector) => document.querySelector(selector);

const $board = $("#board");
const $scores = {
  player1: $("#player-1-score"),
  player2: $("#player-2-score"),
};
const $popupContainer = $("#popup-container");
const $popupContent = $("#popup-content");
const $popupButton = $("#popup-button");

const $partialPiece = document.createElement("div");

$partialPiece.classList.add("piece");
$partialPiece.classList.add("cross");
$partialPiece.classList.add("partial");

const CELL_STATES = {
  EMPTY: 0,
  CROSS: 1,
  CIRCLE: 2,
};

const gameData = {
  board: [...Array(3)].map(() => [...Array(3)].map(() => CELL_STATES.EMPTY)),
  scores: {
    player1: 0,
    player2: 0,
  },
  currentPlayer: CELL_STATES.CROSS,
};

function checkHorizontal() {
  for (let i = 0; i < 3; i++) {
    const row = gameData.board[i];
    if (
      row[0] === row[1] &&
      row[1] === row[2] &&
      row[0] !== CELL_STATES.EMPTY
    ) {
      return [
        [i, 0],
        [i, 1],
        [i, 2],
      ];
    }
  }

  return false;
}

function checkVertical() {
  for (let i = 0; i < 3; i++) {
    const col = gameData.board.map((row) => row[i]);
    if (
      col[0] === col[1] &&
      col[1] === col[2] &&
      col[0] !== CELL_STATES.EMPTY
    ) {
      return [
        [0, i],
        [1, i],
        [2, i],
      ];
    }
  }

  return false;
}

function checkDiagonal() {
  if (
    gameData.board[0][0] === gameData.board[1][1] &&
    gameData.board[1][1] === gameData.board[2][2] &&
    gameData.board[0][0] !== CELL_STATES.EMPTY
  ) {
    return [
      [0, 0],
      [1, 1],
      [2, 2],
    ];
  }

  if (
    gameData.board[0][2] === gameData.board[1][1] &&
    gameData.board[1][1] === gameData.board[2][0] &&
    gameData.board[0][2] !== CELL_STATES.EMPTY
  ) {
    return [
      [0, 2],
      [1, 1],
      [2, 0],
    ];
  }

  return false;
}

function checkForWin() {
  const row = checkHorizontal();

  if (row) {
    return row;
  }

  const col = checkVertical();

  if (col) {
    return col;
  }

  const diag = checkDiagonal();

  if (diag) {
    return diag;
  }
}

function checkForTie() {
  return gameData.board.every((row) =>
    row.every((cell) => cell !== CELL_STATES.EMPTY)
  );
}

function resetGame() {
  gameData.board = [...Array(3)].map(() =>
    [...Array(3)].map(() => CELL_STATES.EMPTY)
  );
  gameData.currentPlayer = CELL_STATES.CROSS;

  Array.from($board.children).forEach(($cell) => {
    while ($cell.firstChild) {
      $cell.removeChild($cell.firstChild);
    }
  });

  $partialPiece.classList.remove("circle");
  $partialPiece.classList.add("cross");
}

function determineWinner(coordinates) {
  if (gameData.currentPlayer === CELL_STATES.CROSS) {
    gameData.scores.player1++;
    $scores.player1.textContent = gameData.scores.player1;
  } else {
    gameData.scores.player2++;
    $scores.player2.textContent = gameData.scores.player2;
  }

  coordinates.forEach(([row, col]) => {
    const $cell = $board.children[row * 3 + col];
    const $piece = $cell.firstChild;

    $piece.classList.add("winner");
  });

  $popupContainer.classList.add("visible");

  $popupContent.textContent = `${
    gameData.currentPlayer === CELL_STATES.CROSS ? "Player 1" : "Player 2"
  } wins!`;
}

function setPartialPiece(coordinates) {
  const [row, col] = coordinates;

  const $cell = $board.children[row * 3 + col];

  if ($partialPiece.parentNode) {
    $partialPiece.parentNode.removeChild($partialPiece);
  }

  $cell.appendChild($partialPiece);
}

$board.addEventListener("click", (e) => {
  let $cell = e.target;

  if ($cell.classList.contains("partial")) {
    $cell = $cell.parentNode;
  }

  if (!$cell.classList.contains("cell")) {
    return;
  }

  $cell.removeChild($partialPiece);

  $partialPiece.classList.toggle("cross");
  $partialPiece.classList.toggle("circle");

  const idx = [...$board.children].indexOf($cell);

  const row = Math.floor(idx / 3);
  const column = idx % 3;

  if (gameData.board[row][column] !== CELL_STATES.EMPTY) {
    return;
  }

  gameData.board[row][column] = gameData.currentPlayer;

  const $piece = document.createElement("div");
  $piece.classList.add("piece");
  $piece.classList.add(
    gameData.currentPlayer === CELL_STATES.CROSS ? "cross" : "circle"
  );

  $cell.appendChild($piece);

  const coordinates = checkForWin();

  if (coordinates) {
    determineWinner(coordinates);
  }

  if (checkForTie()) {
    $popupContainer.classList.add("visible");
    $popupContent.textContent = "It's a tie!";
  }

  gameData.currentPlayer =
    gameData.currentPlayer === CELL_STATES.CROSS
      ? CELL_STATES.CIRCLE
      : CELL_STATES.CROSS;
});

$popupButton.addEventListener("click", () => {
  resetGame();
  $popupContainer.classList.remove("visible");
});

$board.addEventListener("mouseover", (e) => {
  const $cell = e.target;

  if (!$cell.classList.contains("cell")) {
    return;
  }

  const idx = [...$board.children].indexOf($cell);

  const row = Math.floor(idx / 3);
  const column = idx % 3;

  if (gameData.board[row][column] !== CELL_STATES.EMPTY) {
    return;
  }

  setPartialPiece([row, column]);
});
