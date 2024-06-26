import './style.css';
import { parseISO, isToday, isThisWeek } from "date-fns";

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
projects[0].addTasks(new Task("Example Task Title", "Example Description", "2024-06-17", false));
projects[0].addTasks(new Task("Example Task Title 2", "Example Description", "2024-06-18", true));

let firstProjectButton = document.createElement("button");
const img = document.createElement("img");
const x = document.createElement("img");
const edit = document.createElement("img");
let projectTitle = document.createElement("span");
const left = document.createElement("div");
const right = document.createElement("div");
left.classList.add("marginLeft");
right.classList.add("marginRight");

img.src = "/dist/img/list.png";
x.src = "/dist/img/close.png";
x.classList.add("sidebarX");
edit.src = "/dist/img/edit.png";
edit.classList.add("sidebarEdit");
img.classList.add("sidebarImg");
firstProjectButton.classList.add("btn", "btn-light", "sidebarButton", "projectButton");
projectTitle.textContent = projects[0].title;
left.appendChild(img)
left.appendChild(projectTitle)
right.append(edit)
right.append(x)
firstProjectButton.append(left)
firstProjectButton.append(right)
projectList.appendChild(firstProjectButton);

firstProjectButton.dataset.index = 0;

x.addEventListener("click", function (e) {
    projects.splice(0, 1);
    projectList.removeChild(firstProjectButton);
    projectTasks.innerHTML = "";
});

edit.addEventListener("click", function (e) {
    e.preventDefault();
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = projects[0].title;
    inputField.classList.add("projectInput");
    left.replaceChild(inputField, projectTitle);
    function updateProjectTitle(newTitle) {
        projects[0].title = newTitle;
        projectTitle.textContent = newTitle;
        left.replaceChild(projectTitle, inputField);
        mainHeader.innerHTML = newTitle;
    }

    inputField.addEventListener("blur", function () {
        updateProjectTitle(inputField.value);
    });

    inputField.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            updateProjectTitle(inputField.value);
            inputField.blur();
        }
    });
});

displayProject();
firstProjectButton.click();

addProject.addEventListener("submit", function (e) {
    e.preventDefault();

    let projectButton = document.createElement("button");
    const img = document.createElement("img");
    const x = document.createElement("img");
    const edit = document.createElement("img");
    let projectTitle = document.createElement("span");
    const left = document.createElement("div");
    const right = document.createElement("div");
    img.src = "/dist/img/list.png";
    x.src = "/dist/img/close.png";
    edit.src = "/dist/img/edit.png";
    edit.classList.add("sidebarX");
    x.classList.add("sidebarX");
    img.classList.add("sidebarImg");
    left.classList.add("marginLeft");
    right.classList.add("marginRight");
    projectButton.classList.add("btn", "btn-light", "sidebarButton", "projectButton");
    projectTitle.textContent = document.getElementById('addProjectValue').value;
    left.appendChild(img);
    left.appendChild(projectTitle);
    right.appendChild(edit);
    right.appendChild(x);
    projectButton.append(left)
    projectButton.append(right)
    projectList.appendChild(projectButton);

    let newProject = new Project(document.getElementById('addProjectValue').value);
    projects.push(newProject);

    let index = projects.length - 1;
    projectButton.dataset.index = index;

    x.addEventListener("click", function () {
        projects.splice(index, 1);
        projectList.removeChild(projectButton);
        projectTasks.innerHTML = "";
    });

    edit.addEventListener("click", function (e) {
        e.preventDefault();
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.value = projects[index].title;
        inputField.classList.add("projectInput");
        left.replaceChild(inputField, projectTitle);
        function updateProjectTitle(newTitle) {
            projects[index].title = newTitle;
            projectTitle.textContent = newTitle;
            left.replaceChild(projectTitle, inputField);
            mainHeader.innerHTML = newTitle;
        }

        inputField.addEventListener("blur", function () {
            updateProjectTitle(inputField.value);
        });

        inputField.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                updateProjectTitle(inputField.value);
                inputField.blur();
            }
        });
    });

    document.getElementById('addProjectValue').value = "";

    displayProject();
});

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
                projectTasks.innerHTML = "No tasks available";
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

function displayProjectTasks(tasks, projectIndex) {
    const projectTasks = document.getElementById('projectTasks');
    projectTasks.innerHTML = "";

    if (tasks.length === 0) {
        projectTasks.innerHTML = "No tasks available";
        return;
    }

    tasks.forEach((task) => {
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

        if (task.check) {
            taskTitle.classList.add("strikethrough");
            taskDescription.classList.add("strikethrough");
        }

        const taskDate = document.createElement("input");
        taskDate.type = "date";
        taskDate.value = task.dueDate;

        const edit = document.createElement("img");
        edit.src = "/dist/img/edit.png";
        edit.classList.add("editTask");
        edit.setAttribute("data-bs-toggle", "modal");
        edit.setAttribute("data-bs-target", "#editTaskModal");

        const x = document.createElement("img");
        x.src = "/dist/img/close.png";
        x.classList.add("taskX");

        taskButton.dataset.taskTitle = task.task;

        left.appendChild(checkbox);
        left.appendChild(taskTitle);
        left.appendChild(taskDescription);
        right.appendChild(taskDate);
        right.appendChild(edit);
        right.appendChild(x);

        taskButton.appendChild(left);
        taskButton.appendChild(right);

        projectTasks.appendChild(taskButton);

        checkbox.addEventListener("click", function () {
            task.check = checkbox.checked;
            taskTitle.classList.toggle("strikethrough", task.check);
            taskDescription.classList.toggle("strikethrough", task.check);
        });

        x.addEventListener("click", function () {
            let currentProjectTitle = mainHeader.innerText;
            let currentProject = projects.find(project => project.title === currentProjectTitle);

            if (currentProject) {
                currentProject.removeTask(task.task);
                displayProjectTasks(currentProject.getTasks(), projectIndex);
            }
        });

        edit.addEventListener("click", function () {
            document.getElementById('editTaskTitle').value = task.task;
            document.getElementById('editTaskDescription').value = task.taskDescription;
            document.getElementById('editTaskDate').value = task.dueDate;

            document.getElementById('editTaskSubmit').addEventListener("click", function (e) {
                e.preventDefault();
                const updatedTaskTitle = document.getElementById('editTaskTitle').value;
                const updatedTaskDescription = document.getElementById('editTaskDescription').value;
                const updatedTaskDate = document.getElementById('editTaskDate').value;

                task.task = updatedTaskTitle;
                task.taskDescription = updatedTaskDescription;
                task.dueDate = updatedTaskDate;

                taskTitle.textContent = updatedTaskTitle;
                taskDescription.textContent = `(${updatedTaskDescription})`;
                taskDate.value = updatedTaskDate;

                document.getElementById('editTaskModal').classList.remove('show');
                document.getElementById('editTaskModal').setAttribute('aria-hidden', 'true');
                document.body.classList.remove('modal-open');
                document.querySelector('.modal-backdrop').remove();
            });
        });

        taskDate.addEventListener("change", function () {
            task.dueDate = taskDate.value;
        });
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
        todayTasks = todayTasks.concat(project.getTasks().filter(task => isToday(parseISO(task.dueDate))));
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
