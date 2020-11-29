//ЗАДАЧА 3
//Вывести на странице браузера две кнопки "Добавить" и "Удалить",
// и ниже пустой блок, в который будут добавляться элементы
//При нажатии на кнопку "добавить" - добавлять в контейнер синий квадрат с порядковым номером
//При нажатии на кнопку "удалить" - удалять первый в списке элемент 
//и пересчитать все номера на квадратах
//требований к верстки нет
//использовать js библиотеки нельзя

const addButton = document.getElementById('add');
const delButton = document.getElementById('del');
const blocksContainer = document.querySelector('.blocks');

addButton.addEventListener('click', addBlock);
delButton.addEventListener('click', delBlock);

function addBlock() {
	const newBlock = document.createElement('div');
	newBlock.classList.add('block');
	blocksContainer.appendChild(newBlock);

	setNums();
}

function delBlock() {
	const block = document.querySelector('.block');
	block && block.remove();

	setNums();
}

function setNums() {
	const allBlocks = document.querySelectorAll('.block');
	Array.from(allBlocks).map((block, idx) => {
		block.textContent = idx + 1;
	})
}
