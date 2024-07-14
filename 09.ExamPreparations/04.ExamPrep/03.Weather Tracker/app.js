const baseURL = "http://localhost:3030/jsonstore/tasks/";

const locationInput = document.querySelector("#location");
const temperatureInput = document.querySelector("#temperature");
const dateInput = document.querySelector("#date");

const allClouds = document.querySelector("#list");

const form = document.querySelector("#form form"); //to attatch ID on

const addBtn = document.querySelector("#add-weather"); //precent default
addBtn.addEventListener("click", addWeather);

const editBtn = document.querySelector("#edit-weather"); //prevent default
editBtn.addEventListener("click", editWeather);

const loadBtn = document.querySelector("#load-history");
loadBtn.addEventListener("click", loadHistory);

function loadHistory(){
    allClouds.innerHTML = "";

    fetch(baseURL)
    .then(res => res.json())
    .then(result => renderElements(Object.values(result)))
}

function renderElements(elements){

    for (const element of elements) {
        allClouds.appendChild(renderElement(element));
    }

}

function renderElement(element){
    //date location temperature _id
    const currElementDate = element.date;
    const currElementLocation = element.location;
    const currElementTemperature = element.temperature;
    const currElementId = element._id;

    const container = document.createElement("div");
    container.classList.add("container");

    const h2Town = document.createElement("h2");
    h2Town.textContent = currElementLocation;
    const h3Date = document.createElement("h3");
    h3Date.textContent = currElementDate;
    const h3Temp = document.createElement("h3");
    h3Temp.textContent = currElementTemperature;
    h3Temp.id = "celsius";

    const btnsContainer = document.createElement("div");

    const changeBtn = document.createElement("button");
    changeBtn.classList.add("change-btn");
    changeBtn.textContent = "Change";
    changeBtn.addEventListener("click", () =>{

        locationInput.value = currElementLocation;
        temperatureInput.value = currElementTemperature;
        dateInput.value = currElementDate;

        container.remove();

        addBtn.disabled = true;
        editBtn.disabled = false;

        form.dataset.elementId = currElementId;
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () =>{

        fetch(`${baseURL}${currElementId}`,{
            method: "DELETE"
        })
        .then(loadHistory)

    });

    btnsContainer.appendChild(changeBtn);
    btnsContainer.appendChild(deleteBtn);

    container.appendChild(h2Town);
    container.appendChild(h3Date);
    container.appendChild(h3Temp);
    container.appendChild(btnsContainer);

    return container;
}

function clearInput(){
    locationInput.value = "";
    temperatureInput.value = "";
    dateInput.value = "";
}

function addWeather(e){
    e.preventDefault();
    const location = locationInput.value;
    const temperature = temperatureInput.value;
    const date = dateInput.value;
    const isEmptyInput = location === "" | temperature === "" || date === "";
    if (isEmptyInput) {
        return;
    }

    const newWheather = {
        date,
        location,
        temperature,
    };

    fetch(baseURL, {
        method: "POST",
        body: JSON.stringify(newWheather)
    })
    .then(loadHistory)
    .then(clearInput);
}

function editWeather(e){
    e.preventDefault();

    const location = locationInput.value;
    const temperature = temperatureInput.value;
    const date = dateInput.value;
    const id = form.dataset.elementId
    const isEmptyInput = location === "" | temperature === "" || date === "";
    if (isEmptyInput) {
        return;
    }

    const edditedElement = {
        date,
        location,
        temperature,
        _id: id,
    };

    fetch(`${baseURL}${id}`,{
        method: "PUT",
        body: JSON.stringify(edditedElement)
    })
    .then(loadHistory)
    .then(() =>{
        addBtn.disabled = false;
        editBtn.disabled = true;

        clearInput();
        
        delete form.dataset.elementId;
    });
}