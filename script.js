let sizeBtn = document.getElementById('size-btn');
let clrBtn = document.getElementById('clr-btn');
let eraserBtn = document.getElementById('eraser-btn');
let gridSize = 12;
let boxWidth = 100 / gridSize;
console.log(boxWidth);

const gridContainer = document.querySelector('.grid');
gridContainer.style.backgroundColor = '#FFFFFF';

gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < gridSize ** 2; i++){
        const div = document.createElement('div');
        div.style.outline = '1px solid';
        div.setAttribute('class', 'grid-item');
        div.setAttribute('draggable', false);
        gridContainer.appendChild(div);
    }

let gridItems = document.querySelectorAll('.grid-item');
let penColor = '#000000';
// gridItems.forEach(e => {
//     e.style.backgroundColor = '#FFFFFF';
// });

gridItems.forEach(e => {
    e.addEventListener('mouseenter', () => {
        console.log(e);
        e.style.backgroundColor = penColor;
    })
})

clrBtn.addEventListener('click', () => {
    gridItems.forEach(e => {
        e.style.backgroundColor = '#FFFFFF';
    })
});

sizeBtn.addEventListener('click', ()=>{
    gridSize = parseInt(window.prompt("Enter a grid size!", ""));
    gridItems.forEach(e => {
        gridContainer.removeChild(e);
    })
    createGrid(gridSize);
})

eraserBtn.addEventListener('click', () => penColor = '#FFFFFF');

function rangeSlide(value) {
    document.getElementById('slideOutput').innerHTML = value;
}