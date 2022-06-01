window.onload = () => {
    newGrid(12);
}

const hexValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
const sizeSlider = document.getElementById('size-slider');
const sizeLabel = document.getElementById('size-label');
const grid = document.getElementById('sketch-grid');
const colorPicker = document.getElementById('color-picker');
const clickRadio = document.getElementById('click');
const hoverRadio = document.getElementById('hover');
const userRadio = document.getElementById('random-colors');
const randomRadio = document.getElementById('user-colors');
const clearBtn = document.getElementById('clear-btn');

let currentSize = 12;
let colorMode = 'user';
let currentColor = "#000000";
let currentMode = 'click';
let gridMouseDown = false;
let drawOnClick = true;
let drawOnHover = false;

grid.onmousedown = () => (gridMouseDown = true);
grid.onmouseup = () => (gridMouseDown = false);
grid.ontouchstart = () => (gridMouseDown = true);
grid.ontouchend = () => (gridMouseDown = false);
sizeSlider.onmousemove = (e) => updateSizeSliderLabel(e.target.value);
sizeSlider.onchange = (e) => updateGridSize(e.target.value);
colorPicker.oninput = (e) => (currentColor = e.target.value);
clickRadio.onclick = () => updateCurrentMode('click');
hoverRadio.onclick = () => updateCurrentMode('hover');
randomRadio.onclick = () => updateColorMode('random');
userRadio.onclick = () => updateColorMode('user');
clearBtn.onclick = () => (newGrid(currentSize))

function updateColorMode(mode) {
    if (mode === 'user') {
        colorMode = 'random';
        let randomHex = "#";
        for (let i = 0; i < 6; i++) {
            randomHex += hexValues[Math.floor(Math.random() * hexValues.length)];
        }
        currentColor = randomHex;
        colorPicker.value = currentColor;
    } else if (mode === 'random') {
        colorMode = 'user';
    }
}

function updateCurrentMode(mode) {
    currentMode = mode;
    if (currentMode === 'click') {
        drawOnClick = true;
        drawOnHover = false;
    } else if (currentMode === 'hover') {
        drawOnHover = true;
        drawOnClick = false;
    }
}

function updateSizeSliderLabel(newDimension) {
    sizeLabel.textContent = `Pixels: ${newDimension} x ${newDimension}`
}

function updateGridSize(newDimension) {
    updateSizeSliderLabel(newDimension);
    currentSize = newDimension;
    newGrid(newDimension);
}

function newGrid(newDimension) {
    grid.innerHTML = '';
    createGridDom(newDimension);
}

function createGridDom(newDimension) {
    grid.style.gridTemplateColumns = `repeat(${newDimension}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${newDimension}, 1fr)`;

    for (let i = 0; i < (newDimension * newDimension); i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square');
        gridSquare.addEventListener('mouseover', setSquareColor);
        gridSquare.addEventListener('mousedown', setSquareColor);
        gridSquare.addEventListener('touchstart', setSquareColor);
        gridSquare.addEventListener('touchmove', setSquareColor);
        grid.appendChild(gridSquare);
    }
}

function setSquareColor(e) {
    const touchOrMouseDown = (e.type == 'mousedown' || e.type == 'touchstart') ? true : false;
    const touchMoveOrMouseOver = (e.type == 'mouseover' || e.type == 'touchmove') ? true : false;

    if ((touchOrMouseDown && drawOnHover) || (touchMoveOrMouseOver && drawOnClick && !gridMouseDown)) return;
    let target = e.target;
    if (e.type == 'touchmove') {
        let elementTouchMoveOver = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
        if (elementTouchMoveOver.classList.contains('grid-square')) {
            target = elementTouchMoveOver;
        }
    }
    if (colorMode === 'user') {
        target.style.backgroundColor = currentColor;
    } else if (colorMode === 'random') {
        let randomHex = "#";
        for (let i = 0; i < 6; i++) {
            randomHex += hexValues[Math.floor(Math.random() * hexValues.length)];
        }

        currentColor = randomHex;
        colorPicker.value = currentColor;
        target.style.backgroundColor = currentColor;
    }
}


