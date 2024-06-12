window.addEventListener("load", solve);

function solve() {
    const nameInput = document.querySelector("#name");
    const phoneInput = document.querySelector("#phone");
    const categoryInput = document.querySelector("#category");

    const addBtn = document.querySelector("#add-btn");
    addBtn.addEventListener("click", addContact);

    const checkList = document.querySelector("#check-list");

    const contactsList = document.querySelector("#contact-list");

    function addContact(){

      const name = nameInput.value;
      const phone = phoneInput.value;
      const category = categoryInput.value;
      const isEmptyInput = name === "" || phone ==="" || category === "";
      if (isEmptyInput) {
        return;
      }

      const li = document.createElement("li");

      const article = document.createElement("article");

      const parName = document.createElement("p");
      parName.textContent = `name:${name}`;
      
      const parPhone = document.createElement("p");
      parPhone.textContent = `phone:${phone}`;

      const parCategory = document.createElement("p");
      parCategory.textContent = `category:${category}`;

      const divBtns = document.createElement("div");
      divBtns.classList.add("buttons");

      const editBtn = document.createElement("button");
      editBtn.classList.add("edit-btn");
      editBtn.addEventListener("click", () =>{

        nameInput.value = name;
        phoneInput.value = phone;
        categoryInput.value = category;

        li.remove();
      });

      const saveBtn = document.createElement("button");
      saveBtn.classList.add("save-btn");
      saveBtn.addEventListener("click", () =>{

        checkList.removeChild(li);
        li.removeChild(divBtns);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("del-btn");
        deleteBtn.addEventListener("click", () =>{
          contactsList.removeChild(li);
        });

        li.appendChild(deleteBtn);
        contactsList.appendChild(li);
      });

      article.appendChild(parName);
      article.appendChild(parPhone);
      article.appendChild(parCategory);

      divBtns.appendChild(editBtn);
      divBtns.appendChild(saveBtn);

      li.appendChild(article);
      li.appendChild(divBtns);

      checkList.appendChild(li);
      
      nameInput.value = "";
      phoneInput.value = "";
      categoryInput.value = "";
    }
  }
  