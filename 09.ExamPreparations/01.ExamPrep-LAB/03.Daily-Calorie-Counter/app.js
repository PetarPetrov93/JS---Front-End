
const baseURL = 'http://localhost:3030/jsonstore/tasks/';

const form = document.querySelector("#form form"); // to append the _id

const foodInput = document.querySelector("#food");
const timeInput = document.querySelector("#time");
const caloriesInput = document.querySelector("#calories");

const addBtn = document.querySelector("#add-meal");
addBtn.addEventListener("click", createMeal);

const editBtn = document.querySelector("#edit-meal");
editBtn.addEventListener("click", editMeal);

const mealListDiv = document.querySelector("#list");

const loadMealsBtn = document.querySelector("#load-meals");
loadMealsBtn.addEventListener("click", loadMeals);

function loadMeals(){

    fetch(baseURL)
        .then(res => res.json())
        .then(result => {
            renderMeals(Object.values(result))
        });
}

function renderMeals(meals){

    mealListDiv.innerHTML = '';

    for (const meal of meals) {
        
        mealListDiv.appendChild(renderMeal(meal));
    }

}

function renderMeal(meal){

    const mealFood = meal.food;
    const mealTime = meal.time;
    const mealCalories = meal.calories;
    
    const divMeal = document.createElement("div");
    divMeal.classList.add("meal");

    const h2Food = document.createElement("h2");
    h2Food.textContent = mealFood;
    const h3time = document.createElement("h3");
    h3time.textContent = mealTime;
    const h3calories = document.createElement("h3");
    h3calories.textContent = mealCalories;

    const divBtns = document.createElement("div");
    divBtns.id = "meal-buttons";

    const changeBtn = document.createElement("button");
    changeBtn.classList.add("change-meal");
    changeBtn.textContent = "Change";
    changeBtn.addEventListener("click", () =>{

        foodInput.value = mealFood;
        timeInput.value = mealTime;
        caloriesInput.value = mealCalories;

        divMeal.remove();

        addBtn.disabled = true;
        editBtn.disabled = false;

        form.dataset.mealId = meal._id;

    });
    
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-meal");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () =>{

        fetch(`${baseURL}${meal._id}`, {
            method: 'DELETE'
        })
            .then(loadMeals)

    });

    divBtns.appendChild(changeBtn);
    divBtns.appendChild(deleteBtn);

    divMeal.appendChild(h2Food);
    divMeal.appendChild(h3time);
    divMeal.appendChild(h3calories);
    divMeal.appendChild(divBtns);

    return divMeal;
}

function clearInput(){

    foodInput.value = "";
    timeInput.value = "";
    caloriesInput.value = "";
}

function createMeal(){

    const currFood = foodInput.value;
    const currTime = timeInput.value;
    const currCalories = caloriesInput.value;

    const isEmptyInput = currFood === "" || currTime === "" || currCalories === "";
    if (isEmptyInput) {
        return;
    }

    const newProduct = {
        food: currFood,
        time: currTime,
        calories: currCalories,
    };

    fetch(baseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    })
    .then(loadMeals)

    clearInput();

}

function editMeal(){

    currId = form.dataset.mealId;

    const edditedMeal = {
        food: foodInput.value,
        time: timeInput.value,
        calories: caloriesInput.value,
        _id: currId,
    };

    fetch(`${baseURL}${currId}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(edditedMeal),
    })
        .then(loadMeals)
        .then(() =>{
            addBtn.disabled = false;
            editBtn.disabled = true;

            clearInput();

            delete form.dataset.mealId;
        });

}