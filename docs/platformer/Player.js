function Player(p0x,p0y,   v0x,v0y) {
	
	this.respawnPos = {x : p0x, y : p0y};
	
	this.pos = {x : p0x,y : p0y};
	this.vel = {x : v0x,y : v0y};
	this.acc = {x : 0, y : 0};
	this.dim = {w : 15, h : 15};
	
	this.airFriction = 0.99;
	this.groundFriction = 0.90;
	
	this.health = 20;
	this.maxHealth = 20;
	
	this.Update = function() {
	
		//Update Movement
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
		
		
		if(this.vel.x < 1 && this.vel.x > -1){
			this.vel.x += this.acc.x;
		};
		if(this.vel.y < 15){
			this.vel.y += this.acc.y;
		};
		
		this.acc.x = 0;
		this.acc.y = .5;
		
		var collide = undefined;
		
		for(n=0;n<objects.length;n++){
		
			var closestDir = null;
		
			if(objects[n].type === "Box"){
				
				var dir = SquareCollide({
				x : this.pos.x,
				y : this.pos.y,
				w : this.dim.w,
				h : this.dim.h},
				
				{x : objects[n].pos.x,
				 y : objects[n].pos.y,
				 w : objects[n].dim.w,
				 h : objects[n].dim.h });
			};
			
			if(objects[n].type === "Exit"){
			
				var dir = SquareCollide({
				x : this.pos.x,
				y : this.pos.y,
				w : this.dim.w,
				h : this.dim.h},
				
				{x : objects[n].pos.x,
				 y : objects[n].pos.y,
				 w : objects[n].dim.w,
				 h : objects[n].dim.h});
				 
				 if(dir != "none"){Load()}
			};
			
			if(objects[n].type === "Lava"){
			
				var dir = SquareCollide({
				x : this.pos.x,
				y : this.pos.y,
				w : this.dim.w,
				h : this.dim.h},
				
				{x : objects[n].pos.x+2,
				 y : objects[n].pos.y+2,
				 w : objects[n].dim.w-4,
				 h : objects[n].dim.h-4});
				 
				 if(dir != "none"){this.Die()}
			};
			
			
		
		if(dir === "top"){
			this.pos.y = (objects[n].pos.y - this.dim.h);
			this.vel.y = 0;
			this.canJump = true
			
			this.vel.x *= this.groundFriction;
		}
		else if(dir === "bottom"){this.pos.y = (objects[n].pos.y + objects[n].dim.h); this.vel.y = +2}
		else if(dir === "left"){this.pos.x = (objects[n].pos.x - this.dim.w); this.vel.x = 0; this.canJump = true}
		else if(dir === "right"){this.pos.x = (objects[n].pos.x + objects[n].dim.w); this.vel.x = 0; this.canJump = true}
		
		if(dir != "none"){collide = dir};
		
		};
		
		this.vel.x *= this.groundFriction
		
		if(keys[38]){this.Move("jump", collide)};
		if(keys[40]){this.Move("down", collide)};
		if(keys[39]){this.Move("left", collide)};
		if(keys[37]){this.Move("right", collide)};
		
		
		if(this.health <= 0 || this.pos.x > c.width || this.pos.x < -this.dim.w || this.pos.y > c.height || this.pos.y < -this.dim.h){
			this.Die();
		};
		
		this.Draw();
	};
	
	this.Die = function(){
    if(lives > 0){
		  player = new Player(this.respawnPos.x,this.respawnPos.y,0,0);
      lives--;
    } else {
      level = undefined;
      Load();
      lives = 199;
    };
	};
	
	this.Damage = function(damage){
		this.health -= damage;
		if(this.health <= 0){this.Die()};
	};
	
	this.Move = function(type, dir) {
		if(type === "jump" && this.canJump && dir === "top"){this.vel.y = -6; this.canJump = false};
		if(type === "jump" && this.canJump && dir === "left"){this.vel.y = -10; this.vel.x = -6; this.canJump = false;};
		if(type === "jump" && this.canJump && dir === "right"){this.vel.y = -10; this.vel.x = 6; this.canJump = false;};
		if(type === "down"){this.vel.y += 1};
		if(type === "left"){this.vel.x += 1};
		if(type === "right"){this.vel.x += -1};
	}
	
	this.Draw = function() {
		ctx.beginPath();
		ctx.rect(this.pos.x,this.pos.y, this.dim.h, this.dim.w);
		ctx.fillStyle = "rgb(" + (100+(155 * (this.health / this.maxHealth))) + ",0,0)";
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	};
};