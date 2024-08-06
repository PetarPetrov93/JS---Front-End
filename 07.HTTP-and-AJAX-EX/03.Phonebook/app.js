function attachEvents() {
    const baseURL = 'http://localhost:3030/jsonstore/phonebook';

    const loadBtn = document.getElementById("btnLoad");
    const createBtn = document.getElementById("btnCreate");
    const personTextbox = document.getElementById("person");
    const phoneTextbox = document.getElementById("phone");
    const phonebook = document.getElementById("phonebook");

    loadBtn.addEventListener("click", getAllContacts);

    async function getAllContacts(){

        phonebook.innerHTML = '';

        const allPhonebookEntries = await fetch(baseURL);
        const phonebookEntries = await allPhonebookEntries.json();

        const listOfSubscribers = Object.values(phonebookEntries);

        for (const user of listOfSubscribers) {
            
            const li = document.createElement("li");
            li.textContent = `${user.person}: ${user.phone}`;

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";

            li.appendChild(deleteBtn);
            phonebook.appendChild(li);

            deleteBtn.addEventListener("click", async () => {
                
                const id = user._id;
                const deleteRequest = await fetch(baseURL + `/${id}`, {
                    method: "DELETE",
                });
                
                li.remove();
            });

        }

    }

    createBtn.addEventListener("click", async () => {
        
        const newContact = {
            person: personTextbox.value,
            phone: phoneTextbox.value
        };

        const isValidInput = personTextbox.value !== '' && phone.value !== '';

        if (isValidInput) {
            
            const postRequestForAddingNewContact = await fetch(baseURL, {
                method: 'POST',
                body: JSON.stringify(newContact)
            });

            phonebook.innerHTML = '';
            getAllContacts();
        }

        personTextbox.value = '';
        phoneTextbox.value = '';
        
    });

}

attachEvents();