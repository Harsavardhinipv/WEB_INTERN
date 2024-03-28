const ROWS = 6;
const COLS = 7;
let currentPlayer = 1; // Player 1: Red, Player 2: Blue
let board = [];

// Initialize the game board
function initBoard() {
  for (let row = 0; row < ROWS; row++) {
    board[row] = [];
    for (let col = 0; col < COLS; col++) {
      board[row][col] = 0; // 0 represents an empty cell
    }
  }
}

// Render the game board
function renderBoard() {
  const boardDiv = document.getElementById("board");
  boardDiv.innerHTML = "";
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener("click", () => dropPiece(col));
      if (board[row][col] === 1) {
        cell.style.backgroundColor = "red";
      } else if (board[row][col] === 2) {
        cell.style.backgroundColor = "blue";
      }
      boardDiv.appendChild(cell);
    }
    boardDiv.appendChild(document.createElement("br"));
  }
}

// Drop a piece into a column
function dropPiece(col) {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row][col] === 0) {
      board[row][col] = currentPlayer;
      renderBoard();
      if (checkWin(row, col)) {
        document.getElementById("winner").textContent = `Player ${currentPlayer} wins!`; // Display the winner
        return;
      } else {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
      }
      return;
    }
  }
}

// Check for a win condition
function checkWin(row, col) {
  const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];
  for (const [dx, dy] of directions) {
    let count = 1;
    for (const direction of [-1, 1]) {
      let r = row + direction * dx;
      let c = col + direction * dy;
      while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer) {
        count++;
        r += direction * dx;
        c += direction * dy;
      }
    }
    if (count >= 4) {
      return true;
    }
  }
  return false;
}

// Reset the game
function resetGame() {
  initBoard();
  renderBoard();
  currentPlayer = 1;
  document.getElementById("winner").textContent = ""; // Clear the winner text
}

// Set background gradient color
function setBackgroundGradient() {
  const body = document.querySelector('body');
  body.style.background = "linear-gradient(to bottom, #0B6623, #0B6623)";
}

// Initialize the game
initBoard();
renderBoard();
setBackgroundGradient();

document.getElementById("resetBtn").addEventListener("click", resetGame);
