let ulEl = document.getElementById("ul-el")
const errorMsg = document.getElementById("error-msg")
const inputEl = document.getElementById("taskInput")
const inputBtnEl = document.getElementById("addTaskButton")
let taskList = getTasksFromLocalStorage()

function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem("taskList")) || []
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
        
        localStorage.setItem("taskList", JSON.stringify(taskList))
        
        displayList()
        
        inputEl.value = ""
    }
})

function createTask(taskText) {
    return {text: taskText, completed: false}
}