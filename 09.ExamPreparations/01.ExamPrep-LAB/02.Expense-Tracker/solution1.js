//UNCOMENT THIS CODE
//window.addEventListener("load", solve);

function solve(){

    const expenseType = document.getElementById("expense");
    const amount = document.getElementById("amount");
    const date = document.getElementById("date");
    const addBtn = document.getElementById("add-btn");
    const deleteBtn = document.querySelector(".btn.delete");
    const previewList = document.getElementById("preview-list");
    const ulExpensesList = document.getElementById("expenses-list");

    console.log(addBtn);
    console.log(deleteBtn);
    addBtn.addEventListener("click", addInfoToPreview);

    function addInfoToPreview(){

        const expenseText = expenseType.value;
        const amountText = amount.value;
        const dateText = date.value

        const isValidData = expenseText !== "" && amountText !== "" && dateText !== "";

        if (isValidData) {

            const liExpenseItem = document.createElement("li");
            liExpenseItem.classList.add("expense-item");
            
            const article = document.createElement("article");

            const parExpenseType = document.createElement("p");
            parExpenseType.textContent = `Type: ${expenseText}`;

            const parAmount = document.createElement("p");
            parAmount.textContent = `Amount: ${amountText}$`;

            const parDate = document.createElement("p");
            parDate.textContent = `Date: ${dateText}`;

            const divButtons = document.createElement("div");

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.classList.add("btn");
            editBtn.classList.add("edit");

            const okBtn = document.createElement("button");
            okBtn.textContent = "Ok";
            okBtn.classList.add("btn");
            okBtn.classList.add("ok");

            divButtons.appendChild(editBtn);
            divButtons.appendChild(okBtn);

            article.appendChild(parExpenseType);
            article.appendChild(parAmount);
            article.appendChild(parDate);

            liExpenseItem.appendChild(article);
            liExpenseItem.appendChild(divButtons);

            previewList.appendChild(liExpenseItem);

            addBtn.disabled = true;
            expenseType.value = "";
            amount.value = "";
            date.value = "";

            
            editBtn.addEventListener("click", ()=>{
        
                expenseType.value = expenseText;
                amount.value = amountText;
                date.value = dateText;
                addBtn.disabled = false;
        
                previewList.innerHTML = "";
        
            });

            okBtn.addEventListener("click", ()=>{


                const liExpenseItem2 = document.createElement("li");
                liExpenseItem.classList.add("expense-item");
            
                const article2 = document.createElement("article");

                const parExpenseType2 = document.createElement("p");
                parExpenseType2.textContent = `Type: ${expenseText}`;

                const parAmount2 = document.createElement("p");
                parAmount2.textContent = `Amount: ${amountText}$`;

                const parDate2 = document.createElement("p");
                parDate2.textContent = `Date: ${dateText}`;

                article2.appendChild(parExpenseType2);
                article2.appendChild(parAmount2);
                article2.appendChild(parDate2);

                liExpenseItem2.appendChild(article2);

                ulExpensesList.appendChild(liExpenseItem2);

                previewList.innerHTML = "";
                addBtn.disabled = false;

            });
        }

    }

    deleteBtn.addEventListener("click", ()=>{

        expenseType.value = "";
        amount.value = "";
        date.value = "";
        previewList.innerHTML = "";
        ulExpensesList.innerHTML = "";
        addBtn.disabled = false;

    });

}