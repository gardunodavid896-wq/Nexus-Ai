const input = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const chatArea = document.getElementById("chatArea");
const typing = document.getElementById("typing");

function addMessage(sender, text) {

    const message = document.createElement("div");
    message.className = `message ${sender}`;

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.innerText = sender === "ai" ? "N" : "Y";

    const bubble = document.createElement("div");
    bubble.className = "bubble";

    const title = document.createElement("h4");
    title.innerText = sender === "ai" ? "Nexus" : "You";

    const paragraph = document.createElement("p");
    paragraph.innerText = text;

    bubble.appendChild(title);
    bubble.appendChild(paragraph);

    if (sender === "user") {
        message.appendChild(bubble);
        message.appendChild(avatar);
    } else {
        message.appendChild(avatar);
        message.appendChild(bubble);
    }

    chatArea.appendChild(message);
    chatArea.scrollTop = chatArea.scrollHeight;
}

async function sendMessage() {

    const text = input.value.trim();

    if (!text) return;

    addMessage("user", text);

    input.value = "";

    typing.style.display = "block";

    try {

        const response = await fetch("http://127.0.0.1:8000/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: text
            })

        });

        const data = await response.json();

        typing.style.display = "none";

        addMessage("ai", data.response);

    } catch (error) {

        typing.style.display = "none";

        addMessage(
            "ai",
            "⚠️ I couldn't connect to the Nexus backend. Make sure FastAPI is running."
        );

        console.error(error);

    }

}

sendButton.addEventListener("click", sendMessage);

input.addEventListener("keydown", function(event){

    if(event.key === "Enter"){

        sendMessage();

    }

});
