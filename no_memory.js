let previousNumber = '';

const checkInterval = setInterval(() => {
    const numberDisplay = document.querySelector('.big-number');
    
    if (numberDisplay) {
        const currentNumber = numberDisplay.textContent.trim();
        
        if (currentNumber && currentNumber !== previousNumber) {
            console.log('Updated:', currentNumber);
            previousNumber = currentNumber;
            
            const formCheck = setInterval(() => {
                const input = document.querySelector('input[pattern="[0-9]*"]');
                const buttons = document.getElementsByClassName('css-de05nr e19owgy710');

                if (input && buttons.length > 0) {
                    clearInterval(formCheck); 
        
                    Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set.call(input, currentNumber);
                    
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                    input.dispatchEvent(new Event('change', { bubbles: true }));

                    console.log('Entered in form:', currentNumber);
                    
                    
                    setTimeout(() => {
                        buttons[0].click();
                        console.log('Form submitted!');
                    }, 200); 
                }
            }, 100); 
        }
    }
}, 100); 
