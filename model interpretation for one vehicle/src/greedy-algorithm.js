function GreedyInitialize() {
  countDistances();
  bestValue = 0;
  best = [];
  best.push(randomNumber(points.length-1));
}

function setFirstPoint(){
  var maxx = 0;
  var found_idx=0;
  for(var i=0; i<points.length;i++){
    if (points[i].x > maxx){
      maxx = points[i].x;
      found_idx = i; 
    }
  }
  return found_idx;
}

function GreedyFindNextPoint(){
  if(best.length == points.length){
    return;
  }
  var current_idx = best[best.length - 1];
  var mind = Number.MAX_VALUE;
  var nextPoint = 0;
  for(var i=0; i<points.length; i++){
    if(!checkExist(best,i)){
      if (dis[current_idx][i] < mind){
        mind = dis[current_idx][i] ;
        nextPoint = i;
      }
    }
  }
  best.push(nextPoint);
  calculateCurrentValue();
  
}