document.getElementById("runReactionBot").addEventListener("click", () => {
    chrome.tabs.create({ url: "https://humanbenchmark.com/tests/reactiontime" }, (tab) => {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["reaction.js"]
        });
    });
});

document.getElementById("runSequenceBot").addEventListener("click", () => {
    chrome.tabs.create({ url: "https://humanbenchmark.com/tests/sequence" }, (tab) => {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["sequence.js"]
        });
    });
});

document.getElementById("runAimBot").addEventListener("click", () => {
    chrome.tabs.create({ url: "https://humanbenchmark.com/tests/aim" }, (tab) => {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["aim.js"]
        });
    });
});

document.getElementById("runNoMemBot").addEventListener("click", () => {
    chrome.tabs.create({ url: "https://humanbenchmark.com/tests/number-memory" }, (tab) => {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["no_memory.js"]
        });
    });
});

document.getElementById("runVerMemBot").addEventListener("click", () => {
    chrome.tabs.create({ url: "https://humanbenchmark.com/tests/verbal-memory" }, (tab) => {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["verbal_memory.js"]
        });
    });
});