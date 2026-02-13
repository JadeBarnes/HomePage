var bullets = [];
var explosions = [];

class Gun {
	constructor(ammo) {
		this.ammo = ammo;
	}

	Shoot (direction) {
		if(this.lag == 0){
			bullets.push(new Bullet({x : player.x,y : player.y}, FindVelocity(this.velocity,this.accuracy,direction), this.damage, bullets.length));
			this.ammo--;
			this.lag = this.lagVar;
		};
	}

	Update(){
		if(this.lag > 0){this.lag--};
		if(this.ammo == 0){player.weapons[player.selected] = false};
	}
}

class Pistol extends Gun {
	constructor(ammo) {
		super(ammo);
		this.type = "Pistol";
		this.damage = 4;
		this.lag = 0;
		this.lagVar = 45;
		this.velocity = 3;
		this.accuracy = 4;
	}
}

class AssaultRifle extends Gun {
	constructor(ammo) {
		super(ammo);
		this.type = "Assault Rifle";
		this.damage = 5;
		this.lag = 0;
		this.lagVar = 15;
		this.velocity = 3.5;
		this.accuracy = 3;
	}
}

class Minigun extends Gun {
	constructor(ammo) {
		super(ammo);
		this.type = "Minigun";
		this.damage = 2;
		this.lag = 0;
		this.lagVar = 1;
		this.velocity = 3;
		this.accuracy = 7;
	}
}

class Rifle extends Gun {
	constructor(ammo) {
		super(ammo);
		this.type = "Rifle";
		this.damage = 15;
		this.lag = 0;
		this.lagVar = 90;
		this.velocity = 5;
		this.accuracy = 0;
	}
}

class Shotgun extends Gun {
	constructor(ammo) {
		super(ammo);
		this.type = "Shotgun";
		this.damage = 3;
		this.lag = 0;
		this.lagVar = 100;
		this.velocity = 2;
		this.accuracy = 15;
		this.velFeather = .2;
		this.bulletsPerShell = 12;
	}

	Shoot (direction) {
		if(this.lag == 0){
			for(var e=0;e<this.bulletsPerShell;e++){
				bullets.push(new Bullet({x : player.x,y : player.y}, FindVelocity(this.velocity+(((Math.random()*2)-1)*this.velFeather),this.accuracy,direction), this.damage, bullets.length));
			};
			this.ammo--;
			this.lag = this.lagVar;
		};
	}
}

class SuperShotgun extends Gun {
	constructor(ammo) {
		super(ammo);
		this.type = "Super Shotgun";
		this.damage = 4;
		this.lag = 0;
		this.lagVar = 150;
		this.velocity = 3;
		this.accuracy = 35;
		this.velFeather = 1;
		this.bulletsPerShell = 100;
	}

	Shoot (direction) {
		if(this.lag == 0){
			for(var e=0;e<this.bulletsPerShell;e++){
				bullets.push(new Bullet({x : player.x,y : player.y}, FindVelocity(this.velocity+(((Math.random()*2)-1)*this.velFeather),this.accuracy,direction), this.damage, bullets.length));
			};
			this.ammo--;
			this.lag = this.lagVar;
		};
	}
}

class PlasmaRifle extends Gun {
	constructor(ammo) {
		super(ammo);
		this.type = "Plasma Rifle";
		this.damage = 5;
		this.lag = 0;
		this.lagVar = 10;
		this.velocity = 4;
		this.accuracy = 2;
	}

	Shoot (direction) {
		if(this.lag == 0){
			bullets.push(new Plasma({x : player.x,y : player.y}, FindVelocity(this.velocity,this.accuracy,direction), this.damage));
			this.ammo--;
			this.lag = this.lagVar;
		};
	}
}

class RPG extends Gun {
	constructor(ammo) {
		super(ammo);
		this.type = "RPG";
		this.damage = 15;
		this.lag = 0;
		this.lagVar = 150;
		this.velocity = 3;
		this.accuracy = 1;
	}

	Shoot (direction) {
		if(this.lag == 0){
			bullets.push(new Rocket({x : player.x,y : player.y}, FindVelocity(this.velocity,this.accuracy,direction), this.damage));
			this.ammo--;
			this.lag = this.lagVar;
		};
	}
}

class SingularityCannon extends Gun {
	constructor(ammo) {
		super(ammo);
		this.type = "Singularity Cannon";
		this.damage = 999;
		this.lag = 0;
		this.lagVar = 200;
		this.velocity = 3;
		this.accuracy = 1;
	}

	Shoot (direction) {
		if(this.lag == 0){
			bullets.push(new Singularity({x : player.x,y : player.y}, FindVelocity(this.velocity,this.accuracy,direction), this.damage));
			this.ammo--;
			this.lag = this.lagVar;
		};
	}
}

class PlasmaPulser extends Gun {
	constructor(ammo) {
		super(ammo);
		this.type = "Plasma Pulser";
		this.damage = 10;
		this.lag = 0;
		this.lagVar = 300;
		this.velocity = 4;
		this.accuracy = 360;
		this.velFeather = 0;
		this.bulletsPerShell = 500;
	}

	Shoot (direction) {
		if(this.lag == 0){
			for(var e=0;e<this.bulletsPerShell;e++){
				bullets.push(new Plasma({x : player.x,y : player.y}, FindVelocity(this.velocity,this.accuracy,direction), this.damage));
			};
			this.ammo--;
			this.lag = this.lagVar;
		};
	}
}

class Submachinegun extends Gun {
  constructor(ammo) {
    super(ammo);
    this.type = "Submachine Gun";
    this.damage = 3;
    this.lag = 0;
    this.lagVar = 10;
    this.velocity = 4;
    this.accuracy = 5;
  }
}

class FragGrenade extends Gun {
  constructor(ammo) {
    super(ammo);
    this.type = "HE Grenades";
    this.damage = 0;
    this.lag = 0;
    this.lagVar = 100;
    this.velocity = 3;
    this.accuracy = 5;
  }
  
  Shoot (direction) {
		if(this.lag == 0){
			for(var e=0;e<1;e++){
				bullets.push(new Grenade({x : player.x,y : player.y}, FindVelocity(this.velocity,this.accuracy,direction), this.damage, undefined, 100, 40, 10, 100, [0,100,0], [255,0,0]));
			};
			this.ammo--;
			this.lag = this.lagVar;
		};
	}
}

class StunGrenade extends Gun {
  constructor(ammo) {
    super(ammo);
    this.type = "Flashbangs";
    this.damage = 0;
    this.lag = 0;
    this.lagVar = 100;
    this.velocity = 3;
    this.accuracy = 5;
  }
  
  Shoot (direction) {
		if(this.lag == 0){
			for(var e=0;e<1;e++){
				bullets.push(new Grenade({x : player.x,y : player.y}, FindVelocity(this.velocity,this.accuracy,direction), this.damage, undefined, 100, 100, 1, 500, [200,200,0], [255,255,255]));
			};
			this.ammo--;
			this.lag = this.lagVar;
		};
	}
}

class PlasGrenade extends Gun {
  constructor(ammo) {
    super(ammo);
    this.type = "Plasma Grenades";
    this.damage = 0;
    this.lag = 0;
    this.lagVar = 100;
    this.velocity = 3;
    this.accuracy = 5;
  }
  
  Shoot (direction) {
		if(this.lag == 0){
			for(var e=0;e<1;e++){
				bullets.push(new PlasmaGrenade({x : player.x,y : player.y}, FindVelocity(this.velocity,this.accuracy,direction), this.damage, undefined, 100, 40, 10, 50, [0,0,200], [0,0,255]));
			};
			this.ammo--;
			this.lag = this.lagVar;
		};
	}
}




class Bullet {
	constructor(pos,vel,damage) {
		this.x = pos.x;
		this.y = pos.y;
		this.vx = vel.x;
		this.vy = vel.y;
		this.damage = damage;
		this.squareHithox = 2;
		this.r = 2;
	}

	Update() {
		this.x += this.vx;
		this.y += this.vy;
		if(this.x<-5 || this.y<-5 || this.x>505 || this.y>505){
			this.Destroy();
		};

		for(t=0;t<localMap.length;t++){
			if(localMap[t] != false){
				if(localMap[t].pass === false){
					if(this.Collision(localMap[t],localMap[t].adjacent[0],localMap[t].adjacent[1],localMap[t].adjacent[2],localMap[t].adjacent[3])){
						this.Destroy();
					};
				};
			};
		};

		this.Display();
	}

	Display() {
		ctx.beginPath();
		ctx.fillStyle = "rgb(50,50,50)";
		ctx.strokeStyle = "rgb(0,0,0)";
		ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
		ctx.stroke();
		ctx.fill();
		ctx.closePath();
	}

	Collision = function(tile,t,r,b,l) {
		var posX = this.x-(this.squareHithox/2);
		var posY = this.y-(this.squareHithox/2);
		var TL = {x : posX, y : posY};
		var TR = {x : posX+this.squareHithox, y : posY};
		var BL = {x : posX, y : posY+this.squareHithox};
		var BR = {x : posX+this.squareHithox, y : posY+this.squareHithox};
		var tileW = tile.w;

		var tileX = (tile.x*tileW);
		var tileY = (tile.y*tileW);

		var center = {x : tileX+(tileW/2), y : tileY+(tileW/2)};

		//var c = Math.sqrt(Math.pow(tileX-this.x,2) + Math.pow(tileY-this.y,2));

		if(posX < tileX + tileW &&
   		 posX + this.squareHithox > tileX &&
   		 posY < tileY + tileW &&
   		 posY + this.squareHithox > tileY){
				return(true);
		};
	}
	
	Destroy() {
		for(var g=0;g<bullets.length;g++){
			if (bullets[g] === this){
				bullets.splice(g,1);
				break;
			};
		};
	}
}

class Plasma extends Bullet {
	constructor(pos,vel,damage,arrayPos1) {
		super(pos,vel,damage,arrayPos1);
		this.splashDamage = 3;
		this.r = 2.5;
	}

	Display() {
		ctx.beginPath();
		ctx.fillStyle = "rgb(100,100,255)";
		ctx.strokeStyle = "rgb(0,0,0)";
		ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
		ctx.stroke();
		ctx.fill();
		ctx.closePath();
	}

	Destroy() {
		for(var g=0;g<bullets.length;g++){
			if (bullets[g] === this){
				bullets.splice(g,1);
				explosions.push(new Explosion(this.x,this.y,10,this.splashDamage,[0,0,255],5,2));
				break;
			};
		};
	}
}

class Grenade extends Bullet {
	constructor(pos,vel,damage,arrayPos1, _fuse, _radius, _splashDamage, _stun, _primeryColor, _explosionColor) {
		super(pos,vel,damage,arrayPos1);
		this.fuse = _fuse;
		this.splashDamage = _splashDamage;
		this.explosionRadius = _radius;
		this.colors = _explosionColor;
		this.colorNormal = _primeryColor;
		this.state = 0;
		this.drag = 0.95;
		this.stun = _stun;
	}

	Display() {
		if(this.fuse <= 50){
			this.state == 0 ? this.state = 1 : this.state = 0;
		};
		ctx.beginPath();
		ctx.fillStyle = (this.state == 0 ? "rgb("+this.colorNormal[0]+","+this.colorNormal[1]+","+this.colorNormal[2]+")" : "rgb(255,0,0)");
		ctx.strokeStyle = "rgb(0,0,0)";
		ctx.arc(this.x,this.y,4,0,2*Math.PI);
		ctx.stroke();
		ctx.fill();
		ctx.closePath();
	}

	Destroy() {
		for(var g=0;g<bullets.length;g++){
			if (bullets[g] === this){
				bullets.splice(g,1);
				//x,y,size,damage,color,rate,_stun
				explosions.push(new Explosion(this.x,this.y,this.explosionRadius,this.splashDamage,this.colors,10,this.stun));
				break;
			};
		};
	}
	
	Update() {
		this.fuse--;
		this.x += this.vx;
		this.y += this.vy;
		this.vx *= this.drag;
		this.vy *= this.drag;
		if(this.x<-5 || this.y<-5 || this.x>505 || this.y>505){
			//Stop moving
			this.vx = 0;
			this.vy = 0;
		};

		for(t=0;t<localMap.length;t++){
			if(localMap[t] != false){
				if(localMap[t].pass === false){
					if(this.Collision(localMap[t],localMap[t].adjacent[0],localMap[t].adjacent[1],localMap[t].adjacent[2],localMap[t].adjacent[3])){
						this.Destroy();
					};
				};
			};
		};
		
		this.Display();
		
		if(this.fuse <= 0){
			this.Destroy();
		};
	}
	
	Collision = function(tile,t,r,b,l) {
		var posX = this.x-(this.squareHithox/2);
		var posY = this.y-(this.squareHithox/2);
		var TL = {x : posX, y : posY};
		var TR = {x : posX+this.squareHithox, y : posY};
		var BL = {x : posX, y : posY+this.squareHithox};
		var BR = {x : posX+this.squareHithox, y : posY+this.squareHithox};
		var tileW = tile.w;

		var tileX = (tile.x*tileW);
		var tileY = (tile.y*tileW);

		var center = {x : tileX+(tileW/2), y : tileY+(tileW/2)};

		//var c = Math.sqrt(Math.pow(tileX-this.x,2) + Math.pow(tileY-this.y,2));

		if(posX < tileX + tileW &&
   		 posX + this.squareHithox > tileX &&
   		 posY < tileY + tileW &&
   		 posY + this.squareHithox > tileY){
				//On hit, stop moving
				this.vx = 0;
				this.vy = 0;
		};
	}
}

class PlasmaGrenade extends Grenade {
	constructor(pos,vel,damage,arrayPos1, _fuse, _radius, _splashDamage, _stun, _primeryColor, _explosionColor) {
		super(pos,vel,damage,arrayPos1, _fuse, _radius, _splashDamage, _stun, _primeryColor, _explosionColor);
		this.state = 0;
		this.drag = 0.95;
		this.fragments = 4;
		this.fling = 3
		this.fragmentsSlow = 4;
		this.flingSlow = 1
	}
	
	Destroy() {
		super.Destroy();
		for(var e=0;e<this.fragments;e++){
				bullets.push(new Grenade({x : this.x, y : this.y}, {x : (Math.random() * (this.fling*2)) - this.fling, y : (Math.random() * (this.fling*2)) - this.fling}, this.damage, undefined, 25 + (10 * Math.random()), 10, 4, 0, [0,0,200], [0,0,255]));
			};
		for(var e=0;e<this.fragmentsSlow;e++){
				bullets.push(new Grenade({x : this.x, y : this.y}, {x : (Math.random() * (this.flingSlow*2)) - this.flingSlow, y : (Math.random() * (this.flingSlow*2)) - this.flingSlow}, this.damage, undefined, 25 + (10 * Math.random()), 10, 4, 0, [0,0,200], [0,0,255]));
			};
	};
}

class Rocket extends Bullet {
	constructor(pos,vel,damage,arrayPos1) {
		super(pos,vel,damage,arrayPos1);
		this.splashDamage = 15;
		this.r = 3;
	}

	Display() {
		ctx.beginPath();
		ctx.fillStyle = "rgb(0,0,0)";
		ctx.strokeStyle = "rgb(255,0,0)";
		ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
		ctx.stroke();
		ctx.fill();
		ctx.closePath();
	}

	Destroy() {
		for(var g=0;g<bullets.length;g++){
			if (bullets[g] === this){
				bullets.splice(g,1);
				explosions.push(new Explosion(this.x,this.y,50,this.splashDamage,[255,0,0],5,100));
				break;
			};
		};
	}
}

class Singularity extends Bullet {
	constructor(pos,vel,damage,arrayPos1) {
		super(pos,vel,damage,arrayPos1);
		this.splashDamage = 15;
		this.r = 1;
	}

	Display() {
		ctx.beginPath();
		ctx.fillStyle = "rgb(0,0,0)";
		ctx.strokeStyle = "rgb(0,0,0)";
		ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
		ctx.stroke();
		ctx.fill();
		ctx.closePath();
	}

	Destroy() {
		for(var g=0;g<bullets.length;g++){
			if (bullets[g] === this){
				bullets.splice(g,1);
				explosions.push(new Explosion(this.x,this.y,300,this.splashDamage,[0,0,0], 5, 300));
				break;
			};
		};
	}
}







class Explosion {
	constructor(x,y,size,damage,color,rate,_stun){
		this.x = x;
		this.y = y;
		this.damage = damage;
		this.color = color;
		this.size = size;
		this.currentSize = 0;
		this.eRate = rate;
		this.mode = 0;
		this.life = 10;
		this.currentLife = this.life;
		this.alreadyHit = [];
		this.stun = _stun;
	}

	Update(){
		if(this.mode === 0){
			this.currentSize += this.eRate;
			if(this.currentSize >= this.size){
				this.currentSize = this.size;
				this.mode = 1;

				var needsUpdate = false;
				for(var q=0;q<localMap.length;q++){
					if(localMap[q] != false){
						var t=localMap[q];
						var tx = (t.x*(500/chunkSize));
						var ty = (t.y*(500/chunkSize));
						var c1 = Math.sqrt(Math.pow(tx-this.x,2) + Math.pow(ty-this.y,2));
						tx = (t.x*(500/chunkSize))+t.w;
						ty = (t.y*(500/chunkSize));
						var c2 = Math.sqrt(Math.pow(tx-this.x,2) + Math.pow(ty-this.y,2));
						tx = (t.x*(500/chunkSize));
						ty = (t.y*(500/chunkSize))+t.w;
						var c3 = Math.sqrt(Math.pow(tx-this.x,2) + Math.pow(ty-this.y,2));
						tx = (t.x*(500/chunkSize))+t.w;
						ty = (t.y*(500/chunkSize))+t.w;
						var c4 = Math.sqrt(Math.pow(tx-this.x,2) + Math.pow(ty-this.y,2));
						if(c1 <= this.size &&
							 c2 <= this.size &&
							 c3 <= this.size &&
							 c4 <= this.size){
								 if(this.damage > 1){localMap[q].Destroy();};
								 needsUpdate = true;
							 };
					};
				};
				if(needsUpdate){
					UpdateMesh();
					MapDisplay();
				};
			};
			this.Display();	
			
		} else {
			this.currentLife--;
			this.Display();
			if(this.currentLife == 0){
				for(var e=0;e<explosions.length;e++){
					if(explosions[e] === this){
						explosions.splice(e,1);
						break;
					};
				};
			};
		};
	}

	Display(){
		ctx.beginPath();
		ctx.fillStyle = "rgba("+this.color[0]+","+this.color[1]+","+this.color[2]+ ","+ (this.currentLife/this.life) +")";
		ctx.arc(this.x,this.y,this.currentSize,0,Math.PI*2);
		ctx.fill();
		ctx.closePath();
	}
}

function FindVelocity(velocity, angle, direction) {
	var v = velocity;
	var theta;
	var angle = angle*((Math.random()*2)-1);
	var outputx;
	var outputy;

	if (direction == "right"){
		theta = (angle * (Math.PI/180));
		outputx = (v * Math.cos(theta));
		outputy = (v * Math.sin(theta));
	} else if (direction == "down"){
		angle += 90;
		theta = (angle * (Math.PI/180));
		outputx = (v * Math.cos(theta));
		outputy = (v * Math.sin(theta));
	} else if (direction == "left"){
		angle += 180;
		theta = (angle * (Math.PI/180));
		outputx = (v * Math.cos(theta));
		outputy = (v * Math.sin(theta));
	} else if (direction == "up"){
		angle += 270;
		theta = (angle * (Math.PI/180));
		outputx = (v * Math.cos(theta));
		outputy = (v * Math.sin(theta));
	};

	return( {x:outputx,y:outputy} );
}

function SelectRandomGun(type) {
	if(type == "common"){
		var r = Math.random();
		if		  (r < .05){
			return(new Pistol(Infinity));
		} else if (r < .20) {
			return(new StunGrenade(2));
		} else if (r < .35) {
			return(new AssaultRifle(45));
		} else if (r < .55) {
			return(new Shotgun(15));
		} else if (r < .70) {
			return(new Submachinegun(60));
		} else if (r < .85) {
			return(new Rifle(20));
		} else {
			return(new FragGrenade(2));
		};
	} else {
		var r = Math.random();
		if        (r < .1429){
			return(new Minigun(500));
		} else if (r < .2858) {
			return(new SuperShotgun(10));
		} else if (r < .4287) {
			return(new PlasmaRifle(150));
		} else if (r < .5716) {
			return(new RPG(8));
		} else if (r < .7145) {
			return(new PlasmaPulser(5));
		} else if (r < .8574){
			return(new PlasGrenade(6));
		} else {
			return(new SingularityCannon(2));
		};
	};
}

console.log("6 - Guns loaded");