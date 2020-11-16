//ЗАДАЧА 2
//Создать функцию counter, который при каждом вызове будет возвращать число увеличенное на 1

function makeCounter() {
	let count = 0;
	return function() {
		return count++;
	}
}

const counter1 = makeCounter();
const counter2 = makeCounter();

console.log('Task-2');
console.log("counter1 -", counter1())
console.log("counter1 -", counter1())
console.log("counter2 -", counter1(), '\n\n')
