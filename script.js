// ==========================
// Nexus AI
// script.js
// ==========================

const input = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const chatArea = document.getElementById("chatArea");
const typing = document.getElementById("typing");

// --------------------------
// Add Message
// --------------------------

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

// --------------------------
// Fake AI Response
// --------------------------

function generateResponse(message) {

    const msg = message.toLowerCase();

    if (msg.includes("hello") || msg.includes("hi")) {
        return "Hello! 👋 I'm Nexus AI. What can I help you build today?";
    }

    if (msg.includes("how are you")) {
        return "Running perfectly. Thanks for asking!";
    }

    if (msg.includes("website")) {
        return "I'd love to help you build a website. We'll make it modern and responsive.";
    }

    if (msg.includes("python")) {
        return "Python is one of my favorite languages. Let's write some code!";
    }

    if (msg.includes("html")) {
        return "HTML gives your webpage its structure. Ready to build something awesome?";
    }

    if (msg.includes("css")) {
        return "CSS is what makes everything look beautiful.";
    }

    if (msg.includes("javascript")) {
        return "JavaScript brings websites to life with interactivity.";
    }

    return "Interesting! Once my AI backend is connected, I'll be able to answer much more intelligently.";
}

// --------------------------
// Send Message
// --------------------------

function sendMessage() {

    const text = input.value.trim();

    if (text === "") return;

    addMessage("user", text);

    input.value = "";

    typing.style.display = "block";

    setTimeout(() => {

        typing.style.display = "none";

        const response = generateResponse(text);

        addMessage("ai", response);

    }, 1200);

}

// --------------------------
// Events
// --------------------------

sendButton.addEventListener("click", sendMessage);

input.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        sendMessage();

    }

});
