const resize = document.querySelector('#resize-btn');
let sizeInput = document.querySelector('#sizeInput');
let currentGridSize = 16;

resize.addEventListener('click', (e) => {
    let newSize = sizeInput.value;
  if(currentGridSize != newSize && (newSize >= 1 && newSize <= 100)){
    currentGridSize = newSize;
    createGrid(newSize);
  }
})

sizeInput.addEventListener('keydown', (e) => {
    let newSize = sizeInput.value;
    if (e.key === 'Enter' && (newSize >= 1 && newSize <= 100)) {
        currentGridSize = newSize;
        createGrid(newSize);
    }
})

const clear = document.querySelector('#clear-btn');
clear.addEventListener('click', (e) => {
    const parent = document.querySelector('#container');
    squares = parent.querySelectorAll('div')
    squares.forEach((square) => {
        square.style.backgroundColor = 'transparent';
    })
})

let isSketching = false;
let isEraserOn = false;
window.addEventListener('mousedown', (e) => {
    isSketching = true;
});

window.addEventListener('mouseup', (e) => {
    isSketching = false;
});

window.addEventListener('mouseleave', () => {
    isDrawing = false;
});

const randomColorCB = document.querySelector('#randomColor');
const colorSelected = document.querySelector('#colorPicker');

randomColorCB.addEventListener('change', () => {
    if (randomColorCB.checked) {
        colorSelected.disabled = true;
    } else {
        colorSelected.disabled = false;
    }
});

let colorToUse;

function createGrid(n) {
    const parent = document.querySelector("#container");
    parent.innerHTML = "";
    for (let i = 1; i <= n * n; i++) {
        const squares = document.createElement('div');
        squares.style.height = (960 / n) + "px";
        squares.style.width = (960 / n) + "px";
        squares.style.border = '1px solid black';
        squares.dataset.darkness = 0;
        parent.appendChild(squares);
        squares.setAttribute('draggable', false);
        squares.addEventListener('mouseover', (e) => {

            if (randomColorCB.checked) {
                const r = Math.floor(Math.random() * 256);
                const b = Math.floor(Math.random() * 256);
                const g = Math.floor(Math.random() * 256);

                colorToUse = `rgb(${r}, ${g}, ${b})`;
            } else {
                colorToUse = colorSelected.value;
            }

            if (isSketching) {
                if (isEraserOn) {
                    e.target.style.backgroundColor = 'transparent';
                }
                else {
                    e.target.style.backgroundColor = colorToUse;
                }
            }
        });

        squares.addEventListener('mousedown', (e) => {
            if (isEraserOn) {
                e.target.style.backgroundColor = 'transparent';
            } else {
                e.target.style.backgroundColor = colorToUse;
            };
        });
    }
}

const eraser = document.querySelector('#eraser-btn');
eraser.addEventListener('click', (e) => {

    isEraserOn = !isEraserOn;

    if (isEraserOn) {
        e.target.style.backgroundColor = 'yellow';
        e.target.style.color = 'red';
    } else {
        e.target.style.backgroundColor = 'white';
        e.target.style.color = '#000000';
    }
});

createGrid(16);