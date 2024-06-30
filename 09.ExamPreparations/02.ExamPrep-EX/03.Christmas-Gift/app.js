function solve(){

    let baseURL = 'http://localhost:3030/jsonstore/gifts/';
    
    const form = document.querySelector("#form form"); //_id will be set as a property here

    const inputPresent = document.querySelector("#gift");
    const inputFor = document.querySelector("#for");
    const inputPrice = document.querySelector("#price");

    const addBtn = document.querySelector("#add-present");
    addBtn.addEventListener("click", addPresent);

    const editBtn = document.querySelector("#edit-present");
    editBtn.addEventListener("click", editPresent);

    const divGiftList = document.querySelector("#gift-list");

    const loadBtn = document.querySelector("#load-presents");
    loadBtn.addEventListener("click", loadPresents);

    function loadPresents(){

        fetch(baseURL)
            .then(res => res.json())
            .then(result => {
                renderPresents(Object.values(result))
            });
    }

    function renderPresents(presents){

        divGiftList.innerHTML = "";

        for (const present of presents) {

            divGiftList.appendChild(renderPresent(present));
        }
    }

    function renderPresent(present){

        const name = present.for;
        const gift = present.gift;
        const price = present.price;
        const id = present._id;

        const divGiftSock = document.createElement("div");
        divGiftSock.classList.add("gift-sock");

        const divContent = document.createElement("div");
        divContent.classList.add("content");

        const parPresent = document.createElement("p");
        parPresent.textContent = gift;
        const parName = document.createElement("p");
        parName.textContent = name;
        const parPrice = document.createElement("p");
        parPrice.textContent = price;

        const divBtns = document.createElement("div");
        divBtns.classList.add("buttons-container");

        const changeBtn = document.createElement("button");
        changeBtn.classList.add("change-btn");
        changeBtn.textContent = "Change";
        changeBtn.addEventListener("click", () =>{

            inputPresent.value = gift;
            inputFor.value = name;
            inputPrice.value = price;

            divGiftSock.remove();

            editBtn.disabled = false;
            addBtn.disabled = true;

            form.dataset.presentId = id;
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () =>{

            fetch(`${baseURL}${id}`,{
                method: "DELETE"
            })
            .then(loadPresents)

        });

        divBtns.appendChild(changeBtn);
        divBtns.appendChild(deleteBtn);

        divContent.appendChild(parPresent);
        divContent.appendChild(parName);
        divContent.appendChild(parPrice);

        divGiftSock.appendChild(divContent);
        divGiftSock.appendChild(divBtns);

        return divGiftSock;

    }

    function addPresent(e){
        e.preventDefault();
        
        const isEmptyInput = inputFor.value === "" || inputPresent.value === "" || inputPrice.value === "";

        if (isEmptyInput) {
            
            return;
        }

        const newGift = {
            for: inputFor.value,
            gift: inputPresent.value,
            price: inputPrice.value,
        };

        fetch(baseURL,{
            method: "POST",
            body: JSON.stringify(newGift),
        })
            .then(loadPresents)

        clearInput();
    }

    function clearInput(){
        inputPresent.value = "";
        inputFor.value = "";
        inputPrice.value = "";
    }

    function editPresent(e){
        e.preventDefault();

        const presentToEdit = inputPresent.value;
        const nameToEdit = inputFor.value;
        const priceToEdit = inputPrice.value;
        const id = form.dataset.presentId;

        const isEmptyInput = presentToEdit === "" || nameToEdit === "" || priceToEdit === "";
        if (isEmptyInput) {
            return
        }

        const edittedPresent = {
            for: nameToEdit,
            gift: presentToEdit,
            price: priceToEdit,
            _id: id,
        }

        fetch(`${baseURL}${id}`, {
            method: "PUT",
            body: JSON.stringify(edittedPresent)
        })
            .then(loadPresents)
        clearInput();
        editBtn.disabled = true;
        addBtn.disabled = false;

        delete form.dataset.presentId;

    }
}

solve();