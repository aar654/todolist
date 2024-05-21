import './style.css';

const allTasks = document.getElementById("allTasks");
const today = document.getElementById("today");
const thisWeek = document.getElementById("thisWeek");
const addProject = document.getElementById("addProject");
const projectList = document.getElementById("projectList");
const sidebarButton = document.querySelectorAll(".sidebarButton");
let mainHeader = document.getElementById("mainHeader");
const addTask = document.getElementById("addTask");

let projects = [];

class Project {
    constructor(title) {
        this.title = title;
        this.tasks = []
    }

    addTasks(task) {
        this.tasks.push(task);
    }

    removeTask(taskTitle) {
        this.tasks = this.tasks.filter(task => task.title !== taskTitle);
    }

    getTasks() {
        return this.tasks;
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

    const projectButton = document.createElement("button");
    const img = document.createElement("img");
    const x = document.createElement("img");
    let projectTitle = document.createElement("span");
    img.src = "/dist/img/list.png";
    x.src = "/dist/img/close.png";
    x.classList.add("sidebarX");
    img.classList.add("sidebarImg");
    projectButton.classList.add("btn", "btn-light", "sidebarButton");
    projectTitle.textContent = document.getElementById('addProjectValue').value;
    projectButton.appendChild(img);
    projectButton.appendChild(projectTitle)
    projectButton.appendChild(x);
    projectList.appendChild(projectButton);

    projectButton.addEventListener("click", function () {
        displayProjects(projectButton.dataset.index);

    })

    let newProject = new Project(document.getElementById('addProjectValue').value);
    projects.push(newProject);

    projectButton.dataset.index = projects.length - 1;


    document.getElementById('addProjectValue').value = "";

    console.log(projects);

    e.preventDefault();

});


let exampleProject = new Project("Example Project");
let task1 = new Task("Example", "Example Description", "12/23/2024", true)
exampleProject.addTasks(task1);
projects.push(exampleProject);

console.log(projects)


function displayProjects(projectIndex) {
    if (projectIndex !== undefined) {
        const project = projects[projectIndex];
        mainHeader.innerHTML = project.title;

        
    } else {
        mainHeader.innerHTML = "";
    }
}

addTask.addEventListener("submit", function (e) {
    let projectTasks = document.getElementById("projectTasks");

    const taskButton = document.createElement("button");
    const checkbox = document.createElement("input");
    check.type = "checkbox";
    const taskTitle = document.createElement("span");
    const taskDescription = document.createElement("span");
    const taskDate = document.createElement("input");
    taskDate.type = "date";
    const x = document.createElement("img");
    x.src = "/dist/img/close.png";
    taskDescription.classList.add("description");

    taskButton.appendChild(checkbox);
    taskButton.appendChild(taskTitle);
    taskButton.appendChild(taskDescription);
    taskButton.appendChild(x);

    projectTasks.appendChild(taskButton);

    console.log(projects);

    e.preventDefault();


});

