const display = document.getElementById('display');

function appendValue(value) {
    if (display.value === 'Chyba') {
        display.value = '';
    }
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    if (display.value === 'Chyba') {
        display.value = '';
    } else {
        display.value = display.value.slice(0, -1);
    }
}

function calculate() {
    if (display.value === '' || display.value === 'Chyba') return;

    try {
        const sanitizedValue = display.value.replace(/[^0-9+\-*/().]/g, '');
        const result = Function('"use strict"; return (' + sanitizedValue + ')')();

        if (!isFinite(result)) {
            throw new Error("Matematická chyba");
        }

        display.value = Math.round(result * 1e10) / 1e10;
    } catch (error) {
        display.value = 'Chyba';
    }
}

document.addEventListener('keydown', function(event) {
    const key = event.key;

    if ((key >= '0' && key <= '9') || key === '.') {
        appendValue(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendValue(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        clearDisplay();
    }
});