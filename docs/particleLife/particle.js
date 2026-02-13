class _Particle {
	constructor(type){
		this.type = type;
		this.attractions = _typeData[type];
		this.pos = {x:Math.random()*_width,y:Math.random()*_height};
		this.vel = {x:0,y:0};
		this.acc = {x:0,y:0};
		this.range = _typeRange[type];
	}
	
	_PhysicsUpdate(){
		this._ApplyForces();
	};
	
	_Update(){
		//Line(this.pos.x,this.pos.y,this.pos.x+this.acc.x*100,this.pos.y+this.acc.y*100);
		this.vel = _Add(this.vel,this.acc);
		this.vel.x *= _drag;
		this.vel.y *= _drag;
		if(this.vel.x > _speedLimit){
			this.vel.x = _speedLimit;
		};
		if(this.vel.x < -_speedLimit){
			this.vel.x = -_speedLimit;
		};
		if(this.vel.y > _speedLimit){
			this.vel.y = _speedLimit;
		};
		if(this.vel.y < -_speedLimit){
			this.vel.y = -_speedLimit;
		};
		this.pos = _Add(this.pos,this.vel);
		this.acc.x = 0;
		this.acc.y = 0;
		if(_edgeMode === "solid"){
			if(this.pos.x < 0){
				this.pos.x = 0;
			};
			if(this.pos.x > _width){
				this.pos.x = _width;
			};
			if(this.pos.y < 0){
				this.pos.y = 0;
			};
			if(this.pos.y > _height){
				this.pos.y = _height;
			};
		};
		_Circle(this.pos.x,this.pos.y,3,this.type);
		//LineCircle(this.pos.x,this.pos.y,this.range,this.type);
	};
	
	_ApplyForces(){
		for(var p1=0;p1<_particles.length;p1++){
			if(_particles[p1] != this){
				var prt = _particles[p1];
				var dist = _Dist(this.pos,prt.pos);
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
					if(force > _maxForce){
						force = _maxForce;
					};
					if(force < -_maxForce){
						force = -_maxForce;
					};
					if(dist<_colRange){
						force += _colForce;
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
};