const clearBtn = document.getElementById('clear-btn');
const buildBtn = document.getElementById('grid-create-btn');
const instBtn = document.getElementById('instructions-btn');
const borderBtn = document.getElementById('border-btn');
const colors = document.querySelector('.color-selection');
const rainbowBtn = document.getElementById('rainbow-btn');
const eraseBtn = document.getElementById('erase-btn');
const container = document.getElementById('container');
let pencilColor = 'rgba(0,0,0,1)';
let instCheck = false;
let borderCheck = true;
let clickCheck = false;

let picker = new Picker({
    parent: colors,
    alpha: false,
    editor: false,
});
picker.onDone = function (color) { //generates the color picker
    colors.style.cssText = `background: ${color.rgbString}`;
    pencilColor = color.rgbaString;
    colorGrid();
    
}
function borderManager (gridElement) { //Makes border selection stick
    if (borderCheck) {
        gridElement.style.cssText = 'border: 1px ridge rgba(0, 0, 0, 0.1)';
    }else if (!borderCheck) {
        gridElement.style.cssText = 'border: none';
    }
}
function colorGrid () { //For solid color pencil
    let gridSquare = document.querySelectorAll('.square');
    gridSquare.forEach(gridSquare => {
        let currentShade = 1;
        gridSquare.addEventListener('mouseenter', function(){
            let currentColor = pencilColor.slice(0,-2);
            if (clickCheck) {
                if (currentShade < 9) {
                    gridSquare.style.background = `${currentColor}0.${currentShade})`;
                    currentShade += 2;
                }else if (currentShade == 9) {
                    gridSquare.style.background = `${currentColor}1)`;
                }
            }
        })
    })
}
function createGrid () {
    let inpNum = document.getElementById('grid-dim').value;
    let gridTemp = inpNum * inpNum;
    container.innerHTML = ``;
    if (inpNum < 101) {
        for (i = 0; i < gridTemp; i++) {
            let square = document.createElement('div');
            square.classList.add('square');
            container.appendChild(square);
        
        }

    }
    container.style.gridTemplateRows = `repeat(${inpNum}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${inpNum}, 1fr)`;
    
}
function clearGrid () {
    let gridSquare = document.querySelectorAll('.square');
    gridSquare.forEach(gridSquare => {
        gridSquare.style.background = 'rgba(0,0,0,0)';
        borderManager(gridSquare);
    })
}
function rainbowColor () {
    let gridSquare = document.querySelectorAll('.square');
    gridSquare.forEach(gridSquare => {
        gridSquare.addEventListener('mouseenter', function(){
            let x = Math.floor(Math.random() * 256);
            let y = Math.floor(Math.random() * 256);
            let z = Math.floor(Math.random() * 256);
            if (clickCheck) {
                gridSquare.style.cssText = `background: rgb(${x},${y},${z})`;
            }
        })
    })
}
function eraser () {
    let gridSquare = document.querySelectorAll('.square');
    gridSquare.forEach(gridSquare => {
        gridSquare.addEventListener('mouseenter', function(){
            if (clickCheck) {
                gridSquare.style.background = `rgba(0,0,0,0)`;
                borderManager(gridSquare);
            }
        })
    })
}
function showSelection (selection) {
    let selectedOp = document.querySelectorAll('.selected');
    selectedOp.forEach(selectedOp => {
        selectedOp.classList.remove('selected');
    })
    selection.classList.add('selected');
}
function showInstructions () {
    let logoImg = document.getElementById('logo-container');
    let instructions = document.querySelector('.instructions');
    if (instCheck) {
        logoImg.style.cssText = 'margin-top: -300px';
        instructions.style.cssText = 'opacity: 0';
    }else if (!instCheck) {
        logoImg.style.cssText = 'margin-top: 0px';
        instructions.style.cssText = 'opacity: 1';
    }
    instCheck = !instCheck;
}
function borderToggle () {
    let gridSquare = document.querySelectorAll('.square');
    gridSquare.forEach(gridSquare => {
        if (borderCheck) {
            gridSquare.style.border = 'none';
        }else if (!borderCheck) {
            gridSquare.style.border = '1px ridge rgba(0, 0, 0, 0.1)';
        }
    })
    borderCheck = !borderCheck;
}

//Initial grid
createGrid();
colorGrid();

//Buttons and their functions
clearBtn.addEventListener('click', clearGrid);
buildBtn.addEventListener('click', function(){
    let inpCheck = document.getElementById('grid-dim').value;
    createGrid();
    colorGrid();
    if (inpCheck) {
        showSelection(colors);
    }
});
rainbowBtn.addEventListener('click', function(){
    rainbowColor();
    showSelection(rainbowBtn)
});
eraseBtn.addEventListener('click', function(){
    eraser();
    showSelection(eraseBtn);
});
colors.addEventListener('click', function (){showSelection(colors)});
instBtn.addEventListener('click', showInstructions);
borderBtn.addEventListener('click', borderToggle);
container.addEventListener('mousedown', function(){
    clickCheck = true;
})
container.addEventListener('mouseup', function(){
    clickCheck = false;
})