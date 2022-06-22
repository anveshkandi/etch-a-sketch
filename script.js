const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#000000';

const gridContainer = document.querySelector('.grid');
const gridSizeOutput = document.querySelectorAll('.slideOutput');
const colorPreview = document.querySelector('.color-preview');

let sizeBtn = document.getElementById('size-btn');
let clrBtn = document.getElementById('clr-btn');
let eraserBtn = document.getElementById('eraser-btn');
let greyBtn = document.getElementById('grey-btn');
let rainbowBtn = document.getElementById('rand-btn');
let colorInput = document.getElementById('color-input');
let gridSize = DEFAULT_SIZE;
let penColor = DEFAULT_COLOR;
let mousedown = false;
let rainbowMode = false;
let greyscaleMode = false;


//Tracking mouse down and up functions to allow dragging
document.body.onmousedown = function(){
    mousedown = true;
}
document.body.onmouseup = function(){
    mousedown = false;
}

//Generates the canvas at the specified size
function createGrid(gridSize){
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < gridSize ** 2; i++){
        const div = document.createElement('div');
        div.style.outline = '1px solid';
        div.classList.add('grid-item');
        div.setAttribute('draggable', false);
        div.addEventListener('mouseover', changeColor);
        div.addEventListener('mousedown', changeColor);
        gridContainer.appendChild(div);
        div.style.backgroundColor = '#FFFFFF'; //To avoid creating a double border
    }
}

//Handles the coloring of each grid item
function changeColor(e){
    if (e.type === 'mouseover' && !mousedown) return;
    //Darkens the cell every time it is colored
    if(greyscaleMode){
        //Retrieving target rgb to darken it
        color = e.target.style.getPropertyValue("background-color");
        color = color.substring(color.indexOf('(')+1, color.indexOf(')'));
        rgbColors = color.split(',', 3);

        //About a 10% darken at this factor
        let r = Math.floor(rgbColors[0]*0.6);
        let b = Math.floor(rgbColors[1]*0.6);
        let g = Math.floor(rgbColors[2]*0.6);

        e.target.style.backgroundColor = 'rgb(' + [r,b,g].join(',')+ ')';
    }
    //Fills the cell with a random color when it is hovered
    else if(rainbowMode){
        let r = Math.floor(Math.random()*255);
        let b = Math.floor(Math.random()*255);
        let g = Math.floor(Math.random()*255);

        e.target.style.backgroundColor = 'rgb(' + [r,b,g].join(',')+ ')';
    }
    //Fills the cell with a user selected color
    else {
        e.target.style.backgroundColor = penColor;
    }
}

//Clears the canvas of all colors
function clearGrid(){
    penColor = colorInput.value;
    let gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(e => {
        e.style.backgroundColor = '#FFFFFF';
    })
}

//Clears div elements inside grid container so new grid can be drawn
function eraseGrid(){
    gridContainer.innerHTML = '';
}


//Changes the grid size when user inputs a new size value
function changeGrid(gridSize){
    eraseGrid();
    gridSizeOutput.forEach(e => e.textContent = gridSize);
    createGrid(gridSize);
}

//Clears the grid and returns to a clear white canvas
clrBtn.addEventListener('click', clearGrid);

//Changes the grid size and loads a new one with the updated grid size
sizeBtn.addEventListener('click', ()=>{
    gridSize = parseInt(window.prompt("Enter a grid size!", ""));
    changeGrid(gridSize);
})

//Enables and disables greyscale mode on button click
greyBtn.addEventListener('click', ()=>{
    if(greyscaleMode === false){
        rainbowMode = false; //Toggles other modes off so multiple are not active at once
        greyscaleMode = true;
        return;
    }
    else {
        greyscaleMode = false;
        return;
    }
})

//Enables and disables rainbow mode on button click
rainbowBtn.addEventListener('click', ()=>{
    if(rainbowMode === false){
        greyscaleMode = false; //Toggles other modes off so multiple are not active at once
        rainbowMode = true;
        return;
    }
    else {
        rainbowMode = false;
        return;
    }
})

//Testing will update in the near future
eraserBtn.addEventListener('click', () => {
    penColor = '#FFFFFF'
    greyscaleMode = false; //Toggles other modes off
    rainbowMode = false;
});

//Returns to color mode when color preview is clicked
colorPreview.addEventListener('click', () => {
    greyscaleMode = false;
    rainbowMode = false;
})

//Changes pen color and color preview when user chooses new input
colorInput.addEventListener('change', () => {
    penColor = colorInput.value;
    colorPreview.style.backgroundColor = colorInput.value;
})

//Generating default grid on window load
window.onload = () => {
    createGrid(DEFAULT_SIZE);
}
