function runAimBot() {
    function simulateClick(element, x, y) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const events = ['mousedown', 'mouseup', 'click'];
        events.forEach(eventType => {
            const event = new MouseEvent(eventType, {
                view: window,
                bubbles: true,
                cancelable: true,
                clientX: centerX,
                clientY: centerY,
                buttons: eventType === 'mouseup' ? 0 : 1
            });
            element.dispatchEvent(event);
        });
    }

    const observer = new MutationObserver((mutations) => {
        const target = document.querySelector('[data-aim-target="true"]');
        if (target) {
            requestAnimationFrame(() => {
                simulateClick(target);
            });
        }
    });

    // Start observing the entire document for the target element
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true
    });

    console.log("Aim bot started - watching for targets...");
    setTimeout(() => {
        console.log("Waited 2 seconds");
    }, 5000); 
    


    return () => {
        observer.disconnect();
        console.log("Aim bot stopped.");
    };
}

const stopAimBot = runAimBot();