window.addEventListener("load", solve);

function solve() {

  const studentNameForm = document.querySelector("#student");
  const universityForm = document.querySelector("#university");
  const scoreForm = document.querySelector("#score");

  const previewList = document.querySelector("#preview-list");
  const candidatesList = document.querySelector("#candidates-list");
  
  const nextBtn = document.querySelector("#next-btn");
  nextBtn.addEventListener("click", createStudentCard);

  function createStudentCard(){

    const studentName = studentNameForm.value;
    const university = universityForm.value;
    const score = scoreForm.value;

    const isEmptyInput = studentName === "" || university === "" || score === "";
    if (isEmptyInput) {
      return;
    }

    const applicationLi = document.createElement("li");
    applicationLi.classList.add("application");

    const article = document.createElement("article");
    
    const h4Name = document.createElement("h4");
    h4Name.textContent = studentName;

    const parUniversity = document.createElement("p");
    parUniversity.textContent = `University: ${university}`;

    const parScore = document.createElement("p");
    parScore.textContent = `Score: ${score}`;

    const editBtn = document.createElement("button");
    editBtn.textContent = "edit";
    editBtn.classList.add("action-btn");
    editBtn.classList.add("edit");
    editBtn.addEventListener("click", () => {

      studentNameForm.value = studentName;
      universityForm.value = university;
      scoreForm.value = score;

      previewList.removeChild(applicationLi);

      nextBtn.disabled = false;

    });

    const applyBtn = document.createElement("button");
    applyBtn.textContent = "apply";
    applyBtn.classList.add("action-btn");
    applyBtn.classList.add("apply");
    applyBtn.addEventListener("click", () => {

      previewList.removeChild(applicationLi);
      applicationLi.removeChild(editBtn);
      applicationLi.removeChild(applyBtn);
      candidatesList.appendChild(applicationLi);

      nextBtn.disabled = false;

    });

    article.appendChild(h4Name);
    article.appendChild(parUniversity);
    article.appendChild(parScore);

    applicationLi.appendChild(article);
    applicationLi.appendChild(editBtn);
    applicationLi.appendChild(applyBtn);

    previewList.appendChild(applicationLi);

    studentNameForm.value = "";
    universityForm.value = "";
    scoreForm.value = "";

    nextBtn.disabled = true;
  }
}
  