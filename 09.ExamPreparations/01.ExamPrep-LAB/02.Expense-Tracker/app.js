window.addEventListener("load", solve);

function solve(){

    const expenseTypeInput = document.getElementById("expense");
    const amountInput = document.getElementById("amount");
    const dateInput = document.getElementById("date");

    const previewList = document.getElementById("preview-list");
    const expensesList = document.getElementById("expenses-list");
    
    const addBtn = document.getElementById("add-btn");
    addBtn.addEventListener("click", () =>{

        const isEmptyInput = expenseTypeInput.value === "" || amountInput.value === "" || dateInput.value === "";
        if (isEmptyInput) {
            return;
        }

        const li = createNewItem();

        previewList.appendChild(li);

        clearInputs();
    });

    const deleteBtn = document.querySelector('.delete');
    deleteBtn.addEventListener("click", () =>{
        
        location.reload();

    });

    function clearInputs(){

        expenseTypeInput.value = "";
        amountInput.value = "";
        dateInput.value = ""
        addBtn.disabled = true;
    }

    function createNewItem(){

        const expenseType = expenseTypeInput.value;
        const amount = amountInput.value;
        const date = dateInput.value;

        const li = document.createElement("li");
        li.classList.add("expense-item");

        const article = document.createElement("article");

        const parExpenseType = document.createElement("p");
        parExpenseType.textContent = `Type: ${expenseType}`;
        const parAmount = document.createElement("p");
        parAmount.textContent = `Amount: ${amount}$`;
        const parDate = document.createElement("p");
        parDate.textContent = `Date: ${date}`;

        const btnsDiv = document.createElement("div");
        btnsDiv.classList.add("buttons");

        const editBtn = document.createElement("button");
        editBtn.textContent = "edit";
        editBtn.classList.add("btn");
        editBtn.classList.add("edit");
        editBtn.addEventListener("click", () =>{

            expenseTypeInput.value = expenseType;
            amountInput.value = amount;
            dateInput.value = date;

            previewList.removeChild(li);

            addBtn.disabled = false;

        });


        const okBtn = document.createElement("button");
        okBtn.textContent = "ok";
        okBtn.classList.add("btn");
        okBtn.classList.add("ok");
        okBtn.addEventListener("click", () =>{

            li.removeChild(btnsDiv);
            previewList.removeChild(li);
            expensesList.appendChild(li);

            addBtn.disabled = false;

        });

        btnsDiv.appendChild(editBtn);
        btnsDiv.appendChild(okBtn);

        article.appendChild(parExpenseType);
        article.appendChild(parAmount);
        article.appendChild(parDate);

        li.appendChild(article);
        li.appendChild(btnsDiv);

        return li;

    }

}