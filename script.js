let ulEl = document.getElementById("ul-el")
const errorMsg = document.getElementById("error-msg")
const inputEl = document.getElementById("taskInput")
const inputBtnEl = document.getElementById("addTaskButton")
let taskList = getTasksFromLocalStorage()

function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem("taskList")) || []
}

function updateTasksInLocalStorage() {
    localStorage.setItem("taskList", JSON.stringify(taskList))
}

function displayList() {
    ulEl.innerHTML = ""
    
    for(let i = 0; i < taskList.length; i++) {
        ulEl.innerHTML += "<li>" + taskList[i] + "</li>"
    }
}
displayList()

inputBtnEl.addEventListener("click", function() {
    let removedWhiteSpace = inputEl.value.trim()
    
    if(removedWhiteSpace === "") {
        errorMsg.textContent = "Please enter a new task."
    } else {
        errorMsg.textContent = ""
        
        taskList.push(removedWhiteSpace)
        
        updateTasksInLocalStorage()
        
        displayList()
        
        inputEl.value = ""
    }
})

function createTask(taskText) {
    return {text: taskText, completed: false}
}

function deleteTask(index) {
    taskList.splice(index, 1)
    updateTasksInLocalStorage()
}

function createTaskElement(taskObj) {
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
        deleteTask(taskObj);
        renderTasks();
    });
  
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskTextElement);
    taskItem.appendChild(removeButton);
  
    return taskItem;
}