import './style.css';

const allTasks = document.getElementById("allTasks");
const today = document.getElementById("today");
const thisWeek = document.getElementById("thisWeek");
const addProject = document.getElementById("addProject")
const projects = document.getElementById("projects")

let projectArr = []

class Project {
    constructor(title) {
        this.title = title;
        this.tasks = []
    }

    addTasks(task) {
        this.tasks.push(task);
    }
}

class Task {
    constructor(task, taskDescription, dueDate, check) {
        this.task = task;
        this.taskDescription = taskDescription;
        this.dueDate = dueDate;
        this.check = check
    }
}


addProject.addEventListener("submit", function (e) {
    e.preventDefault();
    const projectButton = document.createElement("button");    
    const img = document.createElement('img');
    const x = document.createElement('img');
    img.src = "/dist/img/list.png"
    x.src = "/dist/img/close.png"
    x.classList.add("sidebarX")
    img.classList.add("sidebarImg")
    projectButton.classList.add("btn", "btn-light", "sidebarButton");
    let projectTitle = document.getElementById('addProjectValue').value;
    projectButton.innerHTML = projectTitle;
    projectButton.appendChild(img)
    projectButton.appendChild(x)
    projects.appendChild(projectButton)
})





