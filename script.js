const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;
let color = 'black'; // Default color
let eraseMode = false;
let eraserSize = 10; // Default eraser size

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

document.getElementById('color1').addEventListener('click', () => setColor('red'));
document.getElementById('color2').addEventListener('click', () => setColor('blue'));
document.getElementById('color3').addEventListener('click', () => setColor('green'));
document.getElementById('color4').addEventListener('click', () => setColor('yellow'));
document.getElementById('color5').addEventListener('click', () => setColor('purple'));

document.getElementById('erase').addEventListener('click', toggleEraseMode);
document.getElementById('eraserSmall').addEventListener('click', () => setEraserSize(10)); // Small eraser
document.getElementById('eraserLarge').addEventListener('click', () => setEraserSize(20)); // Large eraser

function startDrawing(event) {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

function draw(event) {
    if (isDrawing) {
        if (eraseMode) {
            ctx.clearRect(event.offsetX - eraserSize / 2, event.offsetY - eraserSize / 2, eraserSize, eraserSize); // Erase based on selected size
        } else {
            ctx.strokeStyle = color;
            ctx.lineWidth = 5;
            ctx.lineTo(event.offsetX, event.offsetY);
            ctx.stroke();
        }
    }
}

function stopDrawing() {
    if (isDrawing) {
        ctx.closePath();
        isDrawing = false;
    }
}

function setColor(newColor) {
    color = newColor;
}

function toggleEraseMode() {
    eraseMode = !eraseMode;
    const eraseButton = document.getElementById('erase');
    if (eraseMode) {
        eraseButton.style.backgroundColor = '#e53e3e';
        eraseButton.textContent = 'Stop Erase';
    } else {
        eraseButton.style.backgroundColor = '#ff6347';
        eraseButton.textContent = 'Erase';
    }
}

function setEraserSize(size) {
    eraserSize = size;
    // Update UI to reflect the selected eraser size
    const eraserButton = document.getElementById(eraserSize === 10 ? 'eraserSmall' : 'eraserLarge');
    eraserButton.style.backgroundColor = '#bbb';
}
