const clearBtn = document.getElementById('clear-btn');
let inpNum = document.getElementById('grid-dim').value;
const buildBtn = document.getElementById('grid-create-btn');
const instBtn = document.getElementById('instructions-btn');
const darkBtn = document.getElementById('dark-mode-btn');
const colors = document.querySelector('.color-selection');
const rainbowbtn = document.getElementById('rainbow-btn');
const eraseBtn = document.getElementById('erase-btn');

let picker = new Picker(colors);
picker.onDone = function (color) {
    colors.style.cssText = `background: ${color.rgbaString}`;
}
