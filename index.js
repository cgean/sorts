let canvas;
let ctx;
let width;
let height;
let numbers = [];
let i = 0;
let j = 0;
let min = 0;
let nWidth;
let maxNumber = 0;
//TEST
let idAnimBubbleSort;
let idAnimSelectionSort;

function sort() {  
    changeMaxNumbers();
    create();
    cancelAnimationFrame(idAnimBubbleSort);
    cancelAnimationFrame(idAnimSelectionSort);
    if (document.getElementById('selectionsort').checked) {
        console.log("SelectionSort");
        init(0, 1);
        renderSelectionSort();
    } else if (document.getElementById('bubblesort').checked) {
        console.log("BubbleSort");
        init(0, 0);        
        renderBubbleSort();
    }
}

function changeMaxNumbers(){
    var rangeValue = document.getElementById("numbersRange").value;
    var output = document.getElementById("lblRangeValue");
    maxNumber = rangeValue;
    output.innerHTM = rangeValue;
}

function create() {
    canvas = document.getElementById('mycanvas');
    ctx = canvas.getContext("2d");
    width = ctx.canvas.clientWidth;
    height = ctx.canvas.clientHeight;
    nWidth = width / maxNumber; 
}

function init(iniI, iniJ) {    
    i = iniI;
    j = iniJ;
    min = 0;
    nWidth = width / maxNumber;  
    numbers = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (k = 0; k < maxNumber; k++) {
        let color = "rgb(" + posRand(0,255) + "," + posRand(0,255) +"," + posRand(0,255) + ")";    
        numbers.push({value: posRand(0, width), pos: k * nWidth , color: color});
        numbers[k].pos = k * nWidth;
        draw(numbers[k], nWidth);
    }
}

function renderBubbleSort() {
    idAnimBubbleSort = requestAnimationFrame(renderBubbleSort);
    if (i < numbers.length) {
        if (numbers[j].value > numbers[j + 1].value) {
            swap(numbers, j, j + 1);
        }
        j++;
        if (j >= numbers.length - i - 1) {
            j = 0;
            i++;
        }
    } else {
        cancelAnimationFrame(idAnimBubbleSort);
    }
    drawArray();
}

function renderSelectionSort() {
    idAnimSelectionSort = requestAnimationFrame(renderSelectionSort);    
    if (i < numbers.length - 1) {
        min = i;
        if (j < numbers.length) {
            if (numbers[j].value < numbers[min].value) {
                min = j;
            }
            j++;
        }
        if (numbers[i] != numbers[min]) {
            swap(numbers, i, min);
        }       
        if (j >= numbers.length) {                   
            i++;
            min = i;
            j = i + 1;
        }
    } else {
        cancelAnimationFrame(idAnimSelectionSort);
    }
    drawArray();
}

function drawArray(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (k = 0; k < numbers.length; k++) {
        numbers[k].pos = k * nWidth;
        draw(numbers[k], nWidth);
    }
}

function swap(numbers, a, b) {
    var temp = numbers[a];
    numbers[a] = numbers[b];
    numbers[b] = temp;
}

function draw(n, nWidth) {
    var nHeight = n.value;
    var c = narmalization255(n.value);
    var color = "rgb(" + 130 +  "," + 20 + "," + c  + ")";     
    var nY = height - n.value;
    ctx.beginPath();
    ctx.rect(n.pos, nY, nWidth, nHeight);
    ctx.lineWidth = 3;
    ctx.fillStyle = color;
    ctx.fill();
}

function narmalization255(value){
    min = 0
    max = width
    a = 130
    b = 230
    return (b - a) * (value - min) / (max - min) + a;
}

function posRand(min, max) {
    return Math.random() * (max - min) + min;
}

document.addEventListener("change", function(e) {
   sort();
});
