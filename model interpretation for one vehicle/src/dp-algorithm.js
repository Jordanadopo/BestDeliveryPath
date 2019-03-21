var g, p, npow, N, d;
var outputArray = [];
var dpFinish = false;
var dpRunning = false;
function DPInitialize() {
	countDistances();
	dpFinish = false;
	best = [];
	outputArray = [];
}

function DPCompute(){
	
	if(dpFinish){
		return;
	}
	if(dpRunning){
		return;
	}
	
	var n = points.length;
	if(n > 20){
		alert("Too many point to calculate for Dynamic Programing algorithm");
		running = false;
		dpRunning = false;
		dpFinish = true;
		return;
	}
	dpRunning = true;
	var i, j;
	
	var inputArray = dis;
	N = n;
	npow = power(2,N);
	g = new Array(n);
	p = new Array(n);
	for(i=0;i<n;i++){
		g[i] = new Array(npow);
		p[i] = new Array(npow);
		for (j = 0; j < npow; j++) {
			g[i][j] = -1;
			p[i][j] = -1;
		}
	}
	d = inputArray;
	for (i = 0; i < n; i++) {
		g[i][0] = inputArray[i][0];
	}
	
	var result = tsp(0, npow - 2);
	outputArray.push(0);
	getPath(0, npow - 2);
	outputArray.push(result);
	
	for(i=0;i<n;i++){
		best.push(outputArray[i]);
	}
	calculateCurrentValue();
	dpRunning = false;
	dpFinish = true;
	
}

function tsp(start, set) {
	var masked, mask, result = -1, temp;
	if (g[start][set] != -1) {
		return g[start][set];
	} else {
		for (var x = 0; x < N; x++) {
			mask = npow - 1 - power(2, x);
			masked = set & mask;
			if (masked != set) {
				temp = d[start][x] + tsp(x, masked);
				if (result == -1 || result > temp) {
					result = temp;
					p[start][set] = x;
				}
			}
		}
		g[start][set] = result;
		return result;
	}
}

function getPath(start, set) {
	if (p[start][set] == -1) {
		return;
	}
	var x = p[start][set];
	var mask = npow - 1 - power(2, x);
	var masked = set & mask;
	outputArray.push(x);
	getPath(x, masked);
}