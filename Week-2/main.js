"use strict"

// Сделать игру крестики-нолики.
// На страничке поле 3х3. И кнопка Сброс - очистить поле и начать игру заново.
// Сверху отображается надпись о том, чей сейчас ход(Сейчас ходит: Х/0)
// При нажатии на ячейку поля туда вставляется Х/0. Игра заканчивается когдасобрали 3 одинаковых символа по вертикали/горизонтали/диагонали, либо ничья.
// После окончания игры снизу показывать подпись о результате: Выиграл Х/0 или Ничья
// Требований к верстке нет.
// Использовать js библиотеки нельзя.
// Желательно использовать ООП и прототипы. Если сложно, можно какую-то маленькую часть сделать на прототипах.
// За неделю возможно проблематично будет сделать, поэтому таких жестких сроков нет)
// Если совсем не понятно как это делать или есть вопросы - пиши
const PLAYER_X = 'X'
const PLAYER_O = 'O'

function Game(gameBoard) {
	this.gameTable = gameBoard.querySelector('.game__table'),
	this.currentPlayerName = gameBoard.querySelector('.game__player-cur'),
	this.gameResult = gameBoard.querySelector('.game__result'),
	this.restartButton = gameBoard.querySelector('.game__restart'),
	this.currentPlayer = (Math.random() > 0.5) ? PLAYER_X : PLAYER_O,
	this.gameState = new Array(9).fill(null),
	this.winOptions = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	],
	this.init = function() {
		this.setCurrentPlayerName();
		this.gameTable.addEventListener('click', this.handleTurn.bind(this));
		this.restartButton.addEventListener('click', this.handleRestart.bind(this));
	},
	this.handleTurn = function(event) {
		const currentCell = event.target;
		const currentCellId = currentCell.dataset.cellId;
	
		if (!currentCell.classList.contains('game__cell'))
			return;

		if (this.currentPlayer === PLAYER_X) {
			currentCell.classList.add('-tic');
			this.gameState[currentCellId] = this.currentPlayer;
		}
		else {
			currentCell.classList.add('-tac');
			this.gameState[currentCellId] = this.currentPlayer;
		}
		
		if (this.isWin()) {
			this.finisnigGame();
			return;
		}
		else if (!this.gameState.includes(null)) {
			this.gameResult.textContent = `It's a draw!`;
			return;
		}

		this.currentPlayer = this.currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
		this.setCurrentPlayerName();
	},

	this.setCurrentPlayerName = function() {
		this.currentPlayer === PLAYER_X ? this.currentPlayerName.textContent = PLAYER_X : this.currentPlayerName.textContent = PLAYER_O;
	},

	this.handleRestart = function() {
		this.gameTable.classList.remove('-finished');
		this.gameState = new Array(9).fill(null);
		this.gameResult.textContent = '';
		this.currentPlayer = (Math.random() > 0.5) ? PLAYER_X : PLAYER_O;
		
		this.clearBorde();
		this.setCurrentPlayerName();
	},
	
	this.clearBorde = function() {
		const allCells = Array.from(gameBoard.querySelectorAll('.game__cell'));
		allCells.map(cell => cell.classList.remove('-tac', '-tic'));
	},

	this.isWin = function() {
		for (let option of this.winOptions) {
			let [a, b, c] = option;
			if (this.isOptionsEqual(this.gameState[a], this.gameState[b], this.gameState[c]))
				return true
		}
		return false
	},

	this.isOptionsEqual = function(a, b, c) {
		if (a && b && c) return a === b && b === c;
	},

	this.finisnigGame = function() {
		this.gameResult.textContent = `${this.currentPlayer} Won!`;
		this.gameTable.classList.add('-finished');
	}
};

const game1 = new Game(document.querySelector('.game-1'));
const game2 = new Game(document.querySelector('.game-2'));

game1.init();
game2.init();
