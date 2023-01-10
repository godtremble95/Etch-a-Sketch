const container = document.querySelector('.container');
const divGrid = [];

for (i = 0; i < 256; i++) {
  divGrid[i] = document.createElement('div');
  container.appendChild(divGrid[i]);
}

divGrid.forEach(pixel => pixel.addEventListener('mouseover', changeColor));

function changeColor() {
  this.style.backgroundColor = 'black';
}