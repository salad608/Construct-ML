// message handling
async function sendMessage() {
    // Get user message and selected personality
    const userMessage = document.getElementById("user-input").value.trim();
    const personality = document.getElementById("personality-select").value;

    if (!userMessage) {
        alert("Please enter a message before sending.");
        return;
    }

    // display usermsg
    displayMessage("You: " + userMessage, true);

    // fetch response
    const chatbotResponse = await fetchChatbotResponse(userMessage, personality);

    // displaying bot response
    displayMessage("Chatbot: " + chatbotResponse, false);

    // clearing input
    document.getElementById("user-input").value = "";
}

// openai api fetch response
async function fetchChatbotResponse(userMessage, personality) {
    const apiKey = "null";  // Replace with your actual API key
    const apiUrl = "https://api.openai.com/v1/chat/completions";

    // personality
    let personalityInstruction = "";
    if (personality === "friendly") {
        personalityInstruction = "Respond in a friendly and cheerful manner.";
    } else if (personality === "professional") {
        personalityInstruction = "Respond in a formal and professional tone.";
    } else if (personality === "funny") {
        personalityInstruction = "Respond with a humorous and playful tone.";
    }
	else if (personality === "sad") {
		personalityInstruction = "Respond in a sad, unmotivated tone.";
	}
	else if (personality === "happy") {
		personalityInstruction = "Respond happily, cheerfully and joyfully.";
	}
	else if (personality === "scared") {
		personalityInstruction = "Respond in a scared and easily shocked manner.";
	}
	personalityInstruction += "Remember to keep your responses school appropriate. Keep the language easily understandable for a first grader, no matter what personality the user enters.";
	if (document.getElementById("textdesc").value)
		personalityInstruction += "Your description of personality which may include a name is: " + document.getElementById("textdesc").value;

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-4-turbo",
            messages: [
                { role: "system", content: personalityInstruction },
                { role: "user", content: userMessage }
            ],
            max_tokens: 150
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}

function displayMessage(message, isUser) {
    const responseArea = document.getElementById("chatbot-response");
    responseArea.innerHTML += (isUser ? `<p><b>${message}</b></p>` : `<p>${message}</p>`);
    responseArea.scrollTop = responseArea.scrollHeight;  // Auto-scroll to the latest message
}