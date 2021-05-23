var regenTime = 100;
var damagedRegenMulti = 1.5;

//Base class
class Tile {
	constructor(x,y,coords,placed){
		this.x = x;
		this.y = y;
		this.coords = coords; //[wx,wy,cx,cy]
		this.w = tileSize;
		this.type = "tile";
		this.adj = [false,false,false,false];
		this.worldY = this.coords[3]+(this.coords[1]*chunkSize);
		this.worldX = this.coords[2]+(this.coords[0]*chunkSize);
		this.regenTimer = regenTime;
		this.health = 1;
		this.maxHealth = 1;
		this.number;
		this.overlay = -1;
		this.tag = "Tile";
	}

	Update(){
		this.Draw();

		if(this.health < this.maxHealth){
			if(this.regenTimer < 0){
				this.health++;
				this.regenTimer = regenTime;
			} else {
				this.regenTimer--;
			};
		};
	}

	Draw(){
		ctx.drawImage(tileset, (tileSize)*(this.number%8),(tileSize)*Math.floor(this.number/8), tileSize,tileSize, this.x,this.y, tileSize+1,tileSize+1);
		if(this.overlay >= 0){
			ctx.drawImage(overlays, (tileSize)*(this.overlay%4),(tileSize)*Math.floor(this.overlay/4), tileSize,tileSize, this.x,this.y, tileSize+1,tileSize+1);
		};

		if(this.health/this.maxHealth <= .25){
			ctx.drawImage(damageTexture, 78,0, tileSize,tileSize, this.x,this.y, tileSize+1,tileSize+1);
		} else if (this.health/this.maxHealth <= .50) {
			ctx.drawImage(damageTexture, 52,0, tileSize,tileSize, this.x,this.y, tileSize+1,tileSize+1);
		} else if (this.health/this.maxHealth <= .75) {
			ctx.drawImage(damageTexture, 26,0, tileSize,tileSize, this.x,this.y, tileSize+1,tileSize+1);
		} else if (this.health < this.maxHealth) {
			ctx.drawImage(damageTexture, 0,0, tileSize,tileSize, this.x,this.y, tileSize+1,tileSize+1);
		};
	}

	Destroy(){
		world[this.coords[0]+(this.coords[1]*worldWidth)].tiles[this.coords[2]+(this.coords[3]*chunkSize)] = false;
		this.UpdateChunks();
	};

	UpdateChunks(){
		world[this.coords[0]+(this.coords[1]*worldWidth)].Mesh();
		if(this.coords[1] != 0){world[this.coords[0]+((this.coords[1]-1)*worldWidth)].Mesh()};
		if(this.coords[0] != worldWidth-1){world[this.coords[0]+1+(this.coords[1]*worldWidth)].Mesh()};
		if(this.coords[1] != worldHeight-1){world[this.coords[0]+((this.coords[1]+1)*worldWidth)].Mesh()};
		if(this.coords[0] != 0){world[this.coords[0]-1+(this.coords[1]*worldWidth)].Mesh()};
	}

	Damage(dmg,power){
		if(power >= this.hardness){
			this.health -= dmg;
			if(this.health <= 0){
				this.Destroy();
				return(true);
			};
			this.regenTimer = regenTime*damagedRegenMulti;
		};
	}

	Initialize(){
		this.FindAdjacents();
	}

	FindAdjacents(){
		//Find adjacents
		//Check if it's at the edge of a chunk

		//Top
		if(this.coords[3] == 0){
			if(this.coords[1] == 0){
				//Top of world
				this.adj[0] = false;
			} else {
				if(world[this.coords[0] + ((this.coords[1]-1)*worldWidth)].tiles[(this.coords[2]) + chunkSize*(chunkSize-1)] != false) {
					this.adj[0] = true;
				};
			};
		} else {
			if(world[this.coords[0] + ((this.coords[1])*worldWidth)].tiles[(this.coords[2]) + ((this.coords[3]-1)*chunkSize)] != false) {
				this.adj[0] = true;
			};
		};

		//Right
		if(this.coords[2] == chunkSize-1){
			if(this.coords[0] == worldWidth-1){
				//Right of world
				this.adj[1] = false;
			} else {
				if(world[(this.coords[0]+1) + ((this.coords[1])*worldWidth)].tiles[0 + ((this.coords[3])*chunkSize)] != false) {
					this.adj[1] = true;
				};
			};
		} else {
			if(world[this.coords[0] + ((this.coords[1])*worldWidth)].tiles[(this.coords[2]+1) + ((this.coords[3])*chunkSize)] != false) {
				this.adj[1] = true;
			};
		};

		//Bottom
		if(this.coords[3] == chunkSize-1){
			if(this.coords[1] == worldHeight-1){
				//Bottom of world
				this.adj[2] = false;
			} else {
				if(world[(this.coords[0]) + ((this.coords[1]+1)*worldWidth)].tiles[(this.coords[2]) + 0] != false) {
					this.adj[2] = true;
				};
			};
		} else {
			if(world[this.coords[0] + ((this.coords[1])*worldWidth)].tiles[(this.coords[2]) + ((this.coords[3]+1)*chunkSize)] != false) {
				this.adj[2] = true;
			};
		};

		//Left
		if(this.coords[2] == 0){
			if(this.coords[0] == 0){
				//Right of world
				this.adj[3] = false;
			} else {
				if(world[(this.coords[0]-1) + ((this.coords[1])*worldWidth)].tiles[chunkSize + ((this.coords[3])*chunkSize)-1] != false) {
					this.adj[3] = true;
				};
			};
		} else {
			if(world[this.coords[0] + ((this.coords[1])*worldWidth)].tiles[(this.coords[2]-1) + ((this.coords[3])*chunkSize)] != false) {
				this.adj[3] = true;
			};
		};

	}
}