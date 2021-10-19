//------------------SELECTORS------------------//

const addButton = document.querySelector(".addButton");
const removeButton = document.querySelector(".removeButton");
const inputField = document.querySelector(".inputField");
const listContent = document.querySelector(".listContent");

//------------------EVENT LISTENERS------------------//
addButton.addEventListener("click", addingTodos);
removeButton.addEventListener("click", deletingItem);

//CHECK LOCAL STORAGE: IF EMPTY CREATE NEW ARRAY todos; IF NOT EMPTY
//ADD todos FROM LOCAL STORAGE TO ARRAY todos
let todos;
if (localStorage.getItem("todos") === null) {
  todos = [];
} else {
  todos = JSON.parse(localStorage.getItem("todos"));
}
//SETTING BOOLEAN TO TRUE
let listingTodos = true;

//------------------FUNCTIONS------------------//
//SAVING TODOS TO LOCAL STORAGE
function saveTodosToLocalStorage(item) {
  todos.push(item);
  localStorage.setItem("todos", JSON.stringify(todos));
}

listAllTodos();

function listAllTodos() {
  todos.forEach((todo) => {
    const toDoLi = document.createElement("li");
    toDoLi.innerText = inputField.value;
    toDoLi.classList.add(
      "list-group-item",
      "border-0",
      "d-flex",
      "align-todos-center",
      "ps-0"
    );
    listContent.appendChild(toDoLi);
    toDoLi.innerHTML = `<input class="form-check-input me-3" type="checkbox" value="" aria-label="..." /> <div>${todo}</div>`;

    //GRABBING ALL CHECKBOXES AND ADDING AN EVENT LISTENER TO THEM
    const checkboxActive = document.querySelectorAll(".form-check-input");
    checkboxActive.forEach((box) => {
      box.addEventListener("click", selectingItem);
    });

    //GRABBING ALL DIVS (TODOS) THAT CAN BE EDITED AND ADDING AN EVENT LISTENER TO THEM
    const edit = document.querySelectorAll("li div");
    edit.forEach((item) => {
      item.addEventListener("dblclick", editItem);
    });

    //CLEARING THE INPUT VALUE
    inputField.value = "";
  });
  listingTodos = false;
}

//ADDING A NEW TODO
function addingTodos() {
  //CHECKING IF INPUT IS EMPTY
  if (inputField.value === "") {
    return;
  } else {
    //CREATING LI ELEMENT AND ADDING CLASSES, INNERHTML AND APPENDING IT TO THE UNORDERED LIST
    const toDoLi = document.createElement("li");
    toDoLi.innerText = inputField.value;
    toDoLi.classList.add(
      "list-group-item",
      "border-0",
      "d-flex",
      "align-todos-center",
      "ps-0"
    );
    listContent.appendChild(toDoLi);
    toDoLi.innerHTML = `<input class="form-check-input me-3" type="checkbox" value="" aria-label="..." /> <div>${inputField.value}</div>`;

    //GRABBING ALL CHECKBOXES AND ADDING AN EVENT LISTENER TO THEM
    const checkboxActive = document.querySelectorAll(".form-check-input");
    checkboxActive.forEach((box) => {
      box.addEventListener("click", selectingItem);
    });

    //GRABBING ALL DIVS (TODOS) THAT CAN BE EDITED AND ADDING AN EVENT LISTENER TO THEM
    const edit = document.querySelectorAll("li div");
    edit.forEach((item) => {
      item.addEventListener("dblclick", editItem);
    });

    //SAVING TODOS TO THE LOCAL STORAGE
    saveTodosToLocalStorage(inputField.value);

    //CLEARING THE INPUT VALUE
    inputField.value = "";
  }
}

function selectingItem(event) {
  event.target.parentNode.classList.toggle("deleteMe");
  event.target.parentNode.classList.toggle("crossOut");
}

function deletingItem() {
  const toBeDeleted = document.querySelectorAll(".crossOut");
  toBeDeleted.forEach((element) => {
    console.log(element.children[1].innerText);

    // COMMENT HERE LATER
    todos.splice(todos.indexOf(element.children[1].innerText), 1);
    console.log(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  });
  toBeDeleted.forEach((box) => {
    box.remove();
    // console.log(box);
  });
}

function editItem(event) {
  console.log(event.target.innerText);
  const inputField = document.createElement("input");
  inputField.value = event.target.innerText;
  const liParent = event.target.parentNode;

  inputField.addEventListener("keyup", (e) => {
    if (e.key === "Enter" || e.key === "Escape") {
      const editedDiv = document.createElement("div");
      editedDiv.innerText = inputField.value;
      liParent.appendChild(editedDiv);
      inputField.remove();
      edit = document.querySelectorAll("li div");
      edit.forEach((item) => {
        item.addEventListener("dblclick", editItem);
      });
    }
  });
  event.target.parentNode.appendChild(inputField);
  event.target.remove();
}
