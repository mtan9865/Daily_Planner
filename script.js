let taskList = document.getElementById("ul-el")
const errorMsg = document.getElementById("error-msg")
const inputEl = document.getElementById("taskInput")
const inputBtnEl = document.getElementById("addTaskButton")
let taskArray = getTasksFromLocalStorage()

inputEl.focus()

function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem("taskArray")) || []
}

function updateTasksInLocalStorage() {
    localStorage.setItem("taskArray", JSON.stringify(taskArray))
}

function createTask(taskText) {
    return {text: taskText, completed: false}
}

function deleteTask(index) {
    taskArray.splice(index, 1);
    updateTasksInLocalStorage();
}

function createTaskElement(taskObj, index) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("taskItem");
  
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.checked = taskObj.completed;
    checkbox.addEventListener("change", function () {
        taskObj.completed = checkbox.checked;
        taskTextElement.classList.toggle("completed", taskObj.completed);
        updateTasksInLocalStorage();
    });
  
    const taskTextElement = document.createElement("span");
    taskTextElement.classList.add("taskText");
    taskTextElement.textContent = taskObj.text;
    taskTextElement.classList.toggle("completed", taskObj.completed);
  
    const removeButton = document.createElement("button");
    removeButton.classList.add("removeButton");
    removeButton.textContent = "X";
    removeButton.addEventListener("click", function () {
        deleteTask(index);
        renderTasks();
    });
  
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskTextElement);
    taskItem.appendChild(removeButton);
  
    return taskItem;
}

function renderTasks() {
    taskList.innerHTML = "";

    for (let i = 0; i < taskArray.length; i++) {
        const taskElement = createTaskElement(taskArray[i], i);
        taskList.appendChild(taskElement);
    }
}

inputBtnEl.addEventListener("click", function() {
    let removedWhiteSpace = inputEl.value.trim()

    if (removedWhiteSpace === "") {
        errorMsg.textContent = "Please enter a new task."
    } else {
        errorMsg.textContent = ""        
        const newTask = createTask(removedWhiteSpace)
        taskArray.push(newTask)
        updateTasksInLocalStorage()     
        inputEl.value = ""
        renderTasks()
    }
    inputEl.focus()
})

inputEl.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        let removedWhiteSpace = inputEl.value.trim()

        if (removedWhiteSpace === "") {
            errorMsg.textContent = "Please enter a new task."
        } else {
            // event.preventDefault()
            errorMsg.textContent = ""
            const newTask = createTask(removedWhiteSpace)
            taskArray.push(newTask)
            updateTasksInLocalStorage()
            inputEl.value = ""
            renderTasks()
        }
    }
    inputEl.focus()
})

renderTasks()
