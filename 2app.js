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
removeButton.addEventListener('click', deletingItem);

//FUNCTIONS

function addingItems() {
    //console.log(newItem.value);
    const toDoLi = document.createElement('li');
    const toDoInput = document.createElement('input');
    toDoLi.innerText = newItem.value
    toDoInput.innerText = newItem.value   
    //toDoInput.innerText = newItem.value   
   
    toDoLi.classList.add("list-group-item", "border-0", "d-flex", "align-items-center", "ps-0");
    //toDoInput.classList.add("form-check-input", "me-3");
    listContent.appendChild(toDoLi);
    toDoLi.appendChild(toDoInput);
    toDoLi.innerHTML = `<input class="form-check-input me-3" type="checkbox" value="" aria-label="..." /> <div>${newItem.value}</div>`
    //the not yet existing element being grabbed
    const  checkboxActive = document.querySelectorAll('.form-check-input');
    checkboxActive.forEach(box => {box.addEventListener('click', selectingItem )
    console.log(box);});
    const edit = document.querySelectorAll("li div")
    edit.forEach(item => {item.addEventListener('dblclick', editItem)})
    console.log(edit)
}

function selectingItem (event) {
   // newItem.classList.add('deleteMe');
//console.log(event.target);
//console.log(event.target.parentNode);
event.target.parentNode.classList.toggle('deleteMe');
event.target.parentNode.classList.toggle('crossOut');
}

function deletingItem () {
    const  toBeDeleted = document.querySelectorAll('.crossOut'); 
    toBeDeleted.forEach(box => {box.remove();
        console.log(box);})
}

function editItem (event) {
    const inputField = document.createElement("input")
    event.target.parentNode.appendChild(inputField)
    event.target.remove()
    console.log(event)
}