function Box(width,height, isStatic,  p0x,p0y,  v0x,v0y) {
	this.type = "Box";
	this.static = isStatic;
	this.pos = {x : p0x,y : p0y};
	this.vel = {x : v0x,y : v0y};
	this.acc = {x : 0,y : 0};
	this.dim = {w : width,h : height};
	
	this.Update = function() {
	
		if(this.static != true){
			//Update Movement
			this.pos.x += this.vel.x;
			this.pos.y += this.vel.y;


			this.vel.x += this.acc.x;
			if(this.vel.y < 15){
				this.vel.y += this.acc.y;
			};

			this.acc.x = 0;
			this.acc.y = .5;
		};
		
		
		
		this.Draw();
	};
	
	this.Draw = function() {
		ctx.beginPath();
		ctx.rect(this.pos.x,this.pos.y, this.dim.w, this.dim.h);
		ctx.fillStyle = "rgb(0,0,0)";
		ctx.strokeStyle = "rgb(0,0,0)";
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	};
}

function Exit(width,height, p0x,p0y) {
	this.type = "Exit";
	this.pos = {x : p0x,y : p0y};
	this.dim = {w : width,h : height};
	
	this.Update = function() {
		this.Draw();
	};
	
	this.Draw = function() {
		ctx.beginPath();
		ctx.rect(this.pos.x,this.pos.y, this.dim.w, this.dim.h);
		ctx.fillStyle = "rgb(0,0,255)";
		ctx.strokeStyle = "rgb(0,0,0)";
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	};
}

function Lava(width,height, p0x,p0y) {
	this.type = "Lava";
	this.pos = {x : p0x,y : p0y};
	this.dim = {w : width,h : height};
	
	this.Update = function() {
		this.Draw();
	};
	
	this.Draw = function() {
		ctx.beginPath();
		ctx.rect(this.pos.x,this.pos.y, this.dim.w, this.dim.h);
		ctx.fillStyle = "rgb(255,0,0)";
		ctx.strokeStyle = "rgb(200,0,0)";
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	};
}