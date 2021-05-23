var type = "specialDiagonals"
//noDiagonals, specialDiagonals, or diagonals.
var maxTestsGlobal = 600;

class AStarGrid {
	constructor(grid,width,height){
		this.w = width;
		this.h = height;
		this.grid = [];

		//Generate grid
		for(var y=0;y<this.h;y++){
			for(var x=0;x<this.w;x++){
				if(grid[x+(y*this.w)] == true){
					this.grid.push(new Cell(x,y,this.w,this.h));
				} else {
					this.grid.push(false);
				};
			};
		};
		//Find adjacents
		for(var y=0;y<this.h;y++){
			for(var x=0;x<this.w;x++){
				var cell = EFC(this.grid,x,y,this.w,this.h);
				if(typeof cell == "object"){
					if(type === "diagonals"){
						if(typeof EFC(this.grid,x,y-1,this.w,this.h) == "object"){
							cell.adj.push(EFC(this.grid,x,y-1,this.w,this.h));
						};
						if(typeof EFC(this.grid,x+1,y-1,this.w,this.h) == "object"){
							cell.adj.push(EFC(this.grid,x+1,y-1,this.w,this.h));
						};
						if(typeof EFC(this.grid,x+1,y,this.w,this.h) == "object"){
							cell.adj.push(EFC(this.grid,x+1,y,this.w,this.h));
						};
						if(typeof EFC(this.grid,x+1,y+1,this.w,this.h) == "object"){
							cell.adj.push(EFC(this.grid,x+1,y+1,this.w,this.h));
						};
						if(typeof EFC(this.grid,x,y+1,this.w,this.h) == "object"){
							cell.adj.push(EFC(this.grid,x,y+1,this.w,this.h));
						};
						if(typeof EFC(this.grid,x-1,y+1,this.w,this.h) == "object"){
							cell.adj.push(EFC(this.grid,x-1,y+1,this.w,this.h));
						};
						if(typeof EFC(this.grid,x-1,y,this.w,this.h) == "object"){
							cell.adj.push(EFC(this.grid,x-1,y,this.w,this.h));
						};
						if(typeof EFC(this.grid,x-1,y-1,this.w,this.h) == "object"){
							cell.adj.push(EFC(this.grid,x-1,y-1,this.w,this.h));
						};
					} else if (type === "specialDiagonals") {
						var tr = true;
						var br = true;
						var bl = true;
						var tl = true;

						if(typeof EFC(this.grid,x,y-1,this.w,this.h) == "object"){
							cell.adj.push(EFC(this.grid,x,y-1,this.w,this.h));
						} else {tr = false; tl = false;};
						if(typeof EFC(this.grid,x+1,y,this.w,this.h) == "object"){
							cell.adj.push(EFC(this.grid,x+1,y,this.w,this.h));
						} else {tr = false; br = false;};
						if(typeof EFC(this.grid,x,y+1,this.w,this.h) == "object"){
							cell.adj.push(EFC(this.grid,x,y+1,this.w,this.h));
						} else {br = false; bl = false;};
						if(typeof EFC(this.grid,x-1,y,this.w,this.h) == "object"){
							cell.adj.push(EFC(this.grid,x-1,y,this.w,this.h));
						} else {bl = false; tl = false;};

						if(typeof EFC(this.grid,x+1,y-1,this.w,this.h) == "object" && tr){
							cell.adj.push(EFC(this.grid,x+1,y-1,this.w,this.h));
						};
						if(typeof EFC(this.grid,x+1,y+1,this.w,this.h) == "object" && br){
							cell.adj.push(EFC(this.grid,x+1,y+1,this.w,this.h));
						};
						if(typeof EFC(this.grid,x-1,y+1,this.w,this.h) == "object" && bl){
							cell.adj.push(EFC(this.grid,x-1,y+1,this.w,this.h));
						};
						if(typeof EFC(this.grid,x-1,y-1,this.w,this.h) == "object" && tl){
							cell.adj.push(EFC(this.grid,x-1,y-1,this.w,this.h));
						};
					} else if (type === "noDiagonals") {
						if(typeof EFC(this.grid,x,y-1,this.w,this.h) == "object"){
							cell.adj.push(EFC(this.grid,x,y-1,this.w,this.h));
						};
						if(typeof EFC(this.grid,x+1,y,this.w,this.h) == "object"){
							cell.adj.push(EFC(this.grid,x+1,y,this.w,this.h));
						};
						if(typeof EFC(this.grid,x,y+1,this.w,this.h) == "object"){
							cell.adj.push(EFC(this.grid,x,y+1,this.w,this.h));
						};
						if(typeof EFC(this.grid,x-1,y,this.w,this.h) == "object"){
							cell.adj.push(EFC(this.grid,x-1,y,this.w,this.h));
						};
					};
				};
			};
		};
	}


	Search(orgin,target){
		//Reset the grid
		this.Reset();
		//Search for the optimal path between two cells
		var openSet = [orgin];
		var closedSet = [];
		var path = [];
		var orgin = orgin;
		var target = target;
		orgin.gcost = 0;
		var solved = false;
		var stuck = false;

		var maxTests = maxTestsGlobal;

		//While not solved...
		while(!solved){
			//Loop through openSet[0]'s adjacents
			for(g=0;g<openSet[0].adj.length;g++){
				var obj = openSet[0].adj[g];
				//If it's not in closed set
				if(InArray(closedSet,obj) == false){
					//Find the F-Cost and push it to openset
					obj.FindFCost(target, openSet[0]);
					if(InArray(openSet,obj) == false){openSet.push(obj)};
					//if it's the target, find the path
					if(obj === target){
						//Path found!
						target.fromCell = openSet[0];
						solved = true;
						var current = target;
						while(current != orgin){
							path.push(current);
							current = current.fromCell;
						};
					};
				};
			};

			//Push openSet[0] to closedSet
			closedSet.push(openSet[0]);
			//Remove openSet[0] from openSet
			openSet.splice(0,1);

			//See if it's stuck or not
			if(openSet.length === 0){
				solved = true;
				stuck = true;
			} else if (maxTests <= 0){
				solved = true;
				stuck = true;
			} else {
				openSet = SortByF(openSet);
			};
			maxTests--;
		};

		//Display
		for(var g=0;g<openSet.length;g++){openSet[g].color = "rgb(255,230,230)"};
		for(var g=0;g<closedSet.length;g++){closedSet[g].color = "rgb(200,200,200)"};
		for(var g=0;g<path.length;g++){path[g].color = "rgb(0,255,0)"};
		orgin.color = "rgb(255,0,0)";
		target.color = "rgb(0,0,255)";
		
		//Return path or false
		if(stuck){
			return(false);
		} else {
			return(path);
		};
	}

	Reset(){
		for(var g=0;g<this.grid.length;g++){
			if(typeof this.grid[g] === "object"){
				this.grid[g].fcost = Infinity;
				this.grid[g].hcost = undefined;
				this.grid[g].gcost = 0;
				this.grid[g].color = "rgb(255,255,255)";
			};
		};
	}

	RandomCell() {
		var found = false;
		while(!found){
			var rand = Math.random();
			var cell = this.grid[Math.floor(this.grid.length*rand)];
			if(typeof cell == "object"){
				return(cell);
				found = true;
			};
		};
	}

	Display(){
		//Displays the grid
		for(var g=0;g<this.grid.length;g++){
			if(this.grid[g] != false){this.grid[g].Display()};
		};
	}
}





class Cell {
	constructor(x,y,gridW,gridH){
		this.x = x;
		this.y = y;
		this.w = 500/gridW;
		this.h = 500/gridH;
		this.color = "rgb(255,255,255)";
		this.fromCell;

		this.adj = [];

		this.fcost = Infinity;
		this.gcost = 0;
		this.hcost;
	}

	FindFCost(target,prev){
		if(target.x === undefined || target.x === undefined){target.x = Infinity;target.y = Infinity};
		if(this.x === undefined || this.x === undefined){this.x = Infinity;this.y = Infinity};
		this.hcost = Distance(this.x,this.y,target.x,target.y);
		var newG;
		var newF;
	
		if(this.x === prev.x || this.y === prev.y){
			newG = prev.gcost+1;
		} else {
			newG = prev.gcost+1.4;
		};
		newF = newG+this.hcost;

		if(this.fcost >= newF){
			this.fromCell = prev;
			this.gcost = newG;
			this.fcost = newF;
		};
	}

	Display(){
		ctx.beginPath();
		ctx.strokeStyle = "rgb(0,0,0)";
		ctx.fillStyle = this.color;
		ctx.rect(this.x*this.w,this.y*this.h,this.w,this.h);
		ctx.stroke();
		ctx.fill();
		ctx.closePath();
	};
}





function EFC(grid,x,y,w,h){
	//Return an element from a grid
	if(x<0 || y<0 || x>=w || y>=h){
		return(undefined);
	} else {
		return(grid[x+(y*w)]);
	};
}

function InArray(grid,element){
	//Return an element from a grid
	for(var f=0;f<grid.length;f++){
		if(grid[f] === element){
			return(true);
		};
	};
	return(false);
}

function Distance(x1,y1,x2,y2){
	//Returns pythagrian distance
	var c = ( Math.sqrt( Math.pow(x1-x2,2)+Math.pow(y1-y2,2) ));
	return(c);
}

function RemoveElement(arr,element){
	for(var f=0;f<arr.length;f++){
		if(arr[f] === element){
			arr.splice(f,1);
			return(arr);
			break;
		};
	};
}

function SortByF(arr){
	//succs in an array of nodes, and spits it out all sorted and shit
	var sorted = false;
	var array = arr;
	var newArray = [];

	while(!sorted){
		var lowNum = Infinity;
		var lowObj = {};
		for(var g1=0;g1<array.length;g1++){
			if(array[g1].fcost < lowNum){
				lowNum = array[g1].fcost;
				lowObj = array[g1];
			};
		};
		
		array = RemoveElement(array,lowObj);
		newArray.push(lowObj);

		if(array.length === 0){
			sorted = true;
			return(newArray);
		};
	};
};