function runReactionBot() {
    let isRunning = false;
    let isProcessingResult = false;  // Flag to prevent double clicks

    function handleTestCycle() {
        if (!isRunning) return; // Stop the cycle if the bot is turned off

        console.log("Starting new reaction test cycle...");
        isProcessingResult = false;  // Reset flag at start of cycle

        let checkState = setInterval(() => {
            if (!isRunning) {
                clearInterval(checkState);
                return;
            }

            // Find all screens
            let waitingScreen = document.querySelector(".view-waiting.e18o0sx0.css-saet2v.e19owgy77");
            let goScreen = document.querySelector(".view-go.e18o0sx0.css-saet2v.e19owgy77");
            let resultScreen = document.querySelector(".view-result.e18o0sx0.css-saet2v.e19owgy77");

            // Handle green screen
            if (!waitingScreen && goScreen) {
                console.log("Green screen detected! Clicking...");

                if (goScreen && goScreen.offsetWidth > 0 && goScreen.offsetHeight > 0) {
                    ['mousedown', 'mouseup', 'click'].forEach(eventType => {
                        goScreen.dispatchEvent(new MouseEvent(eventType, {
                            view: window,
                            bubbles: true,
                            cancelable: true
                        }));
                    });
                    console.log("Clicked green screen");
                }
            }

            // Handle result screen - with protection against double clicks
            if (resultScreen && !isProcessingResult) {
                isProcessingResult = true;  // Set flag to prevent multiple processes
                clearInterval(checkState);
                console.log("Result screen detected, waiting before next round...");

                setTimeout(() => {
                    if (isRunning && resultScreen && resultScreen.offsetWidth > 0 && resultScreen.offsetHeight > 0) {
                        resultScreen.dispatchEvent(new MouseEvent('click', {
                            view: window,
                            bubbles: true,
                            cancelable: true
                        }));
                        console.log("Clicked result screen, starting new cycle...");
                        setTimeout(handleTestCycle, 500); // Start next cycle with a small delay
                    }
                }, 2000); // Wait 2 seconds to view results
            }
        }, 1);
    }

    // Control Panel UI
    const controlPanel = document.createElement('div');
    controlPanel.innerHTML = `
        <div id="bot-control" style="position: fixed; top: 20px; left: 20px; padding: 10px; background: white; border: 2px solid black; border-radius: 5px; z-index: 9999;">
            <button id="start-bot" style="margin-right: 5px;">Start Bot</button>
            <button id="stop-bot">Stop Bot</button>
            <p id="bot-status" style="margin-top: 5px; font-weight: bold;">Status: Stopped</p>
        </div>
    `;
    document.body.appendChild(controlPanel);

    // Function to start the bot
    function startBot() {
        if (isRunning) return;
        isRunning = true;
        document.getElementById('bot-status').textContent = 'Status: Running';
        console.log("Reaction Bot Started!");
        handleTestCycle(); // ✅ Start the first cycle when the bot is turned on
    }

    // Function to stop the bot
    function stopBot() {
        isRunning = false;
        document.getElementById('bot-status').textContent = 'Status: Stopped';
        console.log("Reaction Bot Stopped!");
    }

    // Event Listeners
    document.getElementById('start-bot').addEventListener('click', startBot);
    document.getElementById('stop-bot').addEventListener('click', stopBot);
}

// Run the bot with UI
runReactionBot();
