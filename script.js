const resizeBtn = document.querySelector('#resize');
const resetBtn = document.querySelector('#reset');
const optionBtns = document.querySelectorAll('.options');
const eraseBtn = document.querySelector('#eraser');
const rainbowBtn = document.querySelector('#rainbow');
const inputColor = document.querySelector('#inputColor');
const inputSize = document.querySelector('#inputSize');
const sizeDisplay = document.querySelector('.currentSize');
const grid = document.querySelector('#grid');
const divGrid = [];
let currentSize;

optionBtns.forEach(btn => {
  btn.addEventListener('click', toggleSelected);
});
resizeBtn.addEventListener('click', openSizeInput);
resetBtn.addEventListener('click', () => drawGrid(currentSize));
//optionBtns.addEventListener('click', toggleSelected);
//eraseBtn.addEventListener('click', toggleSelected);
//rainbowBtn.addEventListener('click', toggleSelected);
inputSize.addEventListener('keyup', (event) => {
  event.preventDefault();
  switch (event.key) {
    case 'Enter':
      getDimentions();
      break;
    case 'Escape':
      inputSize.blur();
      break;
  }
});

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
    divGrid[i].addEventListener('mouseleave', changeColor);
    grid.appendChild(divGrid[i]);
  }
  currentSize = count;
  sizeDisplay.textContent = `${currentSize}x${currentSize}`;
  inputSize.placeholder = `${currentSize}`;
}

function changeColor() {
  if (eraseBtn.dataset.selected === 'true') {
    this.classList= 'unDrawn';
    this.style.backgroundColor = '';
    return;
  }
  this.classList = 'drawn';
  this.style.backgroundColor = (rainbowBtn.dataset.selected === 'true')?
    getRandColor() :
    inputColor.value;
}

function getRandColor() {
  const rgb = [];
  for (i = 0; i < 3; i ++) {
    rgb[i] = Math.floor(Math.random() * 256)
  }
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

function getDimentions() {
  let dim = Number(inputSize.value);
  if (dim <= Number(inputSize.min) || dim > Number(inputSize.max)) return;
  else {
    drawGrid(dim);
    inputSize.blur();
    inputSize.value = '';
  }
}

function toggleSizeInput() {
  (inputSize.dataset.state === 'closed' || inputSize.dataset.state === '') ?
    openSizeInput() : closeSizeInput();
}

function openSizeInput() {
  inputSize.dataset.state = 'opened';
    resizeBtn.dataset.state = 'closing';
    

    resizeBtn.addEventListener('animationend', () => {
      resizeBtn.dataset.state = 'closed';
      inputSize.focus();
      inputSize.addEventListener('blur', () => {
        closeSizeInput();
      }, {once: true});
    }, {once: true});
}

function closeSizeInput() {
  inputSize.dataset.state = 'closing';
  resizeBtn.dataset.state = 'opened';

  inputSize.addEventListener('animationend', () => {
    inputSize.dataset.state = 'closed'
  }, {once: true});
}

function toggleSelected() {
  if (this.dataset.selected === 'false') {
    this.dataset.selected = 'true';
    optionBtns.forEach(btn => {
      if (btn !== this) {
        btn.dataset.selected = 'false';
      }
    });
  }
  else {
    this.dataset.selected = 'false';
    inputColor.dataset.selected = 'true';
  }
}