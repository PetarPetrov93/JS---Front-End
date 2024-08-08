async function lockedProfile() {
    const main = document.getElementById("main");
    main.innerHTML = '';
    
    const baseURL = 'http://localhost:3030/jsonstore/advanced/profiles';

    const getAllUsers = await fetch(baseURL);
    const allUsersAsObj = await getAllUsers.json();
    const allUsers = Object.values(allUsersAsObj);
    
    
    for (const user of allUsers) {

        createPersonCard(user.username, user.email, user.age, user._id);

    }
    

    function createPersonCard(username, email, age, id){

        const divProfile = document.createElement("div");
        divProfile.classList.add("profile");

        //for appending to the divProfile:
        const img = document.createElement("img");
        img.src = "./iconProfile2.png";
        img.classList.add("userIcon");

        const labelLock = document.createElement("label");
        labelLock.textContent = "Lock";
        const inputLocked = document.createElement("input");
        inputLocked.type = "radio";
        inputLocked.name = `${id}Locked`;
        inputLocked.value = "lock";
        inputLocked.checked = true;

        const labelUnlock = document.createElement("label");
        labelUnlock.textContent = "Unlock";
        const inputUnocked = document.createElement("input");
        inputUnocked.type = "radio";
        inputUnocked.name = `${id}Locked`;
        inputUnocked.value = "unlock";

        const br = document.createElement("br");
        const hr = document.createElement("hr");

        const labelUsername = document.createElement("label");
        labelUsername.textContent = "Username";
        const inputUsername = document.createElement("input");
        inputUsername.type = "text";
        inputUsername.name = `${id}Username`;
        inputUsername.value = username;
        inputUsername.disabled = true;
        inputUsername.readOnly = true;

        const divID = document.createElement("div");
        divID.id = `${id}HiddenFields`;
        divID.style.display = "none";

        //for appending to the divID:
        const hr2 = document.createElement("hr");

        const labelEmail = document.createElement("label");
        labelEmail.textContent = "Email:";
        const inputEmail = document.createElement("input");
        inputEmail.type = "email";
        inputEmail.name = `${id}Email`;
        inputEmail.value = email;
        inputEmail.disabled = true;
        inputEmail.readOnly = true;

        const labelAge = document.createElement("label");
        labelAge.textContent = "Age:";
        const inputAge = document.createElement("input");
        inputAge.type = "email";
        inputAge.name = `${id}Age`;
        inputAge.value = age;
        inputAge.disabled = true;
        inputAge.readOnly = true;

        //for the divProfile:
        const showMoreBtn = document.createElement("button");
        showMoreBtn.textContent = "Show more";

        //appending the elements:
        //divProfile:
        divProfile.appendChild(img);
        divProfile.appendChild(labelLock);
        divProfile.appendChild(inputLocked);
        divProfile.appendChild(labelUnlock);
        divProfile.appendChild(inputUnocked);
        //this br could also be appended to the labelUnlock but not sure
        divProfile.appendChild(br);
        divProfile.appendChild(hr);
        divProfile.appendChild(labelUsername);
        divProfile.appendChild(inputUsername);

        //for the divID:
        divID.appendChild(hr2);
        divID.appendChild(labelEmail);
        divID.appendChild(inputEmail);
        divID.appendChild(labelAge);
        divID.appendChild(inputAge);

        //for the divProfile
        divProfile.appendChild(divID);
        divProfile.appendChild(showMoreBtn);
        
        //main element of the site:
        
        main.appendChild(divProfile);

        showMoreBtn.addEventListener("click", async () =>{
            
            
            if (inputUnocked.checked && showMoreBtn.textContent == "Show more") {
                
                divID.style.display = "inline";
                showMoreBtn.textContent = "Hide it"
            }
            else if(inputUnocked.checked && showMoreBtn.textContent == "Hide it"){
                divID.style.display = "none";
                showMoreBtn.textContent = "Show more"
            }
        })
    }
}