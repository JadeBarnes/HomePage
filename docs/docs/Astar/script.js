var canvas = document.getElementById("canvas1");
var ctx = canvas.getContext("2d");

var gridWidth = 40;
var gridHeight = 40;
var navMesh = [];

function Start() {
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
	
}

function Draw() {
	ctx.clearRect(0,0,500,500);
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillRect(0,0,500,500);
	navMesh.Search(navMesh.RandomCell(),navMesh.RandomCell());

	navMesh.Display();
}

Start();
Draw();
//setInterval(function(){Draw();}, 1000);