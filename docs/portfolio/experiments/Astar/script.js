var canvas = document.getElementById("canvas1");
var ctx = canvas.getContext("2d");

var gridWidth = 40;
var gridHeight = 40;
var navMesh = [];
var finished = false;

async function Start() {
	navMesh = [];
	finished = false;
	//Create new navigation mesh
	for(var y=0;y<gridHeight;y++){
		for(var x=0;x<gridWidth;x++){
			var rand = Math.random();
			if(rand <= .2){
				navMesh.push(false);
			} else {
				navMesh.push(true);
			};
		};
	};
	navMesh = new AStarGrid(navMesh,gridWidth,gridHeight);
	navMesh.Search(navMesh.RandomCell(),navMesh.RandomCell());
	
		
	while(!finished){
		await Sleep(10);
	};
	
	await Sleep(3000);
	
	Start();
}
	
	
async function Sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

Start();
console.log("main loaded");