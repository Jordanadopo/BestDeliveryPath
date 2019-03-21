function GreedyFLSInitialize() {
  //countDistances();
  GreedyInitialize();
  while(best.length < points.length){ 
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
  }
  calculateCurrentValue();
  numCities = points.length;
  visited = 0;
  current = 0;
  for(var i=0; i< numCities;i++){
    pointactive[i] = true;
  }
}