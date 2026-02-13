var playerRadius = 20;
var playerSpeed = 1;
var playerSprintSpeed = 1.5;
var maxXSpeed = 3;
var maxXSpeedSprint = 5;
var maxYSpeed = 20;
var jumpSpeed = -10.5;
var friction = .8;
var collisionPadding = 1;
var gravity = .5;
var xMargin = 0;
var timeStepsPerFrame = 5;
var reach = 4;
var currentMaxSpeed = maxXSpeed;
var currentSpeed = playerSpeed;

var darknessBase = 3;
var darknessMaxAtY = 13
var darknessMin = 100;
var darknessPercent = 1;


class Player {
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.vx = 0;
		this.vy = 0;
		this.r = playerRadius;
		this.speed = playerSpeed;
		this.jumpSpeed = jumpSpeed;
		this.canJump = false;
		this.inventory = [ [-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0] ];
		this.selected = 0;
		this.pickPower = 1;
		this.pickHardness = 2;
		this.holding = new CopperPickaxe();
		this.head = false;
		this.body = false;
	};

	Update(){
		this.vx *= friction;
		//this.vy *= friction;
		if(keys[4]){
			currentMaxSpeed = maxXSpeedSprint;
			this.speed = playerSprintSpeed;
		} else {
			currentMaxSpeed = maxXSpeed;
			this.speed = playerSpeed;
		};

		var dx = this.x;
		var dy = this.y;
		for(var t=0;t<timeStepsPerFrame;t++){
			this.vy += (gravity/timeStepsPerFrame);

			if(keys[0] && this.canJump){
				this.vy = this.jumpSpeed;
				this.canJump = false;};
			if(keys[1]){this.vx -= (this.speed/timeStepsPerFrame)};
			if(keys[2]){this.vy += (this.speed/timeStepsPerFrame)};
			if(keys[3]){this.vx += (this.speed/timeStepsPerFrame)};

			if(this.vx > currentMaxSpeed){this.vx = currentMaxSpeed};
			if(this.vx < -currentMaxSpeed){this.vx = -currentMaxSpeed};
			if(this.vy > maxYSpeed){this.vy = maxYSpeed};
			if(this.vy < -maxYSpeed){this.vy = -maxYSpeed};
			
			this.x += (this.vx/timeStepsPerFrame);
			this.y += (this.vy/timeStepsPerFrame);

			for(var i=0;i<world.length;i++){

				if(world[i].chunkX*(chunkSize*tileSize)+(chunkSize*tileSize) > player.x-25 && world[i].chunkX*(chunkSize*tileSize) < player.x+25){
					if(world[i].chunkY*(chunkSize*tileSize)+(chunkSize*tileSize) > player.y-25 && world[i].chunkY*(chunkSize*tileSize) < player.y+25){
						for(var j=0;j<world[i].tiles.length;j++){
							if(world[i].tiles[j] != false){
								this.Collision(world[i].tiles[j],world[i].tiles[j].adj[0],world[i].tiles[j].adj[1],world[i].tiles[j].adj[2],world[i].tiles[j].adj[3]);
							};
						};
					};	
				};
			};
		};

		mouseX += (this.x-dx);
		mouseY += (this.y-dy);

		this.Draw();
	}

	Draw(){
		ctx.drawImage(playerSprite, this.x-playerRadius,this.y-playerRadius,playerRadius*2,playerRadius*2);

		darknessPercent = darknessBase-((this.y/tileSize)/darknessMaxAtY);
		if(darknessPercent < 0){
			darknessPercent = 0;
		} else if (darknessPercent > 1){
			darknessPercent = 1;
		}

		ctx.beginPath();
		ctx.arc(this.x,this.y,canvas.width+500,0,Math.PI*2);
		ctx.moveTo(this.x,this.y);
		var darkness = ctx.createRadialGradient(this.x,this.y,0,this.x,this.y,darknessMin);
		darkness.addColorStop(1,"rgba(0,0,0,"+ (1-(darknessPercent)) +")");
		darkness.addColorStop(0,"rgba(0,0,0,0)");
		ctx.fillStyle = darkness;
		ctx.fill("evenodd");
		ctx.closePath();
		
	}

	AddItem(num){
		for(var inv=0;inv<10;inv++){
			if(this.inventory[inv][0] == num){
				if(this.inventory[inv][1] < 100){
					this.inventory[inv][1]++;
					return;
				};
			};
		};
		for(var inv=0;inv<10;inv++){
			if(this.inventory[inv][0] == -1){
				this.inventory[inv][0] = num;
				this.inventory[inv][1]++;
				return;
			};
		};
	}

	RemoveItem(slotNum,type,amount){
		if(slotNum != undefined){
			this.inventory[slotNum][1] -= amount;
			if(this.inventory[slotNum][1] <= 0){
				this.inventory[slotNum][0] = -1;
				this.inventory[slotNum][1] = 0;
			};
		} else {
			for(var inv=0;inv<10;inv++){
				if(this.inventory[inv][0] == type && this.inventory[inv][1] >= amount){
					this.inventory[inv][1] -= amount;
					if(this.inventory[inv][1] <= 0){
						this.inventory[inv][0] = -1;
						this.inventory[inv][1] = 0;
					};
					return(true);
				};
			};
			return(false);
		};
	}

	SearchForItem(type,amount){
		for(var inv=0;inv<10;inv++){
			if(this.inventory[inv][0] == type && this.inventory[inv][1] >= amount){
				return(true);
			};
		};
		return(false);
	}

	Equip(){
		switch(this.inventory[this.selected][0]){
			case 71:
				this.holding = new CopperPickaxe();
				this.RemoveItem(this.selected,undefined,1);
				this.pickHardness = this.holding.hardness;
				this.pickPower = this.holding.power;
			break;
			case 72:
				this.holding = new BronzePickaxe();
				this.RemoveItem(this.selected,undefined,1);
				this.pickHardness = this.holding.hardness;
				this.pickPower = this.holding.power;
			break;
			case 73:
				this.holding = new IronPickaxe();
				this.RemoveItem(this.selected,undefined,1);
				this.pickHardness = this.holding.hardness;
				this.pickPower = this.holding.power;
			break;
			case 74:
				this.holding = new SteelPickaxe();
				this.RemoveItem(this.selected,undefined,1);
				this.pickHardness = this.holding.hardness;
				this.pickPower = this.holding.power;
				break;
			//New Additions 1-4-23
			case 81:
				this.head = new MiningHelmet();
				this.RemoveItem(this.selected,undefined,1);
				darknessMin = this.head.light;
				break;
			case 82:
				this.holding = new DiamondPickaxe();
				this.RemoveItem(this.selected, undefined, 1);
				this.pickHardness = this.holding.hardness;
				this.pickPower = this.holding.power;
				break;
			case 83:
				this.head = new Flashlight();
				this.RemoveItem(this.selected, undefined, 1);
				darknessMin = this.head.light;
				break;
			case 84:
				this.head = new RubyStaff();
				this.RemoveItem(this.selected, undefined, 1);
				darknessMin = this.head.light;
				break;
		};
	};

	Unequip() {
		if(this.holding != false){
			this.inventory[this.selected] = [this.holding.number,1];
			this.holding = false;
			this.pickPower = 0;
			this.hardness = 0;
		};
	}

	//This is old code I'm trying to reuse,
	//these comments are me trying to figure it out :v
	Collision(tile,t,r,b,l) {

		//Find the points of the player's hitboxes
		var posX = this.x-(this.r);
		var posY = this.y-(this.r);
		var TL = {x : posX, y : posY};
		var TR = {x : posX+(this.r*2), y : posY};
		var BL = {x : posX, y : posY+(this.r*2)};
		var BR = {x : posX+(this.r*2), y : posY+(this.r*2)};

		//Find the tile's points
		var tileW = tile.w;
		var tileX = (tile.x);
		var tileY = (tile.y);
		var center = {x : tileX+(tileW/2), y : tileY+(tileW/2)};

		//console.log(tileY);

		//Did they collide?
		if(posX < tileX + tileW &&
   		 posX + (this.r*2) > tileX &&
   		 posY < tileY + tileW &&
   		 posY + (this.r*2) > tileY){
					
					//Is it a tile?
					if(tile.type == "tile"){
						//Is the player above the tile?
						if(this.y < center.y){
							//Is the player to the left of the tile?
							if(this.x < center.x){
								if(!t && BR.y <= tileY+collisionPadding){this.y = tileY-((this.r*2)/2);};
								if(!l && BR.x <= tileX+collisionPadding){this.x = tileX-((this.r*2)/2);};
							} else {
								if(!t && BL.y <= tileY+collisionPadding){this.y = tileY-((this.r*2)/2);};
								if(!r && BL.x >= tileX+tileW-collisionPadding){this.x = tileX+tileW+((this.r*2)/2)};
							};

							if(this.x > tileX-playerRadius+1 && this.x < tileX+tileW+playerRadius-1){
								this.canJump = true;
								this.vy = 0;
								this.y = tileY-((this.r*2)/2);
							};
						} else {
							//Is the player to the left of the tile?
							if(this.x < center.x){
								if(!b && TR.y >= tileY+tileW-collisionPadding){this.y = (tileY+tileW)+((this.r*2)/2)};
								if(!l && TR.x <= tileX+collisionPadding){this.x = tileX-((this.r*2)/2)};
							} else {
								if(!b && TL.y >= tileY+tileW-collisionPadding){this.y = (tileY+tileW)+((this.r*2)/2)};
								if(!r && TL.x >= tileX+tileW-(collisionPadding*2)){this.x = tileX+tileW+((this.r*2)/2)};
							};

							if(this.x > tileX-playerRadius+1 && this.x < tileX+tileW+playerRadius-1){
								this.vy = 0;
							};
						};
					};
			};
	}
}