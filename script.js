const board = document.getElementById('board');
const cells = Array.from(document.querySelectorAll('.cell'));
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('resetBtn');

let boardState = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(event) {
    const cellIndex = event.target.dataset.index;

    if (boardState[cellIndex] || !gameActive) {
        return;
    }

    boardState[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) {
        gameActive = false;
        statusDisplay.textContent = `${currentPlayer} wins!`;
    } else if (boardState.every(cell => cell !== null)) {
        gameActive = false;
        statusDisplay.textContent = "It's a tie!";
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });
}

function resetGame() {
    boardState = Array(9).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);
