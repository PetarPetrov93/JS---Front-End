const baseURL = "http://localhost:3030/jsonstore/tasks/";

const nameInput = document.querySelector("#name");
const daysInput = document.querySelector("#num-days");
const dateInput = document.querySelector("#from-date");

const form = document.querySelector("#form form");

const addBtn = document.querySelector("#add-vacation"); //prevent default!
addBtn.addEventListener("click", addVacation);

const editBtn = document.querySelector("#edit-vacation"); // prevent default!
editBtn.addEventListener("click", editVacation);

const vacationsList = document.querySelector("#list");

const loadBtn = document.querySelector("#load-vacations");
loadBtn.addEventListener("click", loadVacations);

function loadVacations(){

    vacationsList.innerHTML = "";

    fetch(baseURL)
    .then(res => res.json())
    .then(result => renderVacations(Object.values(result)));
}

function renderVacations(vacations){

    for (const vacation of vacations) {
        vacationsList.appendChild(renderVacation(vacation));
    }
}

function renderVacation(vacation){


    const name = vacation.name;
    const days = vacation.days;
    const date = vacation.date;
    const id = vacation._id

    const container = document.createElement("div");
    container.classList.add("container");

    const h2Name = document.createElement("h2");
    h2Name.textContent = name;

    const h3Date = document.createElement("h3");
    h3Date.textContent = date;

    const h3Days = document.createElement("h3");
    h3Days.textContent = days;

    const changeBtn = document.createElement("button");
    changeBtn.classList.add("change-btn");
    changeBtn.textContent = "Change";
    changeBtn.addEventListener("click", () =>{

        nameInput.value = name;
        daysInput.value = days;
        dateInput.value = date;

        container.remove();

        addBtn.disabled = true;
        editBtn.disabled = false;

        form.dataset.vacationId = id;
    });

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("done-btn")
    doneBtn.textContent = "Done";
    doneBtn.addEventListener("click", () =>{

        fetch(`${baseURL}${id}`,{
            method: "DELETE"
        })
        .then(loadVacations);

    });

    container.appendChild(h2Name);
    container.appendChild(h3Date);
    container.appendChild(h3Days);
    container.appendChild(changeBtn);
    container.appendChild(doneBtn);

    return container;

}

function addVacation(e){
    e.preventDefault();
    const name = nameInput.value;
    const days = daysInput.value;
    const date = dateInput.value;
    const isEmptyInput = name === "" || days === "" || date === "";
    if (isEmptyInput) {
        return;
    }

    const newVacation = {
        name,
        days,
        date,
    };

    fetch(baseURL, {
        method: "POST",
        body: JSON.stringify(newVacation)
    })
    .then(loadVacations)
    .then(clearInput)

}

function clearInput(){

    nameInput.value = "";
    daysInput.value = "";
    dateInput.value = "";
}

function editVacation(e){
    e.preventDefault();

    const id = form.dataset.vacationId;

    const edditedVacation = {
        name: nameInput.value,
        days: daysInput.value,
        date: dateInput.value,
        _id: id,
    };

    fetch(`${baseURL}${id}`, {
        method: "PUT",
        body: JSON.stringify(edditedVacation)
    })
    .then(loadVacations)
    .then(() => {

        addBtn.disabled = false;
        editBtn.disabled = true;
        clearInput();

        delete form.dataset.vacationId;
    });

}
