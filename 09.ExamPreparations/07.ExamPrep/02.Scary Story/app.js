window.addEventListener("load", solve);

function solve() {

  const previewList = document.querySelector("#preview-list");

  const firstNameInput = document.querySelector("#first-name");
  const lastNameInput = document.querySelector("#last-name");
  const ageInput = document.querySelector("#age");
  const sotryTitleInput = document.querySelector("#story-title");
  const genreInput = document.querySelector("#genre");
  const storyInput = document.querySelector("#story");

  const publishBtn = document.querySelector("#form-btn");
  publishBtn.addEventListener("click", addNewStory);

  function addNewStory(){

    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;
    const age = ageInput.value;
    const sotryTitle = sotryTitleInput.value;
    const genre = genreInput.value;
    const story = storyInput.value;
    const isEmptyInput = firstName === "" || lastName === "" || age === "" || sotryTitle === "" || genre === "" || story === "";
    if (isEmptyInput) {
      return;
    }

    const li = document.createElement("li");
    li.classList.add("story-info");

    const article = document.createElement("article");

    const h4 = document.createElement("h4");
    h4.textContent = `Name: ${firstName} ${lastName}`;

    const parAge = document.createElement("p");
    parAge.textContent = `Age: ${age}`;

    const parTitle = document.createElement("p");
    parTitle.textContent = `Title: ${sotryTitle}`;

    const parGenre = document.createElement("p");
    parGenre.textContent = `Genre: ${genre}`;

    const parStory = document.createElement("p");
    parStory.textContent = story;

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save Story";
    saveBtn.classList.add("save-btn");
    saveBtn.addEventListener("click", () =>{
      const main = document.querySelector("#main");
      main.innerHTML = "";

      const h1 = document.createElement("h1");
      h1.textContent = "Your scary story is saved!";

      main.appendChild(h1);
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit Story";
    editBtn.classList.add("edit-btn");
    editBtn.addEventListener("click", () =>{

    firstNameInput.value = firstName;
    lastNameInput.value = lastName;
    ageInput.value = age;
    sotryTitleInput.value = sotryTitle;
    genreInput.value = genre;
    storyInput.value = story;

    publishBtn.disabled = false;

    saveBtn.disabled = true;
    editBtn.disabled = true;
    deleteBtn.disabled = true;

    li.remove();

    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete Story";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () =>{

      li.remove();
      publishBtn.disabled = false;
    });
    
    article.appendChild(h4);
    article.appendChild(parAge);
    article.appendChild(parTitle);
    article.appendChild(parGenre);
    article.appendChild(parStory);

    li.appendChild(article);
    li.appendChild(saveBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    previewList.appendChild(li);

    firstNameInput.value = "";
    lastNameInput.value = "";
    ageInput.value = "";
    sotryTitleInput.value = "";
    genreInput.value = "";
    storyInput.value = "";

    publishBtn.disabled = true;
  }
}
