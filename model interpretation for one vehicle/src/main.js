var GENETIC = 0;
var GREEDY = 1;
var FLS = 2;
var DP = 3;
var BNB = 4;
var GREEDY_FLS = 5;
var BNBHK = 6;

var currentAlgorithm = GREEDY;

var canvas, ctx;
var WIDTH, HEIGHT;
var points = [];
var best = [];
var running;
var canvasMinX, canvasMinY;
var doPreciseMutate;

var POPULATION_SIZE;
var ELITE_RATE;
var CROSSOVER_PROBABILITY;
var MUTATION_PROBABILITY;
var OX_CROSSOVER_RATE;
var UNCHANGED_GENS;

var mutationTimes;
var dis;
var bestValue;
var currentGeneration;
var currentBest;
var population;
var values;
var fitnessValues;
var roulette;

$(function() {
  init();
  initData();
  //points = data200;
  addRandomPoints(10);
  $('#addRandom_btn').click(function() {
    var num = $('#cbo_num').val();
    addRandomPoints(num);
    $('#status').text("");
    running = false;
  });
  $('#start_btn').click(function() { 
    if(points.length >= 3) {
      initData();
      currentAlgorithm = $('#cbo_algorithm').val(); 
      if(currentAlgorithm == GENETIC){
        GAInitialize();
      }else if (currentAlgorithm == GREEDY){
        GreedyInitialize();
      }else if (currentAlgorithm == FLS){
        FLSInitialize();
      }else if (currentAlgorithm == DP){
        myApp.showPleaseWait();
        DPInitialize();
      }else if (currentAlgorithm == BNB){
        myApp.showPleaseWait();
        BNBInitialize();
      }else if (currentAlgorithm == GREEDY_FLS){
        GreedyFLSInitialize();
      }else if (currentAlgorithm == BNBHK){
        myApp.showPleaseWait();
        BNBHKInitialize();
      }
      running = true;
    }else {
      alert("Ajouter des points sur le map!");
    }
  });
  $('#clear_btn').click(function() {
    running === false;
    initData();
    points = new Array();
  });
  $('#stop_btn').click(function() {
    if(running === false 
      && (currentAlgorithm == GENETIC && currentGeneration !== 0)
    ){
      running = true;
    } else {
      running = false;
    }
  });
});
function init() {
  ctx = $('#canvas')[0].getContext("2d");
  WIDTH = $('#canvas').width();
  HEIGHT = $('#canvas').height();
  setInterval(draw, 20);
  init_mouse();
}
function init_mouse() {
  $("canvas").click(function(evt) {
    if(!running) {
      canvasMinX = $("#canvas").offset().left;
      canvasMinY = $("#canvas").offset().top;
      $('#status').text("");

      x = evt.pageX - canvasMinX;
      y = evt.pageY - canvasMinY;
      points.push(new Point(x, y));
    }
  });
}
function initData() {
  running = false;
  POPULATION_SIZE = 30;
  ELITE_RATE = 0.3;
  CROSSOVER_PROBABILITY = 0.9;
  MUTATION_PROBABILITY  = 0.01;
  //OX_CROSSOVER_RATE = 0.05;
  UNCHANGED_GENS = 0;
  mutationTimes = 0;
  doPreciseMutate = true;

  bestValue = undefined;
  best = [];
  currentGeneration = 0;
  currentBest;
  population = []; //new Array(POPULATION_SIZE);
  values = new Array(POPULATION_SIZE);
  fitnessValues = new Array(POPULATION_SIZE);
  roulette = new Array(POPULATION_SIZE);
}
function addRandomPoints(number) {
  running = false;
  for(var i = 0; i<number; i++) {
    points.push(randomPoint());
  }
}
function drawCircle(point) {
  ctx.fillStyle   = '#08c';
  ctx.beginPath();
  ctx.arc(point.x, point.y, 2, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
  
}
function drawLines(array) {
  
  if (array.length == 0){
    return;
  }
  
  var draw_number = (array.length <= 100);
  var idx = 1;
  ctx.font = "12px Arial";
  
  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 1;
  ctx.beginPath();

  ctx.moveTo(points[array[0]].x, points[array[0]].y);
  ctx.fillText(idx,points[array[0]].x,points[array[0]].y);
  for(var i=1; i<array.length; i++) {
    ctx.lineTo( points[array[i]].x, points[array[i]].y )
    idx++;
    if(draw_number){
      ctx.fillText(idx,points[array[i]].x,points[array[i]].y);
    }
    
  }
  ctx.lineTo(points[array[0]].x, points[array[0]].y);

  ctx.stroke();
  ctx.closePath();
}
function draw() {
  if(running) {
    if(currentAlgorithm == GENETIC){
      GANextGeneration();
      $('#status').text("Sur " + points.length + " points de livraison sur le map, "
                      +"on est à la " + currentGeneration + "ième generation avec "
                      + mutationTimes + " optimisations. Meilleure distance obtenue: "
                      + ~~(bestValue)+"m");
    }else if(currentAlgorithm==GREEDY){
      GreedyFindNextPoint();
      $('#status').text("Nous allons utiliser " + points.length + " points de livraison sur le map."
                      +" Meilleure distance obtenue: "
                      + ~~(bestValue));
    }else if(currentAlgorithm==FLS || currentAlgorithm==GREEDY_FLS){
      FLSOptimize();
      $('#status').text("There are " + points.length + " cities in the map, "
                      +" best value: "
                      + ~~(bestValue));
    }else if(currentAlgorithm==DP){
      DPCompute();
      $('#status').text("Sur " + points.length + " points de livraison. "
                      +" Meilleure distance obtenue: "
                      + ~~(bestValue));
      if(dpFinish){
        myApp.hidePleaseWait();
      }
    }
    else if(currentAlgorithm==BNB){
      
      BNBCompute();
      $('#status').text("Sur " + points.length + " points de livraison. "
                      +" Meilleure distance obtenue: "
                      + ~~(bestValue));
      if(bnbFinish){
        myApp.hidePleaseWait();
      }
    }
    else if(currentAlgorithm==BNBHK){
      
      BNBHKCompute();
      $('#status').text("Sur " + points.length + " points de livraison. "
                      +" Meilleure distance obtenue: "
                      + ~~(bestValue));
      if(bnbhkFinish){
        myApp.hidePleaseWait();
      }
    }
  }
   else {
    $('#status').text("Sur " + points.length + " points de livraison. "
                      +" Meilleure distance obtenue: "
                      + ~~(bestValue));
  }
  clearCanvas();
  if (points.length > 0) {
    for(var i=0; i<points.length; i++) {
      drawCircle(points[i]);
    }
    if((currentAlgorithm != GENETIC) || (best.length === points.length)) {
      drawLines(best);
    }
  }
}
function clearCanvas() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}
