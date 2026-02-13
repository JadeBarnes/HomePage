//Blocks------------------------------------------------------
/* To add a new block to the game:
-Add the texture and class, then number it correctly
-Update dictionary
-Update onClick event
*/


class Grass extends Tile {
	constructor(x,y,coords,placed){
		super(x,y,coords,placed);
		this.number = 0;
		this.item = 1;
		this.maxHealth = 2;
		this.hardness = 1;

		this.health = this.maxHealth;
	}
}

class Dirt extends Tile {
	constructor(x,y,coords,placed){
		super(x,y,coords,placed);
		this.number = 1;
		this.item = 1;
		this.maxHealth = 2;
		this.hardness = 1;

		this.health = this.maxHealth;
		
		this.ore = Math.random();

		if(placed == false && this.ore < .05){
			this.overlay = 6;
			this.item = 80;
		};
	};

	Initialize(){
		this.FindAdjacents();
		if(!this.adj[0]){
			world[this.coords[0]+(this.coords[1]*worldWidth)].tiles[this.coords[2]+(this.coords[3]*chunkSize)] = new Grass(this.x,this.y,this.coords,false);
			world[this.coords[0]+(this.coords[1]*worldWidth)].tiles[this.coords[2]+(this.coords[3]*chunkSize)].Initialize();
		};
	};
}

class Sandstone extends Tile {
	constructor(x,y,coords,placed){
		super(x,y,coords,placed);
		this.number = 2;
		this.item = 2;
		this.maxHealth = 3;
		this.hardness = 2;

		this.health = this.maxHealth;

		this.ore = Math.random();

		if(placed == false && this.ore < .03){
			//Do nothing, wait until initialization
		} else if (placed == false && this.ore < .075){
			this.overlay = 0;
			this.item = 64;
		};
	}

	Initialize(){
		this.FindAdjacents();
		if(this.ore < .01){
			world[this.coords[0]+(this.coords[1]*worldWidth)].tiles[this.coords[2]+(this.coords[3]*chunkSize)] = new Cassiterite(this.x,this.y,this.coords,false);
			world[this.coords[0]+(this.coords[1]*worldWidth)].tiles[this.coords[2]+(this.coords[3]*chunkSize)].Initialize();
		} else if (this.ore < .03) {
			world[this.coords[0]+(this.coords[1]*worldWidth)].tiles[this.coords[2]+(this.coords[3]*chunkSize)] = new Malachite(this.x,this.y,this.coords,false);
			world[this.coords[0]+(this.coords[1]*worldWidth)].tiles[this.coords[2]+(this.coords[3]*chunkSize)].Initialize();
		};
	};
}

class Shale extends Tile {
	constructor(x,y,coords,placed){
		super(x,y,coords,placed);
		this.number = 3;
		this.item = 3;
		this.maxHealth = 3;
		this.hardness = 2;

		this.health = this.maxHealth;
	}
}

class Limestone extends Tile {
	constructor(x,y,coords,placed){
		super(x,y,coords,placed);
		this.number = 4;
		this.item = 4;
		this.maxHealth = 6;
		this.hardness = 3;

		this.health = this.maxHealth;

		this.ore = Math.random();

		if(placed == false && this.ore < .03){
			//Do nothing, wait until initialization
		} else if (placed == false && this.ore < .1) {
			var gem = Math.random();
			if (gem < .1) {
				this.item = 16;
			} else {
				this.overlay = 3;
				this.item = 77;
			};
			
		};
	}

	Initialize(){
		this.FindAdjacents();
		if(this.ore < .01){
			world[this.coords[0]+(this.coords[1]*worldWidth)].tiles[this.coords[2]+(this.coords[3]*chunkSize)] = new Hematite(this.x,this.y,this.coords,false);
			world[this.coords[0]+(this.coords[1]*worldWidth)].tiles[this.coords[2]+(this.coords[3]*chunkSize)].Initialize();
		} else if (this.ore < .02) {
			world[this.coords[0]+(this.coords[1]*worldWidth)].tiles[this.coords[2]+(this.coords[3]*chunkSize)] = new Cassiterite(this.x,this.y,this.coords,false);
			world[this.coords[0]+(this.coords[1]*worldWidth)].tiles[this.coords[2]+(this.coords[3]*chunkSize)].Initialize();
		} else if (this.ore < .03){
			world[this.coords[0]+(this.coords[1]*worldWidth)].tiles[this.coords[2]+(this.coords[3]*chunkSize)] = new Malachite(this.x,this.y,this.coords,false);
			world[this.coords[0]+(this.coords[1]*worldWidth)].tiles[this.coords[2]+(this.coords[3]*chunkSize)].Initialize();
		};
	};
}

class RockSalt extends Tile {
	constructor(x,y,coords,placed){
		super(x,y,coords,placed);
		this.number = 5;
		this.item = 5;
		this.maxHealth = 6;
		this.hardness = 3;

		this.health = this.maxHealth;
	}
}

class Slate extends Tile {
	constructor(x,y,coords,placed){
		super(x,y,coords,placed);
		this.number = 6;
		this.item = 6;
		this.maxHealth = 10;
		this.hardness = 4;

		this.health = this.maxHealth;

		this.ore = Math.random();
	}

	Initialize(){
		this.FindAdjacents();
		if (this.ore < .015) {
			world[this.coords[0] + (this.coords[1] * worldWidth)].tiles[this.coords[2] + (this.coords[3] * chunkSize)] = new Hematite(this.x, this.y, this.coords, false);
			world[this.coords[0] + (this.coords[1] * worldWidth)].tiles[this.coords[2] + (this.coords[3] * chunkSize)].Initialize();
		} else if (this.ore < .02) {
			world[this.coords[0] + (this.coords[1] * worldWidth)].tiles[this.coords[2] + (this.coords[3] * chunkSize)] = new Cassiterite(this.x, this.y, this.coords, false);
			world[this.coords[0] + (this.coords[1] * worldWidth)].tiles[this.coords[2] + (this.coords[3] * chunkSize)].Initialize();
		} else if (this.ore < .025) {
			world[this.coords[0] + (this.coords[1] * worldWidth)].tiles[this.coords[2] + (this.coords[3] * chunkSize)] = new Malachite(this.x, this.y, this.coords, false);
			world[this.coords[0] + (this.coords[1] * worldWidth)].tiles[this.coords[2] + (this.coords[3] * chunkSize)].Initialize();
		} else {
			var gem = Math.random();
			if (gem < .01) {
				this.item = 79;
				this.overlay = 5;
			};
		};
	};
}

class Marble extends Tile {
	constructor(x,y,coords,placed){
		super(x,y,coords,placed);
		this.number = 7;
		this.item = 7;
		this.maxHealth = 13;
		this.hardness = 4;

		this.health = this.maxHealth;

		this.ore = Math.random();
	}

	Initialize(){
		this.FindAdjacents();
		if(this.ore > .99){
			var gem = Math.random();
			if (gem < .33) {
				this.item = 75;
				this.overlay = 1;
			} else if (gem < .67) {
				this.item = 76;
				this.overlay = 2;
			} else {
				this.item = 78;
				this.overlay = 4;
			};
			
		} else if (this.ore < .02) {
			world[this.coords[0]+(this.coords[1]*worldWidth)].tiles[this.coords[2]+(this.coords[3]*chunkSize)] = new Cassiterite(this.x,this.y,this.coords,false);
			world[this.coords[0]+(this.coords[1]*worldWidth)].tiles[this.coords[2]+(this.coords[3]*chunkSize)].Initialize();
		} else if (this.ore < .025){
			world[this.coords[0]+(this.coords[1]*worldWidth)].tiles[this.coords[2]+(this.coords[3]*chunkSize)] = new Malachite(this.x,this.y,this.coords,false);
			world[this.coords[0]+(this.coords[1]*worldWidth)].tiles[this.coords[2]+(this.coords[3]*chunkSize)].Initialize();
		};
	};
}

class Phylite extends Tile {
	constructor(x,y,coords,placed){
		super(x,y,coords,placed);
		this.number = 8;
		this.item = 8;
		this.maxHealth = 15;
		this.hardness = 5;

		this.health = this.maxHealth;
	}

	Initialize() {
		this.FindAdjacents();
		var gem = Math.random();
		if (gem > .99) {
			var gType = Math.random();
			if (gType < .24) {
				//Sapphire
				this.item = 75;
				this.overlay = 1;
			} else if (gType < .48) {
				//Emerald
				this.item = 76;
				this.overlay = 2;
			} else if (gType < .72) {
				//Ruby
				this.item = 77;
				this.overlay = 3;
			} else if (gType < .96) {
				//Onyx
				this.item = 78;
				this.overlay = 4;
			} else {
				//Diamond
				this.item = 79;
				this.overlay = 5;
            }
		};
	}
}

class Serpentinite extends Tile {
	constructor(x,y,coords,placed){
		super(x,y,coords,placed);
		this.number = 9;
		this.item = 9;
		this.maxHealth = 18;
		this.hardness = 5;

		this.health = this.maxHealth;
	}

	Initialize() {
		this.FindAdjacents();
		var gem = Math.random();
		if (gem > .99) {
			var gType = Math.random();
			if (gType < .24) {
				//Sapphire
				this.item = 75;
				this.overlay = 1;
			} else if (gType < .48) {
				//Emerald
				this.item = 76;
				this.overlay = 2;
			} else if (gType < .72) {
				//Ruby
				this.item = 77;
				this.overlay = 3;
			} else if (gType < .96) {
				//Onyx
				this.item = 78;
				this.overlay = 4;
			} else {
				//Diamond
				this.item = 79;
				this.overlay = 5;
			}
		};
	}
}

class Gabbro extends Tile {
	constructor(x,y,coords,placed){
		super(x,y,coords,placed);
		this.number = 10;
		this.item = 10;
		this.maxHealth = 25;
		this.hardness = 6;

		this.health = this.maxHealth;
	}

	Initialize() {
		this.FindAdjacents();
		var gem = Math.random();
		if (gem > .99) {
			var gType = Math.random();
			if (gType < .24) {
				//Sapphire
				this.item = 75;
				this.overlay = 1;
			} else if (gType < .48) {
				//Emerald
				this.item = 76;
				this.overlay = 2;
			} else if (gType < .72) {
				//Ruby
				this.item = 77;
				this.overlay = 3;
			} else if (gType < .96) {
				//Onyx
				this.item = 78;
				this.overlay = 4;
			} else {
				//Diamond
				this.item = 79;
				this.overlay = 5;
			}
		};
	}
}

class Granite extends Tile {
	constructor(x,y,coords,placed){
		super(x,y,coords,placed);
		this.number = 11;
		this.item = 11;
		this.maxHealth = 25;
		this.hardness = 6;

		this.health = this.maxHealth;
	}

	Initialize() {
		this.FindAdjacents();
		var gem = Math.random();
		if (gem > .99) {
			var gType = Math.random();
			if (gType < .24) {
				//Sapphire
				this.item = 75;
				this.overlay = 1;
			} else if (gType < .48) {
				//Emerald
				this.item = 76;
				this.overlay = 2;
			} else if (gType < .72) {
				//Ruby
				this.item = 77;
				this.overlay = 3;
			} else if (gType < .96) {
				//Onyx
				this.item = 78;
				this.overlay = 4;
			} else {
				//Diamond
				this.item = 79;
				this.overlay = 5;
			}
		};
	}
}

class Pegmatite extends Tile {
	constructor(x,y,coords,placed){
		super(x,y,coords,placed);
		this.number = 12;
		this.item = 12;
		this.maxHealth = 30;
		this.hardness = 7;

		this.health = this.maxHealth;
	}

	Initialize() {
		this.FindAdjacents();
		var gem = Math.random();
		if (gem > .99) {
			var gType = Math.random();
			if (gType < .24) {
				//Sapphire
				this.item = 75;
				this.overlay = 1;
			} else if (gType < .48) {
				//Emerald
				this.item = 76;
				this.overlay = 2;
			} else if (gType < .72) {
				//Ruby
				this.item = 77;
				this.overlay = 3;
			} else if (gType < .96) {
				//Onyx
				this.item = 78;
				this.overlay = 4;
			} else {
				//Diamond
				this.item = 79;
				this.overlay = 5;
			}
		};
	}
}

class Periodite extends Tile {
	constructor(x,y,coords,placed){
		super(x,y,coords,placed);
		this.number = 13;
		this.item = 13;
		this.maxHealth = 40;
		this.hardness = 8;

		this.health = this.maxHealth;
	}

	Initialize() {
		this.FindAdjacents();
		var gem = Math.random();
		if (gem > .99) {
			var gType = Math.random();
			if (gType < .24) {
				//Sapphire
				this.item = 75;
				this.overlay = 1;
			} else if (gType < .48) {
				//Emerald
				this.item = 76;
				this.overlay = 2;
			} else if (gType < .72) {
				//Ruby
				this.item = 77;
				this.overlay = 3;
			} else if (gType < .96) {
				//Onyx
				this.item = 78;
				this.overlay = 4;
			} else {
				//Diamond
				this.item = 79;
				this.overlay = 5;
			}
		};
	}
} 

class Malachite extends Tile {
	constructor(x,y,coords,placed){
		super(x,y,coords,placed);
		this.number = 14;
		this.item = 14;
		this.maxHealth = 5;
		this.hardness = 1;

		this.health = this.maxHealth;
	}
} 

class Cassiterite extends Tile {
	constructor(x,y,coords,placed){
		super(x,y,coords,placed);
		this.number = 15;
		this.item = 15;
		this.maxHealth = 5;
		this.hardness = 1;

		this.health = this.maxHealth;
	}
}

class Hematite extends Tile {
	constructor(x,y,coords,placed){
		super(x,y,coords,placed);
		this.number = 16;
		this.item = 16;
		this.maxHealth = 7;
		this.hardness = 1;

		this.health = this.maxHealth;
	}
}

class Furnace extends Tile {
	constructor(x,y,coords,placed){
		super(x,y,coords,placed);
		this.number = 17;
		this.item = 17;
		this.maxHealth = 7;
		this.hardness = 0;

		this.health = this.maxHealth;
		this.stationID = stationNum;
		stationNum++;
		stations.push( [17,this.x,this.y, this.stationID] );
	}

	Destroy(){
		super.Destroy();
		for(var d=0;d<stations.length;d++){
			if(stations[d][3] == this.stationID){
				stations.splice(d,1);
				break;
			};
		};
	};
}

class Anvil extends Tile {
	constructor(x, y, coords, placed) {
		super(x, y, coords, placed);
		this.number = 18;
		this.item = 18;
		this.maxHealth = 30;
		this.hardness = 0;

		this.health = this.maxHealth;
		this.stationID = stationNum;
		stationNum++;
		stations.push([18, this.x, this.y, this.stationID]);
	}

	Destroy() {
		super.Destroy();
		for (var d = 0; d < stations.length; d++) {
			if (stations[d][3] == this.stationID) {
				stations.splice(d, 1);
				break;
			};
		};
	};
}

class Bedrock extends Tile {
	constructor(x, y, coords, placed) {
		super(x, y, coords, placed);
		this.number = 19;
		this.item = 19;
		this.maxHealth = 1000;
		this.hardness = 1000;

		this.health = this.maxHealth;
	}
}