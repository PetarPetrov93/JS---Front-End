function solve(){

    let baseURL = 'http://localhost:3030/jsonstore/gifts/';
    
    let currPresentID;
    console.log("currPresentID initial value");
    console.log(currPresentID);

    let loadPresentsBtn = document.getElementById("load-presents");

    let presentInputRef = document.getElementById("gift");
    let nameInputRef = document.getElementById("for");
    let priceInputRef = document.getElementById("price");

    let addPresentBtn = document.getElementById("add-present");
    let editPresentBtn = document.getElementById("edit-present");

    loadPresentsBtn.addEventListener("click", loadPresents);

    addPresentBtn.addEventListener("click", addNewPresent);

    async function loadPresents(){

        let divPresentsList = document.getElementById("gift-list");
        divPresentsList.innerHTML = "";

        let allPresents = Object.values(await(await fetch(baseURL)).json());

        for (const present of allPresents) {
        
        let presentName = present.gift;
        let childName = present.for;
        let price = present.price;
        
        let divGiftSock = document.createElement("div");
        divGiftSock.classList.add("gift-sock");

        let divContent = document.createElement("div");
        divContent.classList.add("content");

        let parPresent = document.createElement("p");
        parPresent.textContent = presentName;

        let parName = document.createElement("p");
        parName.textContent = childName;

        let parPrice = document.createElement("p");
        parPrice.textContent = price;

        let divBtns = document.createElement("div");
        divBtns.classList.add("buttons-container");

        let changeBtn = document.createElement("button");
        changeBtn.classList.add("change-btn");
        changeBtn.textContent = "Change";
        changeBtn.setAttribute("id", present._id);

        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "Delete";
        deleteBtn.setAttribute("id", present._id);
        
        divBtns.appendChild(changeBtn);
        divBtns.appendChild(deleteBtn);

        divContent.appendChild(parPresent);
        divContent.appendChild(parName);
        divContent.appendChild(parPrice);

        divGiftSock.appendChild(divContent);
        divGiftSock.appendChild(divBtns);

        divPresentsList.appendChild(divGiftSock);

        deleteBtn.addEventListener("click", async (e) =>{

            let idToDelete = e.currentTarget.getAttribute("id");

            await fetch(baseURL + `${idToDelete}`, {
                method: "DELETE",
            });

            loadPresents();

        });

        //mazalqk EI TUKA SE EBAVA KODA SHTOTO PRI EDIT MI SE GUBI _id - to:
        changeBtn.addEventListener("click", async (e) =>{
            console.log("btn attribute");
            console.log(e.currentTarget.getAttribute("id"));
            currPresentID = e.currentTarget.getAttribute("id");
            console.log("currPresentID set in the changebtn");
            console.log(currPresentID);

            presentInputRef.value = parPresent.textContent;
            nameInputRef.value = parName.textContent;
            priceInputRef.value = parPrice.textContent;

            divPresentsList.removeChild(divGiftSock);

            editPresentBtn.disabled = false;
            addPresentBtn.disabled = true;

            
        });


        }

        
        
        editPresentBtn.disabled = true;
    }

    async function addNewPresent(){

        let present = presentInputRef.value;
        let name = nameInputRef.value;
        let price = priceInputRef.value;

        let isEmptyInput = present === "" || name === "" || price === "";
        if (isEmptyInput) {
            return;
        }
        // for gift price _id
        let newPresentObj = {
            for: name,
            gift: present,
            price: price,
        }

        await fetch(baseURL, {
            method: "POST",
            body: JSON.stringify(newPresentObj),
        });

        presentInputRef.value = "";
        nameInputRef.value = "";
        priceInputRef.value = "";

        // This function also disables the Edit Present btn which is not specified for the Add gift button, I'm leaving it fro nor but should be kept in mind!
        loadPresents();
    }

    editPresentBtn.addEventListener("click", async(e) =>{
        e.preventDefault();
        console.log("currrPresentID set in the edit btn");
        console.log(currPresentID);
        const updatedPresent = {
            for: nameInputRef.value,
            gift: presentInputRef.value,
            price: priceInputRef.value,
            _id: currPresentID,
        };

        await fetch(`${baseURL}/${currPresentID}`, {
            method: "PUT",
            body: JSON.stringify(updatedPresent),
        });
        
        loadPresents();

        addPresentBtn.disabled = false;

        nameInputRef.value = "";
        presentInputRef.value = "";
        priceInputRef.value = "";
    });


}

solve();