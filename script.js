// ===============================
// Nexus AI
// Version 4
// ===============================

const input = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const chatArea = document.getElementById("chatArea");
const typing = document.getElementById("typing");

const clearButton = document.getElementById("clearChat");
const newChatButton = document.getElementById("newChat");

// ----------------------------
// Add Message
// ----------------------------

function addMessage(sender, text){

    const message = document.createElement("div");
    message.className = `message ${sender}`;

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.innerText = sender === "ai" ? "N" : "Y";

    const bubble = document.createElement("div");
    bubble.className = "bubble";

    const title = document.createElement("h4");
    title.innerText = sender === "ai" ? "Nexus" : "You";

    const body = document.createElement("p");
    body.innerText = text;

    bubble.appendChild(title);
    bubble.appendChild(body);

    if(sender === "user"){

        message.appendChild(bubble);
        message.appendChild(avatar);

    }else{

        message.appendChild(avatar);
        message.appendChild(bubble);

    }

    chatArea.appendChild(message);

    chatArea.scrollTop = chatArea.scrollHeight;

}

// ----------------------------
// AI Request
// ----------------------------

async function askNexus(message){

    typing.style.display = "flex";

    try{

        const response = await fetch("http://127.0.0.1:8000/chat",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                message:message

            })

        });

        if(!response.ok){

            throw new Error("Server Error");

        }

        const data = await response.json();

        typing.style.display="none";

        addMessage("ai",data.response);

    }

    catch(error){

        typing.style.display="none";

        addMessage(
            "ai",
            "⚠️ I couldn't connect to the Nexus backend. Make sure FastAPI is running."
        );

        console.error(error);

    }

}

// ----------------------------
// Send Message
// ----------------------------

function sendMessage(){

    const text = input.value.trim();

    if(text === "") return;

    addMessage("user",text);

    input.value="";

    askNexus(text);

}

// ----------------------------
// New Chat
// ----------------------------

newChatButton.addEventListener("click",()=>{

    chatArea.innerHTML=`

        <div class="message ai">

            <div class="avatar">N</div>

            <div class="bubble">

                <h4>Nexus</h4>

                <p>Hello! 👋</p>

                <p>New conversation started.</p>

                <p>What would you like to build today?</p>

            </div>

        </div>

    `;

});

// ----------------------------
// Clear Chat
// ----------------------------

clearButton.addEventListener("click",()=>{

    chatArea.innerHTML="";

});

// ----------------------------
// Events
// ----------------------------

sendButton.addEventListener("click",sendMessage);

input.addEventListener("keydown",(event)=>{

    if(event.key==="Enter"){

        sendMessage();

    }

});
