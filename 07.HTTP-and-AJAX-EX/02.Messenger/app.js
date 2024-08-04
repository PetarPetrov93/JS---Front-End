function attachEvents() {
    const baseURL = 'http://localhost:3030/jsonstore/messenger';

    const textArea = document.getElementById("messages");
    const inputName = document.querySelector('input[name="author"]');
    const inputMessage = document.querySelector('input[name="content"]');
    const sendBtn = document.querySelector("#submit");
    const refreshBtn = document.querySelector("#refresh");

    sendBtn.addEventListener("click", async () => {

        const msgFormat = {
            author: inputName.value,
            content: inputMessage.value
        };

        const isValidMessage = inputName.value !== '' && inputMessage.value !== '';

        if (isValidMessage) {
            
            await fetch(baseURL, {
                method: 'POST',
                body: JSON.stringify(msgFormat)
            });
        }

        inputName.value = '';
        inputMessage.value = '';
    });
    
    refreshBtn.addEventListener("click", async () =>{

        const getAllMessages = await fetch(baseURL);
        const allMessages = await getAllMessages.json();
        const messagesForOutputAsArr = [];

        for (const message of Object.values(allMessages)) {

            messagesForOutputAsArr.push(`${message.author}: ${message.content}`);
        }

        textArea.value = messagesForOutputAsArr.join('\n');
    });
}

attachEvents();