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
    const toDoLi = document.createElement('li');
    const toDoInput = document.createElement('input');
    toDoLi.innerText = newItem.value
    toDoInput.innerText = newItem.value   
    //toDoInput.innerText = newItem.value   
   
    toDoLi.classList.add("list-group-item", "border-0", "d-flex", "align-items-center", "ps-0");
    //toDoInput.classList.add("form-check-input", "me-3");
    listContent.appendChild(toDoLi);
    toDoLi.appendChild(toDoInput);
    toDoLi.innerHTML = `<input class="form-check-input me-3" type="checkbox" value="" aria-label="..." />${newItem.value}`
}

