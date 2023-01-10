const resizeBtn = document.querySelector('button');
const container = document.querySelector('.container');
const divGrid = [];

resizeBtn.addEventListener('click', getDimentions);

// initialize grid at 16x16
drawGrid(16);

function drawGrid(count){
  const tempLength = divGrid.length - 1;
  // remove old grid one <div> at a time, working down the array
  for (i = tempLength; i >= 0; i--) {
    container.removeChild(divGrid[i]);
    divGrid.pop();
  }
  // create <div>s and add to page one at a time
  for (i = 0; i < (count ** 2); i++) {
    divGrid[i] = document.createElement('div');
    divGrid[i].classList = 'unDrawn';
    divGrid[i].style.flexBasis = `${100/count}%`;
    divGrid[i].addEventListener('mouseover', changeColor);
    container.appendChild(divGrid[i]);
  }
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