let canvas;
let ctx;
let width;
let height;
let numbers = [];
let running  = false;
let i = 0;
let j = 0;
let algorithm = "BubbleSort";
let nWidth;
let maxNumber = 25;

function sort() {
    console.log(algorithm);
    create();
    render();
}

function create() {
    canvas = document.getElementById('mycanvas');
    ctx = canvas.getContext("2d");
    width = ctx.canvas.clientWidth;
    height = ctx.canvas.clientHeight;
    nWidth = width / maxNumber;  
    init();
}

function init() {
    nWidth = width / maxNumber;  
    i = 0;
    j = 0;
    numbers = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (k = 0; k < maxNumber; k++) {
        let color = "rgb(" + posRand(0,255) + "," + posRand(0,255) +"," + posRand(0,255) + ")";    
        numbers.push({value: posRand(0, width), pos: k * nWidth , color: color});
        numbers[k].pos = k * nWidth;
        draw(numbers[k], nWidth);
    }
}

function render() {
    requestAnimationFrame(render);
    if (running) {
        if (numbers[j].value > numbers[j + 1].value) {
            swap(numbers, j, j + 1)      
        }
        if (i < numbers.length) {
            j++
            if (j >= numbers.length - i - 1) {
                j = 0
                i++
            }            
        } else {
            running = false;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        for (k = 0; k < numbers.length; k++) {
            numbers[k].pos = k * nWidth;
            draw(numbers[k], nWidth);
        }
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

function start(){
    running = true;
}

function stop(){
    running = false
}

document.addEventListener("change", function(e) {
    var rangeValue = document.getElementById("numbersRange").value;
    var output = document.getElementById("lblRangeValue");
    maxNumber = rangeValue;
    output.innerHTM = rangeValue;
    init() 
    start() 
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        //console.log(algorithm +" started...");
        //start()
    } else if (event.key === 'ArrowDown') {
        //console.log(algorithm + " stopped...");
        //stop()      
    } else if (event.key === 'ArrowLeft') {
        //console.log(algorithm + " restarted...");
        //init()      
    } else if (event.key === 'ArrowRight') {
        //console.log(algorithm + " restarted...");
        //init()      
    }
 });