const resizeBtn = document.querySelector('#resize');
const resetBtn = document.querySelector('#reset');
const sizeDisplay = document.querySelector('.currentSize');
const grid = document.querySelector('#grid');
const divGrid = [];
let currentSize;

resizeBtn.addEventListener('click', getDimentions);
resetBtn.addEventListener('click', () => drawGrid(currentSize));

// initialize grid at 16x16
drawGrid();

function drawGrid(count = 16){
  const tempLength = divGrid.length - 1;
  // remove old grid one <div> at a time, working down the array
  for (i = tempLength; i >= 0; i--) {
    grid.removeChild(divGrid[i]);
    divGrid.pop();
  }
  // create <div>s and add to page one at a time
  for (i = 0; i < (count ** 2); i++) {
    divGrid[i] = document.createElement('div');
    divGrid[i].classList = 'unDrawn';
    divGrid[i].style.flexBasis = `${100/count}%`;
    divGrid[i].addEventListener('mouseover', changeColor);
    grid.appendChild(divGrid[i]);
  }
  currentSize = count;
  sizeDisplay.textContent = `${currentSize}x${currentSize}`;
}

function changeColor() {
  this.classList = 'drawn';
}

function getDimentions() {
  let count = Number(prompt("Enter your desired sketch size:\nMax: 100"));
  if (count === 0) return;
  while (isNaN(count) || count > 100) {
    count = Number(prompt("Enter your desired sketch size:\nMax: 100"));
  }
  drawGrid(count);
}