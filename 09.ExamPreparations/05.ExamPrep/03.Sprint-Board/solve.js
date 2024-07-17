function attachEvents() {

    const baseURL = "http://localhost:3030/jsonstore/tasks/";
    
    const toDoTaskList = document.querySelectorAll(".task-list")[0];
    const inProgressTaskList = document.querySelectorAll(".task-list")[1];
    const codeReviewTaskList = document.querySelectorAll(".task-list")[2];
    const doneTaskList = document.querySelectorAll(".task-list")[3];
    
    const loadBtn = document.querySelector("#load-board-btn");
    loadBtn.addEventListener("click", loadTasks);

    const titleInput = document.querySelector("#title");
    const descriptionInput = document.querySelector("#description");

    const addBtn = document.querySelector("#create-task-btn");
    addBtn.addEventListener("click", createTask);

    function loadTasks(){
        toDoTaskList.innerHTML = "";
        inProgressTaskList.innerHTML = "";
        codeReviewTaskList.innerHTML = "";
        doneTaskList.innerHTML = "";

        fetch(baseURL)
        .then(res => res.json())
        .then(result => renderTasks(Object.values(result)));

    }

    function renderTasks(tasks){

        for (const task of tasks) {
            
            if (task.status === "ToDo") {
                toDoTaskList.appendChild(renderTask(task));
            }
            else if (task.status === "In Progress") {
                inProgressTaskList.appendChild(renderTask(task));
            }
            else if (task.status === "Code Review") {
                codeReviewTaskList.appendChild(renderTask(task));
            }
            else if (task.status === "Done") {
                doneTaskList.appendChild(renderTask(task));
            }
        }
    }

    function renderTask(task){
        //description status title _id

        const title = task.title;
        const description = task.description;
        const status = task.status;
        const taskId = task._id;

        const liTask = document.createElement("li");
        liTask.classList.add("task");

        const h3TaskTitle = document.createElement("h3");
        h3TaskTitle.textContent = title;

        const parDescription = document.createElement("p");
        parDescription.textContent = description;

        const btnMove = document.createElement("button");
        if (status === "ToDo") {
            btnMove.textContent = "Move to In Progress";
            btnMove.addEventListener("click", () =>{
                moveTask(taskId, status);
            });
        }
        else if (status === "In Progress") {
            btnMove.textContent = "Move to Code Review";
            btnMove.addEventListener("click", () =>{
                moveTask(taskId, status);
            });
        }
        else if (status === "Code Review") {
            btnMove.textContent = "Move to Done";
            btnMove.addEventListener("click", () =>{
                moveTask(taskId, status);
            });
        }
        else if (status === "Done") {
            btnMove.textContent = "Close";
            btnMove.addEventListener("click", () =>{
                closeTask(taskId);
            });
        }

        liTask.appendChild(h3TaskTitle);
        liTask.appendChild(parDescription);
        liTask.appendChild(btnMove);

        return liTask;
    }

    function clearInput(){
        titleInput.value = "";
        descriptionInput.value = "";
    }

    function createTask(){
        //description status title _id

        const taskTitle = titleInput.value;
        const taskDescription = descriptionInput.value;
        const isEmptyInput = taskTitle === "" || taskDescription === "";
        if (isEmptyInput) {
            return;
        }

        const newTask = {
            description: taskDescription,
            status: "ToDo",
            title: taskTitle,
        }

        fetch(baseURL, {
            method: "POST",
            body: JSON.stringify(newTask)
        })
        .then(loadTasks)
        .then(clearInput);
    }

    function moveTask(taskId, status){
        
        if (status === "ToDo") {
            status = "In Progress";
        }
        else if (status === "In Progress") {
            status = "Code Review";
        }
        else if (status === "Code Review") {
            status = "Done";
        }

        const updatedTask = {status};

        fetch(`${baseURL}${taskId}`,{
            method: "PATCH",
            body: JSON.stringify(updatedTask),
        })
        .then(loadTasks);
    }

    function closeTask(taskId){

        fetch(`${baseURL}${taskId}`,{
            method: "DELETE"
        })
        .then(loadTasks);
    }
}

attachEvents();