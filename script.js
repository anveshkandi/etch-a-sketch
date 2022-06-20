const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#000000';

let sizeBtn = document.getElementById('size-btn');
let clrBtn = document.getElementById('clr-btn');
let eraserBtn = document.getElementById('eraser-btn');
let colorBtn = document.getElementById('color-btn');
let gridSize = DEFAULT_SIZE;
let penColor = DEFAULT_COLOR;

const gridContainer = document.querySelector('.grid');

function createGrid(gridSize){
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < gridSize ** 2; i++){
        const div = document.createElement('div');
        div.style.outline = '1px solid';
        div.classList.add('grid-item');
        div.setAttribute('draggable', false);
        div.addEventListener('mouseover', changeColor);
        gridContainer.appendChild(div);
        div.style.backgroundColor = '#FFFFFF'; //To avoid creating a double border
    }
}


//Handles the coloring of each grid item
function changeColor(e){
    e.target.style.backgroundColor = penColor;
}

function clearGrid(){
    let gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(e => {
        e.style.backgroundColor = '#FFFFFF';
    })
}

function eraseGrid(){
    gridContainer.innerHTML = '';
}

function changeGrid(gridSize){
    eraseGrid();
    createGrid(gridSize);
}

//Clears the grid and returns to a clear white canvas
clrBtn.addEventListener('click', clearGrid);

//Changes the grid size and loads a new one with the updated grid size
sizeBtn.addEventListener('click', ()=>{
    gridSize = parseInt(window.prompt("Enter a grid size!", ""));
    changeGrid(gridSize);
})


//Testing will update in the near future
eraserBtn.addEventListener('click', () => penColor = '#FFFFFF');
colorBtn.addEventListener('click', () => penColor = '#000000');

window.onload = () => {
    createGrid(DEFAULT_SIZE);
}
