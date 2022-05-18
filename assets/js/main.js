const inputTask = document.querySelector("#new-task-input");
const addTask = document.querySelector(".add-task");
const tasks = document.querySelector(".tasks");

function createLi() {
  const li = document.createElement("li");
  return li;
}

function createDeleteButton(li) {
  //da um espaçamento do bottão
  li.innerText += " ";
  const buttonDelete = document.createElement("button");
  buttonDelete.innerText = "Apagar";
  buttonDelete.setAttribute("class", "delete-button");
  li.appendChild(buttonDelete);
}

function createTask(inputTaskText) {
  const li = createLi();
  li.innerText = inputTaskText;
  tasks.appendChild(li);
  createDeleteButton(li);
}

function saveTask() {
  const liTasks = tasks.querySelectorAll("li");
  const listTasks = [];

  for (let task of liTasks) {
    let taskText = task.innerText;
    taskText = taskText.replace("Apagar", "").trim();
    listTasks.push(taskText);
  }

  const tasksJSON = JSON.stringify(listTasks);

  localStorage.setItem("tasks", tasksJSON);
}

function cleanInput() {
  inputTask.value = "";
  inputTask.focus();
}

addTask.addEventListener("click", function (e) {
  if (!inputTask.value) return;
  createTask(inputTask.value);
  cleanInput();
  saveTask();
});

document.addEventListener("click", function (e) {
  const element = e.target;

  if (element.classList.contains("delete-button")) {
    element.parentElement.remove();
    saveTask();
  }
});

inputTask.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    if (!inputTask.value) return;
    createTask(inputTask.value);
    cleanInput();
    saveTask();
  }
});

function addSaveTasks() {
  const tasks = localStorage.getItem("tasks");
  const listTasks = JSON.parse(tasks);

  for (task of listTasks) {
    createTask(task);
  }
}
addSaveTasks();
