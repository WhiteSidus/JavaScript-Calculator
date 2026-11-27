const display = document.getElementById('display');

function appendValue(value) {
    if (display.value === 'Chyba') display.value = '';
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value === 'Chyba' ? '' : display.value.slice(0, -1);
}

function calculate() {
    if (!display.value || display.value === 'Chyba') return;

    try {
        const result = Function(`return (${display.value.replace(/[^0-9+\-*/().]/g, '')})`)();
        if (Number.isFinite(result)) {
            display.value = Math.round(result * 1e10) / 1e10;
        } else {
            display.value = 'Chyba';
        }
    } catch {
        display.value = 'Chyba';
    }
}

document.addEventListener('keydown', event => {
    const key = event.key;
    if ('0123456789.+-*/'.includes(key)) appendValue(key);
    else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') deleteLast();
    else if (key === 'Escape' || key.toLowerCase() === 'c') clearDisplay();
});