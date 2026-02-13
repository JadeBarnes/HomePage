function Player (px,py) {
	this.meshX = px;
	this.meshY = py;
	this.x = ((this.meshX*(500/(chunkSize*2))) + ((500/(chunkSize*2))/2));
	this.y = ((this.meshY*(500/(chunkSize*2))) + ((500/(chunkSize*2))/2));
	this.gridX = 0;
	this.gridY = 0;
	this.velx = 0;
	this.vely = 0;

	this.r = 5.5;
	this.circleHitbox = 6;
	this.squareHithox = 10;

	this.maxHealth = 20;
	this.health = 20;
	this.spd = 1.2;
	this.iFrames = 0;

	this.selected = 0;
	this.weapons = [false,false,false];

	this.lag = 0;

	this.color = "rgb("+(255*(this.health/this.maxHealth))+",0,0)";

	this.Update = function () {
		//Movement
		this.x += this.velx;
		this.y += this.vely;
		if(keys[0]){this.y -= this.spd};
		if(keys[1]){this.x -= this.spd};
		if(keys[2]){this.y += this.spd};
		if(keys[3]){this.x += this.spd};

		if(this.weapons[this.selected] != false){
			if(keys[5]){this.weapons[this.selected].Shoot("up");};
			if(keys[6]){this.weapons[this.selected].Shoot("left");};
			if(keys[7]){this.weapons[this.selected].Shoot("down");};
			if(keys[8]){this.weapons[this.selected].Shoot("right");};
			this.weapons[this.selected].Update();
		};

		for(t=0;t<localMap.length;t++){
			if(localMap[t] != false){
				if(localMap[t].pass == false || localMap[t].type == "pickup"){
					this.Collision( localMap[t], localMap[t].adjacent[0], localMap[t].adjacent[1], localMap[t].adjacent[2], localMap[t].adjacent[3]);
				};
			};
		};

		if(this.iFrames === 0){
			for(t=0;t<enemies.length;t++){
				var d = Distance(this.x,this.y,enemies[t].x,enemies[t].y);
				if(d <= this.r+enemies[t].r){
					this.Hit(2);
					break;
				};
			};
			for(var g=0;g<explosions.length;g++){
				var c = Math.sqrt(Math.pow(explosions[g].x-this.x,2) + Math.pow(explosions[g].y-this.y,2));
				if(c <= this.r + explosions[g].currentSize){
					this.Hit( Math.floor(explosions[g].damage/2) );
					break;
				};
			};
		} else {
			this.iFrames--;
		};

		for(t=0;t<pickups.length;t++){
			var d = Distance(this.x,this.y,pickups[t].x,pickups[t].y);
			if(d <= this.r+pickups[t].r){
				this.health += pickups[t].hp;
				pickups.splice(t,1);
				if(this.health > this.maxHealth){this.health = this.maxHealth};
			};
		};

		this.gridX = Math.floor((this.x/500)*chunkSize);
		this.gridY = Math.floor((this.y/500)*chunkSize);

		this.meshX = Math.floor((this.x/500)*(chunkSize*2));
		this.meshY = Math.floor((this.y/500)*(chunkSize*2));

		this.Draw();

		if(keys[9]){this.selected = 0;};
		if(keys[10]){this.selected = 1;};
		if(keys[11]){this.selected = 2;};
		
		hpDisp.innerHTML = "Health: " + this.health;
		if(this.weapons[0] != false){
			gun1.innerHTML = this.weapons[0].type + ": " + this.weapons[0].ammo;
		} else {gun1.innerHTML = "[Empty]"};
		if(this.weapons[1] != false){
			gun2.innerHTML = this.weapons[1].type + ": " + this.weapons[1].ammo;
		} else {gun2.innerHTML = "[Empty]"};
		if(this.weapons[2] != false){
			gun3.innerHTML = this.weapons[2].type + ": " + this.weapons[2].ammo;
		} else {gun3.innerHTML = "[Empty]"};
		if(this.selected == 0){gun1.innerHTML = ">>" + gun1.innerHTML};
		if(this.selected == 1){gun2.innerHTML = ">>" + gun2.innerHTML};
		if(this.selected == 2){gun3.innerHTML = ">>" + gun3.innerHTML};

		if(this.health <= 0){

			if(cookie === '' || cookie < highScore){
				setCookie("highScore", highScore, 7);
			} else {
				highScore = cookie;
			};

			var tryAgain = confirm("You have been killed.\n-------------------- \nZombies Killed: "+zombiesKilled+" \nTime Survived: "+ Math.floor(timeSurvived/100) +" \nChunks Explored: "+ explored.length +" \nLevels Cleared: "+ level +" \n-------------------- \nFinal Score: "+ score +"\nTry Again?");
			clearInterval(loop);
			if(tryAgain === true){
				//location.reload();
				score = 0;
				Start(true);
			};
		};
	};

	this.Hit = function(damage){
		this.health -= damage;
		this.iFrames = 100;
	};

	this.Draw = function () {
		if(this.iFrames>0 && this.iFrames % 2 === 0){
			this.color = "rgb(255,255,255)";
		} else {
			this.color = "rgb("+(255*(this.health/this.maxHealth))+",0,0)";
		};
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.strokeStyle = "rgb(0,0,50)";
		ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	};

	this.Collision = function(tile,t,r,b,l) {
		//tile is the tile we're colliding with
		//t, r, b, and l are the adjacent tiles (top, right, bottom, left respectively)
		
		//Our position
		var posX = this.x-(this.squareHithox/2);
		var posY = this.y-(this.squareHithox/2);
		//Our hitboxes corners (Top left, top right, bottom left, and bottom right respectively)
		var TL = {x : posX, y : posY};
		var TR = {x : posX+this.squareHithox, y : posY};
		var BL = {x : posX, y : posY+this.squareHithox};
		var BR = {x : posX+this.squareHithox, y : posY+this.squareHithox};
		
		//The tile's width, x, y, and center respectively
		var tileW = tile.w;
		var tileX = (tile.x*tileW);
		var tileY = (tile.y*tileW);
		var center = {x : tileX+(tileW/2), y : tileY+(tileW/2)};
			//This is to match the smaller graphics of a pickup
		if(tile.type == "pickup"){
			tileX = tile.posx+(tile.w/2);
			tileY = tile.posy+(tile.w/2);
		};
		
		var magicConstant = this.spd + 0.1;
		
		//Detect if we're inside a tile
		if(posX < tileX + tileW &&
   		   posX + this.squareHithox > tileX &&
   		   posY < tileY + tileW &&
   		   posY + this.squareHithox > tileY){
			   
					
					if(tile.type == "tile"){
						//Inside a tile
						if(this.y < center.y){
							if(this.x < center.x){
								//Left of the tile's center
								if(!t && BR.y <= tileY+magicConstant){
									//Above the tile's center
									this.y = tileY-(this.squareHithox/2)
								};
								if(!l && BR.x <= tileX+magicConstant){
									//Above the tile's center
									this.x = tileX-(this.squareHithox/2)
								};
							} else {
								//Right of the tile's center
								if(!t && BL.y <= tileY+magicConstant){this.y = tileY-(this.squareHithox/2)};
								if(!r && BL.x >= tileX+tileW-magicConstant){this.x = tileX+tileW+(this.squareHithox/2)};
							};
						} else {
							if(this.x < center.x){
								if(!b && TR.y >= tileY+tileW-magicConstant){this.y = (tileY+tileW)+(this.squareHithox/2)};
								if(!l && TR.x <= tileX+magicConstant){this.x = tileX-(this.squareHithox/2)};
							} else {
								if(!b && TL.y >= tileY+tileW-magicConstant){this.y = (tileY+tileW)+(this.squareHithox/2)};
								if(!r && TL.x >= tileX+tileW-(magicConstant * 2)){this.x = tileX+tileW+(this.squareHithox/2)};
							};
						};
					} else if (tile.type == "pickup"){
						if(this.weapons[0].type === tile.loot.type){this.weapons[0].ammo += tile.loot.ammo}
						else if(this.weapons[1].type === tile.loot.type){this.weapons[1].ammo += tile.loot.ammo}
						else if(this.weapons[2].type === tile.loot.type){this.weapons[2].ammo += tile.loot.ammo}
						else {this.weapons[this.selected] = tile.loot;};
						for(var q=0;q<localMap.length;q++){
							if(localMap[q] === tile){
								localMap.splice(q,1,false);
								MapDisplay();
							};
						};
					} else if (tile.type == "goal"){
						level++;
						timeLeft = maxTime;
						this.x = -100;
						this.y = -100;
						difficulty += .25;
						Start(false);
					};
		};
	};
}

console.log("4 - Player loaded");