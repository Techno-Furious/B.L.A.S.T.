function runSequenceBot() {
    let sequence = [];
    let isRecording = true;
    let lastActivationTime = 0;
    let sequenceTimeout = null;

    const squaresContainer = document.querySelector(".squares");

    if (!squaresContainer) {
        console.error("Squares container not found!");
        return;
    }

    function displaySequence() {
        const formattedSequence = sequence.map(coord => {
            const [row, col] = coord.split("-");
            return `[${row},${col}]`;
        }).join(" → ");
        
        console.log("Current sequence:", formattedSequence || "empty");
        
        let displayEl = document.getElementById("sequence-display");
        if (!displayEl) {
            displayEl = document.createElement("div");
            displayEl.id = "sequence-display";
            displayEl.style.cssText = `
                position: fixed;
                top: 10px;
                left: 10px;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 10px;
                border-radius: 5px;
                font-family: monospace;
                z-index: 1000;
            `;
            document.body.appendChild(displayEl);
        }
        displayEl.textContent = `Sequence: ${formattedSequence || "empty"}`;
    }

    function getSquare(rowIndex, colIndex) {
        const rows = squaresContainer.getElementsByClassName("square-row");
        const row = rows[rowIndex];
        return row ? row.children[colIndex] : null;
    }

    function clickSquare(rowIndex, colIndex) {
        const square = getSquare(rowIndex, colIndex);
        if (square) {
            const events = ["mousedown", "mouseup", "click"];
            events.forEach(eventType => {
                square.dispatchEvent(new MouseEvent(eventType, {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                    buttons: eventType === "mouseup" ? 0 : 1
                }));
            });
            console.log(`Clicked: Row ${rowIndex}, Col ${colIndex}`);
        }
    }

    function playSequence() {
        if (sequence.length === 0) return;
        
        isRecording = false;
        console.log("Playing back sequence:", sequence);

        if (sequenceTimeout) {
            clearTimeout(sequenceTimeout);
        }

        sequence.forEach((squareID, i) => {
            setTimeout(() => {
                const [rowIndex, colIndex] = squareID.split("-").map(Number);
                clickSquare(rowIndex, colIndex);
                
                if (i === sequence.length - 1) {
                    setTimeout(() => {
                        sequence = [];
                        isRecording = true;
                        console.log("Sequence completed. Ready for next pattern.");
                        displaySequence(); 
                    }, 500);
                }
            }, i * 300);
        });
    }

    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type === "attributes" && 
                mutation.attributeName === "class" &&
                mutation.target.classList.contains("square-active")) {
                
                const square = mutation.target;
                const row = square.closest(".square-row");
                
                if (!row) continue;
                
                const rowIndex = Array.from(squaresContainer.children).indexOf(row);
                const colIndex = Array.from(row.children).indexOf(square);
                const squareID = `${rowIndex}-${colIndex}`;

                if (isRecording && !sequence.includes(squareID)) {
                    sequence.push(squareID);
                    lastActivationTime = Date.now();
                    console.log(`Recorded: Row ${rowIndex}, Col ${colIndex}`);
                    displaySequence(); 
                    
                    if (sequenceTimeout) {
                        clearTimeout(sequenceTimeout);
                    }
                    
                    sequenceTimeout = setTimeout(() => {
                        if (sequence.length > 0 && isRecording) {
                            console.log("Pattern complete. Starting playback...");
                            playSequence();
                        }
                    }, 2000);
                }
            }
        }
    });

    observer.observe(squaresContainer, {
        attributes: true,
        attributeFilter: ["class"],
        subtree: true,
        childList: true
    });

    displaySequence();
    console.log("Sequence bot started and ready to record patterns...");

    return () => {
        observer.disconnect();
        if (sequenceTimeout) {
            clearTimeout(sequenceTimeout);
        }
        const displayEl = document.getElementById("sequence-display");
        if (displayEl) {
            displayEl.remove();
        }
        console.log("Sequence bot stopped.");
    };
}

const stopBot = runSequenceBot();