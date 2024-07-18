window.addEventListener('load', solve);

function solve() {

    let taskId = Number(0);
    let totalPointsCounter = Number(0);
    const titleInput = document.querySelector("#title");
    const descriptionInput = document.querySelector("#description");
    const labelInput = document.querySelector("#label");
    const pointsInput = document.querySelector("#points");
    const assigneeInput = document.querySelector("#assignee");

    const taskIdHiddenInput = document.querySelector("#task-id");

    const createBtn = document.querySelector("#create-task-btn");
    createBtn.addEventListener("click", createTask);

    const deleteTaskBtn = document.querySelector("#delete-task-btn");
    deleteTaskBtn.addEventListener("click", removeElement);

    const taskSection = document.querySelector("#tasks-section");

    function createTask(){
        const title = titleInput.value;
        const description = descriptionInput.value;
        const label = labelInput.value;
        const points = pointsInput.value;
        const assignee = assigneeInput.value;

        const isEmptyInput = title === "" || description === "" || points === "" || assignee === "";
        if (isEmptyInput) {
            return;
        }

        taskId++;
        totalPointsCounter += Number(points);

        const totalPoints = document.querySelector("#total-sprint-points");
        totalPoints.textContent = `Total Points ${totalPointsCounter}pts`;

        const article = document.createElement("article");
        article.classList.add("task-card");
        article.id = `task-${taskId}`;

        const taskCardLabelDiv = document.createElement("div");
        taskCardLabelDiv.classList.add("task-card-label");

        
        if (label === "Feature") {

            taskCardLabelDiv.textContent = "Feature " + "&#8865";
            taskCardLabelDiv.classList.add("feature");
        }
        else if (label === "Low Priority Bug") {
            taskCardLabelDiv.textContent = "Low Priority Bug " + '&#9737';
            taskCardLabelDiv.classList.add("low-priority");
        }
        else if (label === "High Priority Bug") {
            taskCardLabelDiv.textContent = "High Priority Bug " + "&#9888";
            taskCardLabelDiv.classList.add("high-priority");
        }

        const h3 = document.createElement("h3");
        h3.textContent = title;
        h3.classList.add("tasc-card-title");

        const parDescription = document.createElement("p");
        parDescription.textContent = description;
        parDescription.classList.add("task-card-description");

        const divPoints = document.createElement("div");
        divPoints.textContent = `Estimated at ${points} pts`;
        divPoints.classList.add("task-card-points");

        const divAssignee = document.createElement("div");
        divAssignee.textContent = `Assigned to: ${assignee}`;
        divAssignee.classList.add("task-card-assignee");

        const divBtns = document.createElement("div");
        divBtns.classList.add("task-card-actions");

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () =>{

            titleInput.value = title;
            descriptionInput.value = description;
            labelInput.value = label;
            pointsInput.value = points;
            assigneeInput.value = assignee;

            taskIdHiddenInput.value = `task-${taskId}`;
            
            deleteTaskBtn.disabled = false;
            createBtn.disabled = true;
            
            titleInput.disabled = true;
            descriptionInput.disabled = true;
            labelInput.disabled = true;
            pointsInput.disabled = true;
            assigneeInput.disabled = true;

            // probably have to decreese the points as well
            totalPointsCounter -= points;
            totalPoints.textContent = `Total Points ${totalPointsCounter}pts`;
        });

        divBtns.appendChild(deleteBtn);

        article.appendChild(taskCardLabelDiv);
        article.appendChild(h3);
        article.appendChild(parDescription);
        article.appendChild(divPoints);
        article.appendChild(divAssignee);
        article.appendChild(divBtns);

        taskSection.appendChild(article);

        titleInput.value = "";
        descriptionInput.value = "";
        labelInput.value = "";
        pointsInput.value = "";
        assigneeInput.value = "";
    }

    function removeElement(){
        const elementToRemove = taskSection.querySelector(`#${taskIdHiddenInput.value}`);
        taskSection.removeChild(elementToRemove);

        titleInput.value = "";
        descriptionInput.value = "";
        labelInput.value = "";
        pointsInput.value = "";
        assigneeInput.value = "";

        titleInput.disabled = false;
            descriptionInput.disabled = false;
            labelInput.disabled = false;
            pointsInput.disabled = false;
            assigneeInput.disabled = false;

        deleteTaskBtn.disabled = true;
        createBtn.disabled = false;
    }
}