window.addEventListener("load", solve);

function solve(){

    let placeRef = document.getElementById("place");
    let actionRef = document.getElementById("action");
    let personRef = document.getElementById("person");

    let addBtn = document.getElementById("add-btn");

    let taskListUl = document.getElementById("task-list");

    let doneListUl = document.getElementById("done-list");

    //ADD BTN LOGIC:
    addBtn.addEventListener("click", addNewTask);

    function addNewTask(){

        let place = placeRef.value;
        let action = actionRef.value;
        let person = personRef.value;

        let isEmptyInput = place === "" || action === "" || person === "";
        if (isEmptyInput) {
            return;
        }

        let li = document.createElement("li");
        li.classList.add("clean-task");

        let article = document.createElement("article");

        let parPlace = document.createElement("p");
        parPlace.textContent = `Place:${place}`;

        let parAction = document.createElement("p");
        parAction.textContent = `Action:${action}`;

        let parPerson = document.createElement("p");
        parPerson.textContent = `Person:${person}`;

        let divBtns = document.createElement("div");
        divBtns.classList.add("buttons");

        let editBtn = document.createElement("button");
        editBtn.classList.add("edit");
        editBtn.textContent = "Edit";

        let doneBtn = document.createElement("button");
        doneBtn.classList.add("done");
        doneBtn.textContent = "Done";

        divBtns.appendChild(editBtn);
        divBtns.appendChild(doneBtn);

        article.appendChild(parPlace);
        article.appendChild(parAction);
        article.appendChild(parPerson);

        li.appendChild(article);
        li.appendChild(divBtns);

        taskListUl.appendChild(li);

        placeRef.value = "";
        actionRef.value = "";
        personRef.value = "";

        //EDIT BTN LOGIC:
        editBtn.addEventListener("click", edit);
        function edit(){

            placeRef.value = place;
            actionRef.value = action;
            personRef.value = person;

            taskListUl.removeChild(li);

        };

        //DONE BTN LOGIC:
        doneBtn.addEventListener("click", done);
        function done(){

            taskListUl.removeChild(li);

            li.removeChild(divBtns);

            let deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete");
            deleteBtn.textContent = "Delete";

            li.appendChild(deleteBtn);

            doneListUl.appendChild(li);

            //DELETE BTN LOGIC:
            deleteBtn.addEventListener("click", deteleTask);
            function deteleTask(){

                doneListUl.removeChild(li);
            }

        }
    }

}