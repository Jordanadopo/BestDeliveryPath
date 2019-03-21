var pointactive = [];
var numCities;
var visited, current;

function FLSInitialize() {
  //countDistances();
  best = randomIndivial(points.length);
  calculateCurrentValue();
  numCities = points.length;
  visited = 0;
  current = 0;
  for(var i=0; i< numCities;i++){
    pointactive[i] = true;
  }
}

function FLSOptimize() {
  visited = 0;
  current = 0;
  for(var i=0; i< numCities;i++){
    pointactive[i] = true;
  }
  calculateCurrentValue();
  while(visited < numCities) {
    var currentPoint = points[best[current]];
    if(pointactive[current]) {
		  var modified = findMove(current, currentPoint, numCities);
      if(modified < 0) {
          current = wrap(current-1, numCities);
          visited = 0;
          bestValue += modified;
          return;
      }
      pointactive[current] = false;
    }

    current = wrap(current+1, numCities); 
    visited++;
  }
  /*
  else{
    visited = 0;
    current = 0;
    calculateCurrentValue();
    for(var i=0; i< numCities;i++){
      pointactive[i] = true;
    }
  }
  */
}

function wrap(i,max) {
  return (max+i) % max;
}

function findMove(current, currentPoint, numCities) {
  var prev = wrap(current-1, numCities);
  var next = wrap(current+1, numCities);
	var prevPoint = points[best[prev]];
	var nextPoint = points[best[next]];
	for(var i = wrap(current+2, numCities), j = wrap(current+3, numCities);
                j != current;
                i = j, j = wrap(j+1, numCities)) {

    var c = points[best[i]];
    var d = points[best[j]];
    var delta1 = moveCost(prevPoint, currentPoint, c, d);
    if(delta1 < 0) {
        activate(prev, current, i, j);
        reverse(Math.min(prev, i)+1, Math.max(prev, i));
        return delta1;
    }
    var delta2 = moveCost(currentPoint, nextPoint, c, d);
    if(delta2 < 0) {
        activate(current, next, i, j);
        reverse(Math.min(current, i)+1, Math.max(current, i));
        return delta2;
    }
  }
	return 0.0;
}

function moveCost(a, b, c, d) {
	var _ab = distance(a,b), _cd = distance(c,d);
  var _ac = distance(a,c), _bd = distance(b,d);
	if(_ab < _ac && _cd < _bd)
	    return 1;
	return (Math.sqrt(_ac) + Math.sqrt(_bd)) -
	       (Math.sqrt(_ab) + Math.sqrt(_cd)); 	
}
    
function activate(a, b, c, d) {
  pointactive[a] = false;
  pointactive[b] = false;
  pointactive[c] = false;
  pointactive[d] = false;
}



function reverse(from, to) {
  for(var i = from, j = to; i < j; i++, j--) {
    var tmp = best[i];
    best[i] = best[j];
    best[j] = tmp;
  }
}