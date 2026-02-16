const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("sendBtn");
const micBtn = document.getElementById("micBtn");
const voiceOverlay = document.getElementById("voiceOverlay");
const voiceStatus = document.getElementById("voiceStatus");

let recognition = null;
let isVoiceActive = false;

/* -------------------- CHAT MODE -------------------- */

function addMessage(text, sender) {
    const div = document.createElement("div");
    div.className = "message " + sender;
    div.innerText = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    messageInput.value = "";

    const response = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            message: text,
            mode: "chat"
        })
    });

    const data = await response.json();
    addMessage(data.response, "bot");
}

sendBtn.addEventListener("click", sendMessage);

messageInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") sendMessage();
});


/* -------------------- VOICE MODE -------------------- */

micBtn.addEventListener("click", () => {
    voiceOverlay.style.display = "flex";
    startVoiceMode();
});

function startVoiceMode() {

    isVoiceActive = true;

    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    voiceStatus.innerText = "Listening...";

    recognition.onresult = async function(event) {

        if (!isVoiceActive) return;

        const speechText = event.results[0][0].transcript;

        voiceStatus.innerText = "Thinking...";

        try {
            const response = await fetch("/chat", {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                    message: speechText,
                    mode: "voice"
                })
            });

            const data = await response.json();

            const speech = new SpeechSynthesisUtterance(data.response);
            speech.rate = 1;
            speech.pitch = 1;

            speechSynthesis.speak(speech);

            speech.onend = () => {
                if (isVoiceActive) {
                    voiceStatus.innerText = "Listening...";
                    recognition.start();   // continue conversation
                }
            };

        } catch (error) {
            voiceStatus.innerText = "Error...";
            console.error(error);
        }
    };

    recognition.onerror = function() {
        if (isVoiceActive) {
            voiceStatus.innerText = "Listening...";
            recognition.start();
        }
    };

    recognition.start();
}

function exitVoice() {
    isVoiceActive = false;

    if (recognition) {
        recognition.stop();
        recognition = null;
    }

    speechSynthesis.cancel();
    voiceOverlay.style.display = "none";
}
