const controlPanel = document.createElement('div');
controlPanel.innerHTML = `
    <div id="bot-control" style="position: fixed; top: 20px; left: 20px; padding: 10px; background: white; border: 2px solid black; border-radius: 5px; z-index: 9999;">
        <button id="start-bot" style="margin-right: 5px;">Start Bot</button>
        <button id="stop-bot">Stop Bot</button>
        <p id="bot-status" style="margin-top: 5px; font-weight: bold;">Status: Stopped</p>
    </div>
`;
document.body.appendChild(controlPanel);

let botActive = false;
let checkInterval;
let seenWords = new Set(JSON.parse(localStorage.getItem('seenWords')) || []);

function startBot() {
    if (botActive) return;
    botActive = true;
    document.getElementById('bot-status').textContent = 'Status: Running';

    checkInterval = setInterval(() => {
        const wordElement = document.querySelector('.word');
        const buttons = document.getElementsByClassName('css-de05nr e19owgy710');

        if (wordElement && buttons.length >= 2) {
            const currentWord = wordElement.textContent.trim().toLowerCase();

            if (currentWord) {
                if (seenWords.has(currentWord)) {
                    console.log(`Seen before: ${currentWord}`);
                    buttons[0].click(); 
                } else {
                    console.log(`New word detected: ${currentWord}`);
                    seenWords.add(currentWord);
                    localStorage.setItem('seenWords', JSON.stringify([...seenWords])); 
                    buttons[1].click(); 
                }
            }
        }
    }, 100); 
}

function stopBot() {
    if (!botActive) return;
    botActive = false;
    clearInterval(checkInterval);
    document.getElementById('bot-status').textContent = 'Status: Stopped';
    console.log('Bot Stopped');
}

document.getElementById('start-bot').addEventListener('click', startBot);
document.getElementById('stop-bot').addEventListener('click', stopBot);
