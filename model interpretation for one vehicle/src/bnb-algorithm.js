var sourceCity;
var initialRoute, optimumRoute;
var nodes;
var routeCost;
var optimumCost;    
var bnbFinish = false;
var bnbRunning = false;
function BNBInitialize(){
        countDistances();
        sourceCity = 0
        initialRoute  = [];
        optimumRoute = [];
        nodes = 1;
        routeCost = 0;
        optimumCost = Number.MAX_VALUE;   
        bnbFinish = false;
	best = [];
}
function BNBCompute(){
        
        if(bnbFinish){
		return;
	}
	if(bnbRunning){
		return;
	}
        var n = points.length;
	if(n > 15){
		alert("Too many point to calculate for Branch and Bound algorithm");
		running = false;
                bnbRunning = false;
	        bnbFinish = true;
		return;
	}
        BNBSearch(sourceCity, initialRoute);
        best = optimumRoute.clone();
        calculateCurrentValue();
	bnbRunning = false;
	bnbFinish = true;
}
function BNBSearch(from, followedRoute){
        if (followedRoute.length == points.length) {       
                followedRoute.push(sourceCity);
                nodes++;
                routeCost += dis[from][sourceCity];
                if (routeCost < optimumCost) {
                        optimumCost = routeCost;
                        optimumRoute = followedRoute.clone();
                }
                routeCost -= dis[from][sourceCity];
        }
        else {
                for (var to=0; to<points.length; to++){
                        if (!checkExist(followedRoute,to)) {
                                routeCost += dis[from][to];
                                if (routeCost < optimumCost) { 
                                        var increasedRoute = followedRoute.clone();
                                        increasedRoute.push(to);
                                        nodes++;
                                        BNBSearch(to, increasedRoute);    
                                }
                                routeCost -= dis[from][to];
                        }
                }
        }
}