class Particle {
	constructor(type){
		this.type = type;
		this.attractions = typeData[type];
		this.pos = {x:Math.random()*width,y:Math.random()*height};
		this.vel = {x:0,y:0};
		this.acc = {x:0,y:0};
		this.range = typeRange[type];
	}
	
	PhysicsUpdate(){
		this.ApplyForces();
	};
	
	Update(){
		//Line(this.pos.x,this.pos.y,this.pos.x+this.acc.x*100,this.pos.y+this.acc.y*100);
		this.vel = Add(this.vel,this.acc);
		this.vel.x *= drag;
		this.vel.y *= drag;
		if(this.vel.x > speedLimit){
			this.vel.x = speedLimit;
		};
		if(this.vel.x < -speedLimit){
			this.vel.x = -speedLimit;
		};
		if(this.vel.y > speedLimit){
			this.vel.y = speedLimit;
		};
		if(this.vel.y < -speedLimit){
			this.vel.y = -speedLimit;
		};
		this.pos = Add(this.pos,this.vel);
		this.acc.x = 0;
		this.acc.y = 0;
		if(edgeMode === "solid"){
			if(this.pos.x < 0){
				this.pos.x = 0;
			};
			if(this.pos.x > width){
				this.pos.x = width;
			};
			if(this.pos.y < 0){
				this.pos.y = 0;
			};
			if(this.pos.y > height){
				this.pos.y = height;
			};
		};
		Circle(this.pos.x,this.pos.y,3,this.type);
		//LineCircle(this.pos.x,this.pos.y,this.range,this.type);
	};
	
	ApplyForces(){
		for(var p1=0;p1<particles.length;p1++){
			if(particles[p1] != this){
				var prt = particles[p1];
				var dist = Dist(this.pos,prt.pos);
				if(dist<this.range){
					if(prt.pos.x > this.pos.x && prt.pos.y < this.pos.y){
						var o = Math.abs(prt.pos.y - this.pos.y);
						var a = Math.abs(prt.pos.x - this.pos.x);
						var theta = Math.atan(o/a);
					} else if (prt.pos.x < this.pos.x && prt.pos.y < this.pos.y){
						var o = Math.abs(prt.pos.x - this.pos.x);
						var a = Math.abs(prt.pos.y - this.pos.y);
						var theta = Math.atan(o/a);
						theta += Math.PI/2;
					} else if (prt.pos.x < this.pos.x && prt.pos.y > this.pos.y){
						var o = Math.abs(prt.pos.y - this.pos.y);
						var a = Math.abs(prt.pos.x - this.pos.x);
						var theta = Math.atan(o/a);
						theta += Math.PI;
					} else if (prt.pos.x > this.pos.x && prt.pos.y > this.pos.y){
						var o = Math.abs(prt.pos.x - this.pos.x);
						var a = Math.abs(prt.pos.y - this.pos.y);
						var theta = Math.atan(o/a);
						theta += Math.PI*1.5;
					};
					
					//var force = .5;
					var force = this.attractions[prt.type]/(dist*dist);
					if(force > maxForce){
						force = maxForce;
					};
					if(force < -maxForce){
						force = -maxForce;
					};
					if(dist<colRange){
						force += colForce;
					};
					
					var yForce = (Math.sin(theta))*force;
					var xForce = (Math.cos(theta))*force;
					
					//console.log(force);
					
					prt.acc.x += xForce;
					prt.acc.y -= yForce;
				};
			};
		};
	};
}