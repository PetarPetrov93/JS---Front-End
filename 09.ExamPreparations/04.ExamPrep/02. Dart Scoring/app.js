window.addEventListener("load", solve);

function solve() {
    const nameInput = document.querySelector("#player");
    const scoreInput = document.querySelector("#score");
    const roundInput = document.querySelector("#round");

    const addBtn = document.querySelector("#add-btn");
    const clearBtn = document.querySelector(".btn.clear");
    clearBtn.addEventListener("click", () =>{
      location.reload();
    });

    const sureListUl = document.querySelector("#sure-list");
    const scoreboardList = document.querySelector("#scoreboard-list");

    addBtn.addEventListener("click", addRecord);

    function addRecord(){

      const name = nameInput.value;
      const score = scoreInput.value;
      const round = roundInput.value;

      const isEmptyInput = name === "" || score === "" || round === "";
      if (isEmptyInput) {
        return;
      }

      const li = document.createElement("li");
      li.classList.add("dart-item");

      const article = document.createElement("article");

      const parName = document.createElement("p");
      parName.textContent = name;
      const parScore = document.createElement("p");
      parScore.textContent = `Score: ${score}`;
      const parRound = document.createElement("p");
      parRound.textContent = `Round: ${round}`;

      const editBtn = document.createElement("button");
      editBtn.textContent = "edit";
      editBtn.classList.add("btn");
      editBtn.classList.add("edit");
      editBtn.addEventListener("click", () =>{

        nameInput.value = name;
        scoreInput.value = score;
        roundInput.value = round;

        li.remove();

        addBtn.disabled = false;

      });

      const okBtn = document.createElement("button");
      okBtn.textContent = "ok";
      okBtn.classList.add("btn");
      okBtn.classList.add("ok");
      okBtn.addEventListener("click", () =>{

        li.removeChild(editBtn);
        li.removeChild(okBtn);
        li.remove();
        scoreboardList.appendChild(li);
        addBtn.disabled = false;
      });

      article.appendChild(parName);
      article.appendChild(parScore);
      article.appendChild(parRound);

      li.appendChild(article);
      li.appendChild(editBtn);
      li.appendChild(okBtn);

      sureListUl.appendChild(li);

      addBtn.disabled = true;

      nameInput.value = "";
      scoreInput.value = "";
      roundInput.value = "";
    }
  }