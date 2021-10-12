//SELECTORS

const addButton = document.querySelector('.addButton');
const removeButton = document.querySelector('.removeButton');
const newItem = document.querySelector('.newItem');
const listContent = document.querySelector('.listContent');

console.log(addButton);
console.log(removeButton);
console.log(newItem);
console.log(listContent);

//EVENT LISTENERS
addButton.addEventListener( 'click', addingItems);


//FUNCTIONS

function addingItems() {
    console.log(newItem.value);
    const toDoDiv = document.createElement('div');
    toDoDiv.innerText = newItem.value   
    listContent.appendChild(toDoDiv);
}
