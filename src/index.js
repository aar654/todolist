import './style.css';
import { isToday, isThisWeek } from "date-fns";

const allTasks = document.getElementById("allTasks");
const today = document.getElementById("today");
const thisWeek = document.getElementById("thisWeek");
const addProject = document.getElementById("addProject");
const projectList = document.getElementById("projectList");
let mainHeader = document.getElementById("mainHeader");
const addTask = document.getElementById("addTask");
const projectTasks = document.getElementById("projectTasks");


class Project {
    constructor(title) {
        this.title = title;
        this.tasks = [];
    }

    addTasks(task) {
        this.tasks.push(task);
    }

    removeTask(taskTitle) {
        this.tasks = this.tasks.filter(task => task.task !== taskTitle);
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
        this.check = check;
    }
}

let projects = [new Project("Example Project")];
projects[0].addTasks(new Task("Example Task Title", "Example Description", "2024-05-28", false));

let firstProjectButton = document.createElement("button");
const img = document.createElement("img");
const x = document.createElement("img");
let projectTitle = document.createElement("span");

img.src = "/dist/img/list.png";
x.src = "/dist/img/close.png";
x.classList.add("sidebarX");
img.classList.add("sidebarImg");
firstProjectButton.classList.add("btn", "btn-light", "sidebarButton", "projectButton");
projectTitle.textContent = projects[0].title;
firstProjectButton.appendChild(img);
firstProjectButton.appendChild(projectTitle);
firstProjectButton.appendChild(x);
projectList.appendChild(firstProjectButton);

firstProjectButton.dataset.index = 0;

x.addEventListener("click", function (e) {
    projects.splice(0, 1);
    projectList.removeChild(firstProjectButton);
    projectTasks.innerHTML = "";
    console.log(projects);
});

displayProject();

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
    projectButton.appendChild(projectTitle);
    projectButton.appendChild(x);
    projectList.appendChild(projectButton);

    let newProject = new Project(document.getElementById('addProjectValue').value);
    projects.push(newProject);

    let index = projects.length - 1;
    projectButton.dataset.index = index;

    x.addEventListener("click", function (e) {
        projects.splice(index, 1);
        projectList.removeChild(projectButton);
        projectTasks.innerHTML = "";
        console.log(projects);
    });

    document.getElementById('addProjectValue').value = "";

    displayProject();

    console.log(projects);
});

/* let exampleProject = new Project("Example Project");
let task1 = new Task("Example Task Title", "Example Description", "2024-05-28", false);
exampleProject.addTasks(task1);
projects.push(exampleProject); */

function displayProject() {
    let projectButtons = document.querySelectorAll(".projectButton");

    projectButtons.forEach(button => {
        button.addEventListener("click", function () {
            let index = this.getAttribute("data-index");
            if (index !== undefined && projects[index]) {
                const project = projects[index];
                mainHeader.innerHTML = project.title;
                displayProjectTasks(project.getTasks());
                document.querySelector(".addTaskButton").style.display = "flex";
            } else {
                mainHeader.innerHTML = "No Project Found";
                document.querySelector(".addTaskButton").style.display = "none"
            }
        });
    });
}

addTask.addEventListener("submit", function (e) {
    e.preventDefault();

    let currentProjectTitle = mainHeader.innerText;

    let currentProject = projects.find(project => project.title === currentProjectTitle);

    if (currentProject) {
        let newTask = new Task(
            document.getElementById('taskTitle').value,
            document.getElementById('taskDescription').value,
            document.getElementById('taskDate').value,
            false
        );
        currentProject.addTasks(newTask);

        displayProjectTasks(currentProject.getTasks());

        document.getElementById('taskTitle').value = "";
        document.getElementById('taskDescription').value = "";
        document.getElementById('taskDate').value = "";

        document.getElementById('taskModal').classList.remove('show');
        document.getElementById('taskModal').setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        document.querySelector('.modal-backdrop').remove();
    }
});

function displayProjectTasks(tasks) {
    projectTasks.innerHTML = "";

    tasks.forEach(task => {
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
        x.classList.add("taskX");

        left.appendChild(checkbox);
        left.appendChild(taskTitle);
        left.appendChild(taskDescription);
        right.appendChild(taskDate);
        right.appendChild(x);

        taskButton.appendChild(left);
        taskButton.appendChild(right);

        projectTasks.appendChild(taskButton);
    });
}

allTasks.addEventListener("click", function () {
    mainHeader.innerHTML = "All Tasks";

    document.querySelector(".addTaskButton").style.display = "none"

    let allTasksList = [];
    projects.forEach(project => {
        allTasksList = allTasksList.concat(project.getTasks());
    });

    displayProjectTasks(allTasksList);


});

today.addEventListener("click", function () {
    mainHeader.innerHTML = "Today";

    document.querySelector(".addTaskButton").style.display = "none"

    let todayTasks = [];

    projects.forEach(project => {
        todayTasks = todayTasks.concat(project.getTasks().filter(task => isToday(task.dueDate)));
    });

    displayProjectTasks(todayTasks);
});

thisWeek.addEventListener("click", function () {
    mainHeader.innerHTML = "This Week";

    document.querySelector(".addTaskButton").style.display = "none"

    let thisWeekTasks = [];

    projects.forEach(project => {
        thisWeekTasks = thisWeekTasks.concat(project.getTasks().filter(task => isThisWeek(task.dueDate)));
    });

    displayProjectTasks(thisWeekTasks);
});


displayProject();
