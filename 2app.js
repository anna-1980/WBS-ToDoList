//------------------SELECTORS------------------//
const addButton = document.querySelector(".addButton");
const removeButton = document.querySelector(".removeButton");
const inputField = document.querySelector(".inputField");
const listContent = document.querySelector(".listContent");

//------------------EVENT LISTENERS------------------//
addButton.addEventListener("click", addingTodos);
inputField.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addingTodos();
  }
});
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

//LIST ALL TODOS THAT ARE SAVE IN THE LOCAL STORAGE WHEN OPENING/REFRESHING THE PAGE
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
    addAllRelevantEventListenersToNewTodo();
  });
}

function addAllRelevantEventListenersToNewTodo() {
  //GRABBING ALL CHECKBOXES AND ADDING AN EVENT LISTENER TO THEM
  const checkboxActive = document.querySelectorAll(".form-check-input");
  checkboxActive.forEach((box) => {
    box.addEventListener("click", selectingItem);
  });

  //GRABBING ALL DIVS (TODOS) THAT CAN BE EDITED AND ADDING AN EVENT LISTENER TO THEM
  const edit = document.querySelectorAll("li div");
  edit.forEach((item) => {
    item.addEventListener("dblclick", editTodo);
  });

  //CLEARING THE INPUT VALUE
  inputField.value = "";
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
    //SAVING TODOS TO THE LOCAL STORAGE
    saveTodosToLocalStorage(inputField.value);

    addAllRelevantEventListenersToNewTodo();
  }
}

//TOGGLE CROSS OUT CSS CLASSES
function selectingItem(event) {
  event.target.parentNode.classList.toggle("deleteMe");
  event.target.parentNode.classList.toggle("crossOut");
}

//DELETING AN ITEM
function deletingItem() {
  //GRABBING ALL ELEMENTS THAT ARE CROSSED OUT BY SELECTING ALL ELEMENTS WITH CLASS .crossOut
  const toBeDeleted = document.querySelectorAll(".crossOut");
  toBeDeleted.forEach((element) => {
    //SPLICE (REMOVE ITEM FROM ARRAY) BY SEARCHING FOR THE INNER TEXT OF THE SECOND CHILDREN OF LI ELEMENT
    todos.splice(todos.indexOf(element.children[1].innerText), 1);
    element.remove();
  });
  //UPDATE LOCAL STORAGE
  localStorage.setItem("todos", JSON.stringify(todos));
}

//FEATURE TO EDIT TODO
function editTodo(event) {
  //CREATE NEW INPUT FIELD
  const inputField = document.createElement("input");
  //ADD DIV TEXT (TODO TEXT) TO THE INPUT VALUE
  inputField.value = event.target.innerText;
  //GRAB FUTURE PARENT ELEMENT OF NEWLY CREATED INPUT
  const liParent = event.target.parentNode;
  //APPEND INPUT TO LI ELEMENT
  liParent.appendChild(inputField);

  //ADD EVENTLISTENER TO NEWLY CREATED INPUT
  inputField.addEventListener("keyup", (e) => {
    //CHECK IF KEY THAT WAS PRESSED WAS ENTER OR ESCAPE KEY
    if (e.key === "Enter" || e.key === "Escape") {
      //UPDATING THE LOCAL STORAGE
      todos[todos.indexOf(event.target.innerText)] = inputField.value;
      localStorage.setItem("todos", JSON.stringify(todos));
      //CREATE NEW DIV ELEMENT
      const editedDiv = document.createElement("div");
      //SET INNERTEXT OF NEW DIV ELEMENT TO THE CURRENT INPUT VALUE
      editedDiv.innerText = inputField.value;
      //APPEND NEW DIV TO LI ELEMENT
      liParent.appendChild(editedDiv);
      //REMOVE INPUT
      inputField.remove();
      //ADD EVENT LISTENER TO EVERY EDITABLE DIV (TODO TEXT)
      edit = document.querySelectorAll("li div");
      edit.forEach((item) => {
        item.addEventListener("dblclick", editTodo);
      });
    }
  });
  event.target.remove();
}

//SETTING TODAY'S DATE
const dateToday = document.querySelector(".today-date");
let today = new Date().toLocaleDateString();
dateToday.innerText = today;
