import './style.css';
import { format, parseISO } from "date-fns";


const allTasks = document.getElementById("allTasks");
const today = document.getElementById("today");
const thisWeek = document.getElementById("thisWeek");
const addProject = document.getElementById("addProject");
const projectList = document.getElementById("projectList");
const sidebarButton = document.querySelectorAll(".sidebarButton");
let mainHeader = document.getElementById("mainHeader");
const addTask = document.getElementById("addTask");
let projectButton = document.querySelectorAll(".projectButton");

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
    e.preventDefault();

    let projectButton = document.createElement("button");
    const img = document.createElement("img");
    const x = document.createElement("img");
    let projectTitle = document.createElement("span");
    img.src = "/dist/img/list.png";
    x.src = "/dist/img/close.png";
    x.classList.add("sidebarX");
    img.classList.add("sidebarImg");
    projectButton.classList.add("btn", "btn-light", "sidebarButton", "projectButton");
    projectTitle.textContent = document.getElementById('addProjectValue').value;
    projectButton.appendChild(img);
    projectButton.appendChild(projectTitle)
    projectButton.appendChild(x);
    projectList.appendChild(projectButton);

    let newProject = new Project(document.getElementById('addProjectValue').value);
    projects.push(newProject);

    projectButton.dataset.index = projects.length - 1;

    document.getElementById('addProjectValue').value = "";

    displayProject();

    console.log(projects);
});


let exampleProject = new Project("Example Project");
let task1 = new Task("Example Task Title", "Example Description", "05/28/2024", false)
exampleProject.addTasks(task1);
projects.push(exampleProject);

console.log(projects)

addTask.addEventListener("submit", function (e) {
    e.preventDefault();

    let projectTasks = document.getElementById("projectTasks");

    const left = document.createElement("div");
    const right = document.createElement("div");
    left.classList.add("marginLeft");
    right.classList.add("marginRight");
    const taskButton = document.createElement("button");
    taskButton.classList.add("btn", "btn-light", "projectButton", "projectContainer")
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("form-check-input");
    const taskTitle = document.createElement("span");
    const taskDescription = document.createElement("span");
    const taskDate = document.createElement("input");

    taskTitle.textContent = document.getElementById('taskTitle').value;
    taskDescription.textContent = `(${document.getElementById('taskDescription').value})`;
    taskDate.value = document.getElementById('taskDate').value;

    //add task to array, put language that will create a new class task and add to the specific project created

    taskDate.type = "date";
    const x = document.createElement("img");
    x.src = "/dist/img/close.png";
    x.classList.add("projectX")
    taskDescription.classList.add("description");

    left.appendChild(checkbox);
    left.appendChild(taskTitle);
    left.appendChild(taskDescription);
    right.appendChild(taskDate);
    right.appendChild(x);

    taskButton.appendChild(left);
    taskButton.appendChild(right);

    projectTasks.appendChild(taskButton);

    document.getElementById('taskTitle').value = "";
    document.getElementById('taskDescription').value = ""
    document.getElementById('taskDate').value = ""

    document.getElementById('taskModal').classList.remove('show');
    document.getElementById('taskModal').setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    document.querySelector('.modal-backdrop').remove();

    console.log(projects);

    e.preventDefault();

});

function displayProject() {
    let projectButton = document.querySelectorAll(".projectButton");

    projectButton.forEach(button => {
        button.addEventListener("click", function () {
            let index = this.getAttribute("data-index");
            if (index !== undefined && projects[index]) {
                const project = projects[index];
                mainHeader.innerHTML = project.title;
                const projectTasks = document.getElementById("projectTasks");

                projectTasks.innerHTML = "";

                project.getTasks().forEach(task => {
                    const left = document.createElement("div");
                    const right = document.createElement("div");
                    left.classList.add("marginLeft");
                    right.classList.add("marginRight");

                    const taskButton = document.createElement("button");
                    taskButton.classList.add("btn", "btn-light", "projectContainer");

                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.classList.add("form-check-input");
                    checkbox.checked = task.check;

                    const taskTitle = document.createElement("span");
                    taskTitle.textContent = task.task;

                    const taskDescription = document.createElement("span");
                    taskDescription.textContent = `(${task.taskDescription})`;
                    taskDescription.classList.add("description");

                    const taskDate = document.createElement("input");
                    taskDate.type = "date";
                    taskDate.value = task.dueDate;

                    const x = document.createElement("img");
                    x.src = "/dist/img/close.png";
                    x.classList.add("projectX");

                    left.appendChild(checkbox);
                    left.appendChild(taskTitle);
                    left.appendChild(taskDescription);
                    right.appendChild(taskDate);
                    right.appendChild(x);

                    taskButton.appendChild(left);
                    taskButton.appendChild(right);

                    projectTasks.appendChild(taskButton);
                });

            } else {
                mainHeader.innerHTML = "No Project Found";
            }
        });
    });
}

displayProject();
