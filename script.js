document.getElementById('sendButton').addEventListener('click', sendMessage);
document.getElementById('userInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    if (userInput.trim() === '') return;

    addMessageToLog(userInput, 'user');
    document.getElementById('userInput').value = '';

    fetchChatGPTResponse(userInput);
}

function addMessageToLog(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
    document.getElementById('chatLog').appendChild(messageDiv);
    document.getElementById('chatWindow').scrollTop = document.getElementById('chatWindow').scrollHeight;
}

async function fetchChatGPTResponse(message) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ''
            },
            body: JSON.stringify({ prompt: message, max_tokens: 150 })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const botMessage = data.choices[0].text.trim();
        addMessageToLog(botMessage, 'bot');
    } catch (error) {
        console.error('Error fetching ChatGPT response:', error);
        addMessageToLog('Sorry, something went wrong. Please try again later.', 'bot');
    }
}