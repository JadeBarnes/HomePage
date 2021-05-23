class Tile {
	constructor(x,y,width,passable,fillColor) {
		this.x = x;
		this.y = y;
		this.w = width;
		this.pass = passable;

		this.fill = fillColor;
		this.outline = "rgb(0,0,0)";
		this.type = "tile";

		this.adjacent = [false,false,false,false];
		if(this.adjacent[0] && this.adjacent[1] &&
		   this.adjacent[2] && this.adjacent[3]){
				this.pass = false;
		};
	}

	Update() {
		this.Display();
	}

	Destroy(){
		localMap[this.x+(this.y*chunkSize)] = false;

		navMesh.grid[(this.x*2)+((this.y*2)*(chunkSize*2))] = false;
		navMesh.grid[((this.x*2)+1)+(((this.y*2))*(chunkSize*2))] = false;
		navMesh.grid[((this.x*2))+(((this.y*2)+1)*(chunkSize*2))] = false;
		navMesh.grid[((this.x*2)+1)+(((this.y*2)+1)*(chunkSize*2))] = false;
	}

	Display() {
		ctx.beginPath();
		ctx.rect(this.x*this.w,this.y*this.w,this.w,this.w);
		ctx.fillStyle = this.fill;
		ctx.strokeStyle = this.outline;
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	}
}

class Pickup extends Tile {
	constructor(loot,x,y,width,passable,fillColor,rarity) {
		super(x,y,width,passable,fillColor);
		this.x = x;
		this.y = y;
		this.w = width;
		this.pass = true;
		this.type = "pickup";
		this.posx = (this.x*(500/chunkSize));
		this.posy = (this.y*(500/chunkSize));
		this.loot = loot;

		this.rarity = rarity;
		this.timer = 0;

		this.fill = fillColor;
		this.outline = "rgb(0,0,0)";
	}

	Display() {
		if(this.rarity === "common"){
			ctx.beginPath();
			ctx.rect(this.posx+(this.w/2),this.posy+(this.w/2),this.w,this.w);
			ctx.fillStyle = this.fill;
			ctx.strokeStyle = this.outline;
			ctx.fill();
			ctx.stroke();
			ctx.closePath();
		} else {
			ctx.beginPath();
			ctx.rect(this.posx+(this.w/2),this.posy+(this.w/2),this.w,this.w);
			ctx.fillStyle = "hsl("+ this.timer +",100%,50%)";
			ctx.strokeStyle = this.outline;
			ctx.fill();
			ctx.stroke();
			ctx.closePath();
		};
		if(this.timer < 360){
			this.timer++;
		} else {
			this.timer = 0;
		};
	}
}

class Goal extends Tile {
	constructor(x,y,width,passable,fillColor){
		super(x,y,width,passable,fillColor);
		this.type = "goal";
	}

	Destroy(){
		//This object can't be destroyed
	}
}