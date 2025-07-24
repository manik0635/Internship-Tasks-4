const cells = document.querySelectorAll('.cell');
const statusDiv = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const modeRadios = document.querySelectorAll('input[name="mode"]');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let vsComputer = false;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');
  if (board[index] !== '' || !gameActive) {
    return;
  }
  updateCell(e.target, index);
  checkResult();
  if (gameActive && vsComputer && currentPlayer === 'O') {
    computerMove();
  }
}

function updateCell(cell, index) {
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDiv.textContent = `Player ${currentPlayer}'s turn`;
}

function checkResult() {
  let roundWon = false;
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusDiv.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }
  if (!board.includes('')) {
    statusDiv.textContent = "It's a draw!";
    gameActive = false;
    return;
  }
  changePlayer();
}

function computerMove() {
  // Simple AI: pick a random empty cell
  let emptyIndices = board
    .map((val, idx) => (val === '' ? idx : null))
    .filter(val => val !== null);
  if (emptyIndices.length === 0) return;
  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  const cell = document.querySelector(`.cell[data-index='${randomIndex}']`);
  updateCell(cell, randomIndex);
  checkResult();
}

function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  statusDiv.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => (cell.textContent = ''));
}

function handleModeChange() {
  vsComputer = document.querySelector('input[name="mode"]:checked').value === 'pvc';
  restartGame();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
modeRadios.forEach(radio => radio.addEventListener('change', handleModeChange));

statusDiv.textContent = `Player ${currentPlayer}'s turn`;
