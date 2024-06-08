const baseURL = 'http://localhost:3030/jsonstore/games/';

const form = document.querySelector("#form form"); //for appending _id

const nameInput = document.querySelector("#g-name");
const typeInput = document.querySelector("#type");
const playersInput = document.querySelector("#players");

const addBtn = document.querySelector("#add-game"); // prevent default
addBtn.addEventListener("click", addNewGame);

//probably disabled by default
const editBtn = document.querySelector("#edit-game"); // prevent default
editBtn.addEventListener("click", editGame);

const gamesList = document.querySelector("#games-list");

const loadGamesBtn = document.querySelector("#load-games");
loadGamesBtn.addEventListener("click", loadGames);

function loadGames(){
    gamesList.innerHTML = "";
    fetch(baseURL)
    .then(res => res.json())
    .then(result =>{getAllGames(Object.values(result))
    });
}

function getAllGames(games){
    for (const game of games) {
        gamesList.appendChild(renderGame(game));
    }
}

function renderGame(game){
    const name = game.name;
    const players = game.players;
    const type = game.type;
    const id = game._id;

    const divGame = document.createElement("div");
    divGame.classList.add("board-game");

    const content = document.createElement("div");
    content.classList.add("content");

    const parName = document.createElement("p");
    parName.textContent = name;

    const parPlayers = document.createElement("p");
    parPlayers.textContent = players;

    const parType = document.createElement("p");
    parType.textContent = type;

    const btnsDiv = document.createElement("div");
    btnsDiv.classList.add("buttons-container");

    const changeBtn = document.createElement("button");
    changeBtn.classList.add("change-btn");
    changeBtn.textContent = "Change";
    changeBtn.addEventListener("click", () =>{

        nameInput.value = name;
        typeInput.value = type;
        playersInput.value = players;

        editBtn.disabled = false;
        addBtn.disabled = true;

        divGame.remove();

        form.dataset.gameId = id;
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () =>{
        fetch(`${baseURL}${id}`,{
            method: "DELETE"
        })
        .then(loadGames);
    });

    content.appendChild(parName);
    content.appendChild(parPlayers);
    content.appendChild(parType);

    btnsDiv.appendChild(changeBtn);
    btnsDiv.appendChild(deleteBtn);

    divGame.appendChild(content);
    divGame.appendChild(btnsDiv);

    return divGame;
}

function addNewGame(e){
    e.preventDefault();

    const name = nameInput.value;
    const type = typeInput.value;
    const players = playersInput.value;
    const isEmptyInput = name === "" || type === "" || players === "";
    if (isEmptyInput) {
        return;
    }

    const newGame = {
        name,
        type,
        players,
    };

    fetch(baseURL,{
        method: "POST",
        body: JSON.stringify(newGame),
    })
    .then(loadGames)

    clearInput();
}

function clearInput(){
    nameInput.value = "";
    typeInput.value = "";
    playersInput.value = "";
}

function editGame(e){
    e.preventDefault();
    const id = form.dataset.gameId;
    //it's good to check for an empty input but it is not in the problem specs

    const edditedGame = {
        name: nameInput.value,
        players: playersInput.value,
        type: typeInput.value,
        _id: id,
    };

    fetch(`${baseURL}${id}`,{
        method: "PUT",
        body: JSON.stringify(edditedGame),
    })
    .then(loadGames)
    .then(()=>{
        addBtn.disabled = false;
        editBtn.disabled = true;
        
        clearInput();

        delete form.dataset.gameId;
    });
}

//name players type _id