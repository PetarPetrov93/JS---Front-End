window.addEventListener("load", solve);

function solve() {

    const titleInput = document.querySelector("#task-title");
    const categoryInput = document.querySelector("#task-category");
    const contentInput = document.querySelector("#task-content");

    const reviewList = document.querySelector("#review-list");
    const publishedList = document.querySelector("#published-list");

    const publishBtn = document.querySelector("#publish-btn");
    publishBtn.addEventListener("click", createTask);

    function createTask(){

        title = titleInput.value;
        category = categoryInput.value;
        content = contentInput.value;
        const isEmptyInput = title === "" || category === "" || content === "";
        if (isEmptyInput) {
            return;
        }

        const li = document.createElement("li");
        li.classList.add("rpost");

        const article = document.createElement("article");

        const h4 = document.createElement("h4");
        h4.textContent = title;

        const parCategory = document.createElement("p");
        parCategory.textContent = `Category: ${category}`;

        const parContent = document.createElement("p");
        parContent.textContent = `Content: ${content}`;

        const editBtn = document.createElement("button");
        editBtn.classList.add("action-btn");
        editBtn.classList.add("edit");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", () =>{

            titleInput.value = title;
        categoryInput.value = category;
        contentInput.value = content;

        li.remove();
        });

        const postBtn = document.createElement("button");
        postBtn.classList.add("action-btn");
        postBtn.classList.add("post");
        postBtn.textContent = "Post";
        postBtn.addEventListener("click", () =>{
            
            li.removeChild(editBtn);
            li.removeChild(postBtn);
            reviewList.removeChild(li);
            publishedList.appendChild(li);

        });

        article.appendChild(h4);
        article.appendChild(parCategory);
        article.appendChild(parContent);

        li.appendChild(article);
        li.appendChild(editBtn);
        li.appendChild(postBtn);

        reviewList.appendChild(li);

        titleInput.value = "";
        categoryInput.value = "";
        contentInput.value = "";

    }
}