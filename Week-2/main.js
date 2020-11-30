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

const Game = {
	gameTable: document.querySelector('.game__table'),
	currentPlayerName: document.querySelector('.game__player-cur'),
	gameResult: document.querySelector('.game__result'),
	restartButton: document.querySelector('.game__restart'),
	currentPlayer: (Math.random() > 0.5) ? 'X' : 'O',
	gameState: new Array(9).fill(null),
	winOptions: [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	],
	init() {
		this.setCurrentPlayerName();
		this.gameTable.addEventListener('click', Game.handleTurn.bind(Game));
		this.restartButton.addEventListener('click', Game.handleRestart.bind(Game));
	},
	//
	handleTurn() {
		const currentCell = event.target;
		const currentCellId = currentCell.dataset.cellId;
	
		if (!currentCell.classList.contains('game__cell'))
			return false;

		if (this.currentPlayer === 'X') {
			currentCell.classList.add('-tic');
			this.gameState[currentCellId] = this.currentPlayer;
		}
		else {
			currentCell.classList.add('-tac');
			this.gameState[currentCellId] = this.currentPlayer;
		}
		
		if (this.isWin()) {
			this.finisnigGame();
			return false;
		}
		else if (!this.gameState.includes(null)) {
			console.log('ничья!');
			return false;
		}

		this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
		this.setCurrentPlayerName();
	},

	setCurrentPlayerName() {
		this.currentPlayer === 'X' ? this.currentPlayerName.textContent = 'X' : this.currentPlayerName.textContent = 'O';
	},

	handleRestart() {
		this.gameTable.classList.remove('-finished');
		this.gameState = new Array(9).fill(null);
		this.gameResult.textContent = '';
		this.currentPlayer = (Math.random() > 0.5) ? 'X' : 'O';
		
		this.clearBorde();
		this.setCurrentPlayerName();
	},
	
	clearBorde() {
		const allCells = Array.from(document.querySelectorAll('.game__cell'));
		
		allCells.map(cell => {
			cell.classList.contains('-tic') && cell.classList.remove('-tic');
			cell.classList.contains('-tac') && cell.classList.remove('-tac');
		});
	},

	isWin() {
		for (let option of this.winOptions) {
			let [a, b, c] = option;
			if (this.isOptionsEqual(this.gameState[a], this.gameState[b], this.gameState[c]))
				return true
		}
		return false
	},

	isOptionsEqual(a, b, c) {
		if (a && b && c) return a === b && a === c && b === c;
	},

	finisnigGame() {
		this.gameResult.textContent = `${this.currentPlayer} WON!`;
		this.gameTable.classList.add('-finished');
	}
};

Game.init();
