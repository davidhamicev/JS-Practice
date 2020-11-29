// ЗАДАЧА 1
//массив категорий
//isArchived - категория в архиве или нет
//offerCount - количество предложений в категории
//написать функцию, которая принимает на вход массив выше и возвращает массив категорий, 
//у которых количество предложений больше нуля и которые не являются архивными
//Если поле offerCount отсутсвует, считать что в категории предложений больше нуля

const categories = [
	{ id: 7, isArchived: true, offerCount: 0 },
	{ id: 1, isArchived: true, offerCount: 23 },
	{ id: 5, isArchived: true },
	{ id: 4, isArchived: false, offerCount: 0 },
	{ id: 2, isArchived: false, offerCount: 37 },
	{ id: 5, isArchived: false },
];

function filterCategories(categoris) {
	return categories.filter(category => !category.isArchived &&
		(!category.hasOwnProperty('offerCount') || category.offerCount > 0));
};
console.log('Task-1');
console.log("filterCategories", filterCategories(categories), '\n\n');
