// TODO

function attachEvents() {
    const baseURL = "http://localhost:3030/jsonstore/tasks/";

    const loadBtn = document.querySelector("#load-button");
    loadBtn.addEventListener("click", loadNotes);

    const addBtn = document.querySelector("#add-button"); // prevent default!
    addBtn.addEventListener("click", addNote);


    const titleInput = document.querySelector("#title");

    const todoList = document.querySelector("#todo-list");

    function loadNotes(e){
        if (e) {
            e.preventDefault();
        }
        fetch(baseURL)
        .then(res => res.json())
        .then(result => {renderNotes(Object.values(result))});
    }

    function renderNotes(notes){
        todoList.innerHTML = "";
        for (const note of notes) {
            todoList.appendChild(renderNote(note));
        }
    }

    function renderNote(note){
        const title = note.name;
        const id = note._id;

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = title;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () =>{
            fetch(`${baseURL}${id}`,{
                method: "DELETE"
            })
            .then(loadNotes);
            
        });

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";

        li.appendChild(span);
        li.appendChild(removeBtn);
        li.appendChild(editBtn);

        return li;
    }

    function addNote(e){
        e.preventDefault();
        if (titleInput.value === "") {
            return;
        }
        const newNote = {
            name: titleInput.value
        }

        fetch(baseURL,{
            method: "POST",
            body: JSON.stringify(newNote),
        })
        .then(fetch(baseURL)
            .then(res => res.json())
            .then(result => {renderNotes(Object.values(result))}));
        titleInput.value = "";
    }
}
//name _id
attachEvents();
