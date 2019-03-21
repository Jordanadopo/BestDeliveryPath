function QNode () {
    this.excluded = [];
    this.pi = [];
    this.lowerBound = Number.MAX_VALUE;
    this.degree = [];
    this.parent = [];
}
QNode.prototype.toString = function(){return this.lowerBound}

function PriorityQueue () {
    this.heap = [];
}

PriorityQueue.prototype = {
    push: function(node) {
        this.bubble(this.heap.push(node) -1);      
    },
    
    pushAll: function(queue) {
      while(queue.heap.length > 0){
        this.push(queue.poll());   
      }   
    },
    
    poll: function() {
        var topVal = this.heap[1];
        this.heap[1] = this.heap.pop();
        this.sink(1); return topVal;
    },
    
    bubble: function(i) {
        while (i > 1) { 
            var parentIndex = i >> 1;
            if (!this.isHigherPriority(i, parentIndex)) break;
            this.swap(i, parentIndex);
            i = parentIndex;
        }   
    },
        
    sink: function(i) {
        while (i*2 < this.heap.length) {
            var leftHigher = !this.isHigherPriority(i*2 +1, i*2);
            var childIndex = leftHigher? i*2 : i*2 +1;
            if (this.isHigherPriority(i,childIndex)) break;
            this.swap(i, childIndex);
            i = childIndex;
        }   
    },
        
    swap: function(i,j) {
        var temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    },
        
    isHigherPriority: function(i,j) {
        return this.heap[i].lowerBound < this.heap[j].lowerBound;
    }
}

var n;
  // cost matrix
var cost;
  // matrix of adjusted costs
var costWithPi;
var bestNode = new QNode();
var bnbhkFinish = false;
var bnbhkRunning = false;

function createBooleanArr(n){
    var arr = new Array(n);
    for (var i=0; i<n ; i++){
        arr[i] = new Array(n);
        for(var j=0; j<n; j++){
            arr[i][j] = false;
        }
    }
    return arr;
}
function createNumber2DArr(n){
    var arr = new Array(n);
    for (var i=0; i<n ; i++){
        arr[i] = new Array(n);
        for(var j=0; j<n; j++){
            arr[i][j] = 0;
        }
    }
    return arr;
}
function createNumber1DArr(n){
    var arr = new Array(n);
    for (var i=0; i<n ; i++){
        arr[i] = 0;
    }
    return arr;
}
function BNBHKInitialize(){
    n = points.length;
    countDistances();
    cost = dis.clone();
    bestNode = new QNode();
    bestNode.lowerBound = Number.MAX_VALUE;
    costWithPi = createNumber2DArr(n);
    bnbhkFinish = false;
	  best = [];
}

function BNBHKCompute(){
        
  if(bnbhkFinish){
		return;
	}
	if(bnbhkRunning){
		return;
	}
	if(n > 50){
		alert("Too many point to calculate for Branch and Bound algorithm");
		running = false;
    bnbhkRunning = false;
	  bnbhkFinish = true;
		return;
	}
  BNBHKSolve();
  calculateCurrentValue();
	bnbhkRunning = false;
	bnbhkFinish = true;
}

function BNBHKSolve(){
    var currentNode = new QNode();
    currentNode.excluded = createBooleanArr(n);
    computeHeldKarp(currentNode);
    var pq = new PriorityQueue();
    do {
      do {
        var i = -1;
        for (var j = 0; j < n; j++) {
          if (currentNode.degree[j] > 2 && (i < 0 || currentNode.degree[j] < currentNode.degree[i])) i = j;
        }
        if (i < 0) {
          if (currentNode.lowerBound < bestNode.lowerBound) {
            bestNode = currentNode;
            console.log("%.0f", bestNode.lowerBound);
          }
          break;
        }
        console.log(".");
        var children = new PriorityQueue();
        children.push(exclude(currentNode, i, currentNode.parent[i]));
        for (var j = 0; j < n; j++) {
          if (currentNode.parent[j] == i) children.push(exclude(currentNode, i, j));
        }
        currentNode = children.poll();
        pq.pushAll(children);
      } while (currentNode.lowerBound < bestNode.lowerBound);
      console.log("%n");
      currentNode = pq.poll();
    } while (currentNode != null && currentNode.lowerBound < bestNode.lowerBound);
    // output suitable for gnuplot
    // set style data vector
    console.log("# %.0f%n", bestNode.lowerBound);
    var jj = 0;
    do {
      var ii = bestNode.parent[jj];
      //Console.log("%f\t%f\t%f\t%f%n", x[j], y[j], x[i] - x[j], y[i] - y[j]);
      best.push(ii);
      jj = ii;
    } while (jj != 0);
}

function exclude(node, i, j) {
    var child = new QNode();
    child.excluded = node.excluded.clone();
    child.excluded[i] = node.excluded[i].clone();
    child.excluded[j] = node.excluded[j].clone();
    child.excluded[i][j] = true;
    child.excluded[j][i] = true;
    computeHeldKarp(child);
    return child;
  }

function computeHeldKarp(node) {
    node.pi = createNumber1DArr(n);
    node.lowerBound = Number.MIN_VALUE;
    node.degree = createNumber1DArr(n);
    node.parent = createNumber1DArr(n);
    var lambda = 0.1;
    while (lambda > 1e-06) {
      var previousLowerBound = node.lowerBound;
      computeOneTree(node);
      if (!(node.lowerBound < bestNode.lowerBound)) return;
      if (!(node.lowerBound < previousLowerBound)) lambda *= 0.9;
      var denom = 0;
      for (var i = 1; i < n; i++) {
        var d = node.degree[i] - 2;
        denom += d * d;
      }
      if (denom == 0) return;
      var t = lambda * node.lowerBound / denom;
      for (var i = 1; i < n; i++) node.pi[i] += t * (node.degree[i] - 2);
    }
}

function computeOneTree(node) {
    // compute adjusted costs
    node.lowerBound = 0.0;
    for(var j=0; j<n; j++){
        node.degree[j] = 0;
    }
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++){ 
        var _cost = node.excluded[i][j] ? Number.MAX_VALUE : cost[i][j] + node.pi[i] + node.pi[j];
        costWithPi[i][j] = _cost;
      }
    }
    var firstNeighbor;
    var secondNeighbor;
    // find the two cheapest edges from 0
    if (costWithPi[0][2] < costWithPi[0][1]) {
      firstNeighbor = 2;
      secondNeighbor = 1;
    } else {
      firstNeighbor = 1;
      secondNeighbor = 2;
    }
    for (var j = 3; j < n; j++) {
      if (costWithPi[0][j] < costWithPi[0][secondNeighbor]) {
        if (costWithPi[0][j] < costWithPi[0][firstNeighbor]) {
          secondNeighbor = firstNeighbor;
          firstNeighbor = j;
        } else {
          secondNeighbor = j;
        }
      }
    }
    addEdge(node, 0, firstNeighbor);
    for(var j=0; j<n; j++){
        node.parent[j] = firstNeighbor;
    }
    node.parent[firstNeighbor] = 0;
    // compute the minimum spanning tree on nodes 1..n-1
    var minCost = costWithPi[firstNeighbor].clone();
    for (var k = 2; k < n; k++) {
      var idx = 1;
      for (idx = 1; idx < n; idx++) {
        if (node.degree[idx] == 0) break;
      }
      for (var j = idx + 1; j < n; j++) {
        if (node.degree[j] == 0 && minCost[j] < minCost[idx]) idx = j;
      }
      addEdge(node, node.parent[idx], idx);
      for (var j = 1; j < n; j++) {
        if (node.degree[j] == 0 && costWithPi[idx][j] < minCost[j]) {
          minCost[j] = costWithPi[idx][j];
          node.parent[j] = idx;
        }
      }
    }
    addEdge(node, 0, secondNeighbor);
    node.parent[0] = secondNeighbor;
    node.lowerBound = Math.trunc(node.lowerBound);
}
  
function addEdge(node, i, j) {
    var q = node.lowerBound;
    node.lowerBound += costWithPi[i][j];
    node.degree[i]++;
    node.degree[j]++;
}