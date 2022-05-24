const array = [];
let animations = []
const chartEl = document.getElementById("chart-el");
const genBtn = document.getElementById("generate-btn");
const bubbleBtn = document.getElementById("bubble-btn");
const mergeBtn = document.getElementById("merge-btn");
const quickSortBtn = document.getElementById("quicksort-btn");
const insertBtn = document.getElementById("insert-btn");

let barHeight = 6;
let chartSize = self.innerHeight/6.3 - 43;
let ANIMATION_SPEED_MS = 25;
const PRIMARY_COLOR = '#41CAD9';
const SECONDARY_COLOR = 'red';

let slider = document.getElementById("slider");
let speedOut = document.getElementById("speed");
speedOut.textContent = "less slow";
slider.oninput = function(){
  if (this.value == 1){
    speedOut.textContent = "definitely slow";
    ANIMATION_SPEED_MS = 250;
  } else if (this.value == 2){
    speedOut.textContent = "less slow";
    ANIMATION_SPEED_MS = 25;
  } else {
    speedOut.textContent = "almost not slow"
    ANIMATION_SPEED_MS = 2;
  }
}

let slider2 = document.getElementById("slider2");
let sizeOut = document.getElementById("size");
sizeOut.textContent = "more or less";
slider2.oninput = function(){
  if (this.value == 1){
    sizeOut.textContent = "more of less";
    barHeight = 10
    chartSize = self.innerHeight/8.5 - 43;
    render();
  } else if (this.value == 2){
    sizeOut.textContent = "more or less";
    barHeight = 6
    chartSize = self.innerHeight/6.3 - 43;
    render();
  } else {
    sizeOut.textContent = "more more"
    barHeight = 3
    chartSize = self.innerHeight/4.1 - 43;
    render();
  }
}


genBtn.addEventListener("click", function(){
  // location.reload();
  render();
  undisableBtn();
})

bubbleBtn.addEventListener("click", function(){
  bubbleSort();
})

mergeBtn.addEventListener("click", function(){
  mergeSort();
})

quickSortBtn.addEventListener("click", function(){
  quickSort();
})

insertBtn.addEventListener("click", function(){
  insertionSort();
})


function render(){
  array.length = 0;
  animations.length = 0;
  let bars = "";
  for (let i = 0; i < chartSize; i++) {
    widthSize = randomNumber(5, self.innerWidth - 50);
    bars += `
        <div 
            class="line-el" style=" margin-right = auto;
            margin-top: 1px;
            width: ${widthSize}px;
            height: ${barHeight}px;
            background-color: ${PRIMARY_COLOR};
            border-radius: 2px;">
        </div>`
        
    array[i] = widthSize;
  }
  chartEl.innerHTML = bars;
}

function turnGreen(){
  for (let i = 0; i < chartSize; i++) {
    const arrayBars = document.getElementsByClassName('line-el');
    const barStyle = arrayBars[i].style;
    barStyle.backgroundColor = "green";
  }
  // undisableBtn();
}

function disableBtn(){
  bubbleBtn.style.backgroundColor = "black";
  mergeBtn.style.backgroundColor = "black";
  quickSortBtn.style.backgroundColor = "black";
  insertBtn.style.backgroundColor = "black";

  bubbleBtn.style.cursor = "context-menu";
  mergeBtn.style.cursor = "context-menu";
  quickSortBtn.style.cursor = "context-menu";
  insertBtn.style.cursor = "context-menu";

  bubbleBtn.disabled = true;
  mergeBtn.disabled = true;
  quickSortBtn.disabled = true;
  insertBtn.disabled = true;
  slider.disabled = true;
  slider2.disabled = true;
}

function undisableBtn(){
  bubbleBtn.style.backgroundColor = "#D98C5B";
  mergeBtn.style.backgroundColor = "#D98C5B";
  quickSortBtn.style.backgroundColor = "#D98C5B";
  insertBtn.style.backgroundColor = "#D98C5B";

  bubbleBtn.style.cursor = "pointer";
  mergeBtn.style.cursor = "pointer";
  quickSortBtn.style.cursor = "pointer";
  insertBtn.style.cursor = "pointer";

  bubbleBtn.disabled = false;
  mergeBtn.disabled = false;
  quickSortBtn.disabled = false;
  insertBtn.disabled = false;
  slider.disabled = false;
  slider2.disabled = false;
}


function randomNumber(min, max){ 
  return Math.floor(Math.random() * (max - min + 1) + min);
}


function bubbleSort(){
  disableBtn();
  animations = getBubbleSortAnimation(array);

  for (let i = 0; i < animations.length; i++) {
    let p = 2;
    if (i === 0 || i === 1) p = 0;
    const arrayBars = document.getElementsByClassName('line-el');
    
    const [barOneIdx, barTwoIdx] = animations[i];
    const barOneStyle = arrayBars[barOneIdx].style;
    const barTwoStyle = arrayBars[barTwoIdx].style;

    const [preOneIdx, preTwoIdx] = animations[i-p];
    const preOneStyle = arrayBars[preOneIdx].style;
    const preTwoStyle = arrayBars[preTwoIdx].style;
    
    const isColorChange = i % 2 !== 1;
    if (isColorChange) {
    const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
    
        setTimeout(() => {
          preOneStyle.backgroundColor = PRIMARY_COLOR;
          preTwoStyle.backgroundColor = PRIMARY_COLOR;
            
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;

          }, i * ANIMATION_SPEED_MS);
    } else {
        setTimeout(() => {
          let temp = barOneStyle.width;
          barOneStyle.width = barTwoStyle.width;
          barTwoStyle.width = temp;

          if (i === animations.length - 1) turnGreen();

        }, i * ANIMATION_SPEED_MS);
    }
  }
}

function getBubbleSortAnimation(arr){
  const animations = [];
  let i, j;
  let len = arr.length;
  let isSwapped = false;
    
  for(i =0; i < len; i++){
    isSwapped = false;
    for(j = 0; j < len; j++){
      if(arr[j] > arr[j + 1]){
        let temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;

        animations.push([j, j+1]);
        animations.push([j, j+1]);

        isSwapped = true;
      }
    }
    if(!isSwapped) break;
  }
  return animations
}


function quickSort(){
  disableBtn();
  animations = getQuickSortAnimations(array);
  for (let i = 0; i < animations.length; i++) {
    let p = 1;
    if (i === 0) p = 0;

    const arrayBars = document.getElementsByClassName('line-el');
    
    const [barOneIdx, barTwoIdx, pivIdx] = animations[i];
    const barOneStyle = arrayBars[barOneIdx].style;
    const barTwoStyle = arrayBars[barTwoIdx].style;
    const pivStyle = arrayBars[pivIdx].style;

    const [preOneIdx, preTwoIdx, prepivIdx] = animations[i-p];
    const preOneStyle = arrayBars[preOneIdx].style;
    const preTwoStyle = arrayBars[preTwoIdx].style;
    const prepivStyle = arrayBars[prepivIdx].style;

    const isColorChange = i % 2 !== 1;
    if (isColorChange) {
      const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
      const pivColor = i % 2 === 0 ? "green" : PRIMARY_COLOR;
      setTimeout (() => {
        preOneStyle.backgroundColor = PRIMARY_COLOR;
        preTwoStyle.backgroundColor = PRIMARY_COLOR;
        prepivStyle.backgroundColor = PRIMARY_COLOR;

        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
        pivStyle.backgroundColor = pivColor;

      }, i * ANIMATION_SPEED_MS);
    } else {
      setTimeout (() => {
        let temp = barOneStyle.width;
        barOneStyle.width = barTwoStyle.width;
        barTwoStyle.width = temp;

        if (i === animations.length - 1) turnGreen();

      }, i * ANIMATION_SPEED_MS);
    }
  }
}

function partition(arr, start, end, animations){
  const pivotValue = arr[end];
  let pivotIndex = start; 
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];

      animations.push([i, pivotIndex, end]);
      animations.push([i, pivotIndex, end]);

      pivotIndex++;
    }
  }
  [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];

  animations.push([pivotIndex, end, end]);
  animations.push([pivotIndex, end, end]);

  return pivotIndex;
};

function getQuickSortAnimations(arr){
  const animations = [];
  quickSortHelper(arr, 0, arr.length - 1, animations);
  return animations;
}

function quickSortHelper(arr, start, end, animations){
  if (start >= end) return;

  let index = partition(arr, start, end, animations);

  quickSortHelper(arr, start, index - 1, animations);
  quickSortHelper(arr, index + 1, end, animations);
}


function mergeSort(){
  disableBtn();
  animations = getMergeSortAnimations(array);
  for (let i = 0; i < animations.length; i++) {
    let p = 2;
    if (i === 0 || i === 1) p = 0;
    const arrayBars = document.getElementsByClassName('line-el');
    const isColorChange = i % 2 !== 1;
    if (isColorChange){
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;

      const [preOneIdx, preTwoIdx] = animations[i-p];
      const preOneStyle = arrayBars[preOneIdx].style;
      const preTwoStyle = arrayBars[preTwoIdx].style;

      const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
      setTimeout(() => {

        preOneStyle.backgroundColor = PRIMARY_COLOR;
        preTwoStyle.backgroundColor = PRIMARY_COLOR;

        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;

      }, i * ANIMATION_SPEED_MS);
    } else {
      const [barOneIdx, newWidth] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      setTimeout(() => {
        barOneStyle.width = `${newWidth}px`;

        if (i === animations.length - 1) turnGreen();

      }, i * ANIMATION_SPEED_MS);
    }
  }
}

function getMergeSortAnimations(array){
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([k, j]);

    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);

      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);

      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([k, i]);
    animations.push([k, auxiliaryArray[i]]);

    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([k, j]);
    animations.push([k, auxiliaryArray[j]]);

    mainArray[k++] = auxiliaryArray[j++];
  }
}


function insertionSort(){
  disableBtn();
  animations = getInsertionSortAnimations(array);
  for (let i = 0; i < animations.length; i++) {
    let p = 2;
    if (i === 0 || i === 1) p = 0;
    const arrayBars = document.getElementsByClassName('line-el');
    const isColorChange = i % 2 !== 1;
    if (isColorChange){
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;

      const [preOneIdx, preTwoIdx] = animations[i-p];
      const preOneStyle = arrayBars[preOneIdx].style;
      const preTwoStyle = arrayBars[preTwoIdx].style;

      const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
      setTimeout(() => {

        preOneStyle.backgroundColor = PRIMARY_COLOR;
        preTwoStyle.backgroundColor = PRIMARY_COLOR;

        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = "green";

      }, i * ANIMATION_SPEED_MS);
    } else {
      const [barOneIdx, newWidth] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      setTimeout(() => {
        barOneStyle.width = `${newWidth}px`;

        if (i === animations.length - 1) turnGreen();

      }, i * ANIMATION_SPEED_MS);
    }
  }
}

function getInsertionSortAnimations(arr){
  const animations = []
  let i, key, j; 
  let n = arr.length;
  for (i = 1; i < n; i++){ 
    key = arr[i]; 
    j = i - 1; 
    
    while (j >= 0 && arr[j] > key){ 
      animations.push([j+1, i]);
      animations.push([j+1, arr[j]]);

      arr[j + 1] = arr[j]; 
      j = j - 1; 
    }
    animations.push([j+1, i]);
    animations.push([j+1, key]);

    arr[j + 1] = key;
  }
  return animations;
}