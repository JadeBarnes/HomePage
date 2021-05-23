class Enemy {
	constructor(px,py){
		this.meshx = px;
		this.meshy = py;
		this.targety = this.meshy;
		this.targetx = this.meshx;
		this.x = ((this.meshx*(500/(chunkSize*2))) + ((500/(chunkSize*2))/2));
		this.y = ((this.meshy*(500/(chunkSize*2))) + ((500/(chunkSize*2))/2));
		this.moveTimer = 0;
		this.stuckTimer = 100;
		this.stunTimer = 50;

		this.speed = (.4+((.4*Math.random())*difficulty) );
		this.health = 8+(Math.floor(4*Math.random()*difficulty));
		this.r = 5;

		this.target = EFC(navMesh.grid,player.meshX,player.meshY,gridWidth,gridHeight);
		this.start = EFC(navMesh.grid,this.meshx,this.meshy,gridWidth,gridHeight);
		this.path = [];

		this.color = "rgb(70,150,0)";


		this.target = EFC(navMesh.grid,player.meshX,player.meshY,gridWidth,gridHeight);
		this.start = EFC(navMesh.grid,this.meshx,this.meshy,gridWidth,gridHeight);
		if(this.target === false || this.target === undefined){
			this.path = [EFC(navMesh.grid,this.meshx,this.meshy,gridWidth,gridHeight)];
		} else {
			this.path = navMesh.Search(this.start,this.target);
		}
		if(this.path === false){
			this.path = [EFC(navMesh.grid,this.meshx,this.meshy,gridWidth,gridHeight)];
		};
		this.targetx = ((this.path[this.path.length-1].x*(500/(chunkSize*2))) + ((500/(chunkSize*2))/2));
		this.targety = ((this.path[this.path.length-1].y*(500/(chunkSize*2))) + ((500/(chunkSize*2))/2));
	}

	Update() {
		this.Display();
		this.Collision();
		this.Move();
	};

	Display(){
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.strokeStyle = "rgb(50,0,0)";
		ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	};

	Move(){
		if(this.stunTimer === 0){
			//X Move
			if(this.x < this.targetx){
				this.x += this.speed;
				if(this.x >= this.targetx){this.x = this.targetx};
			} else if(this.x > this.targetx){
				this.x -= this.speed;
				if(this.x <= this.targetx){this.x = this.targetx};
			};
			//Y Move
			if(this.y < this.targety){
				this.y += this.speed;
				if(this.y >= this.targety){this.y = this.targety};
			} else if (this.y > this.targety){
				this.y -= this.speed;
				if(this.y <= this.targety){this.y = this.targety};
			};
			//If it's equal, next node
			if(this.x === this.targetx && this.y === this.targety){
				this.meshx = this.path[this.path.length-1].x
				this.meshy = this.path[this.path.length-1].y

				this.target = EFC(navMesh.grid,player.meshX,player.meshY,gridWidth,gridHeight);
				this.start = EFC(navMesh.grid,this.meshx,this.meshy,gridWidth,gridHeight);
				if(this.target === false || this.target === undefined){
					this.path = [EFC(navMesh.grid,this.meshx,this.meshy,gridWidth,gridHeight)];
				} else {
					if(this.moveTimer === 0){
						this.path = navMesh.Search(this.start,this.target);
						this.moveTimer = 10;
						if(this.path === false){
							this.moveTimer = this.stuckTimer;
							if(this.stuckTimer < 500){this.stuckTimer += (100*Math.random())};
						} else {
							this.stuckTimer = 100;
						};
					};
				}
				if(this.path === false){
					this.path = [EFC(navMesh.grid,this.meshx,this.meshy,gridWidth,gridHeight)];
				};
				this.targetx = ((this.path[this.path.length-1].x*(500/(chunkSize*2))) + ((500/(chunkSize*2))/2));
				this.targety = ((this.path[this.path.length-1].y*(500/(chunkSize*2))) + ((500/(chunkSize*2))/2));
			};
			if(this.moveTimer > 0){this.moveTimer--};
		} else {
			this.stunTimer--;
		};
	}

	Collision(){
		for(var g=0;g<bullets.length;g++){
			var c = Math.sqrt(Math.pow(bullets[g].x-this.x,2) + Math.pow(bullets[g].y-this.y,2));
			if(c <= this.r + bullets[g].r){
				this.health -= bullets[g].damage;
				if(this.health <= 0){
					this.Destroy();
				};
				bullets[g].Destroy();
			};
		};
		for(var g=0;g<explosions.length;g++){
			var c = Math.sqrt(Math.pow(explosions[g].x-this.x,2) + Math.pow(explosions[g].y-this.y,2));
			if(InArray(explosions[g].alreadyHit,this) == false && c <= this.r + explosions[g].currentSize){
				this.health -= explosions[g].damage;
				if(this.health <= 0){this.Destroy()};
				explosions[g].alreadyHit.push(this);
			};
		};
	}

	Destroy() {
		for(i=0;i<enemies.length;i++){
			if(enemies[i] === this){
				zombiesKilled++;
				zombieMap[position.x + (position.y*worldSize)]--;
				var rand1 = Math.random();
				if(rand1<.005){
					pickups.push(new BeegHealth(this.x,this.y));
				} else if (rand1<.025) {
					pickups.push(new HealthPickup(this.x,this.y));
				}
				enemies.splice(i,1);
			};
		};
	}
}

class HealthPickup {
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.r = 4
		this.hp = 5;
		this.color = "rgb(255,0,0)";
	}

	Update(){
		this.Display();
	}

	Display(){
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.strokeStyle = "rgb(0,0,0)";
		ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
		ctx.fill();
		ctx.closePath();

		ctx.beginPath();
		ctx.strokeStyle = "rgb(255,255,255)";
		ctx.moveTo(this.x,this.y+this.r);
		ctx.lineTo(this.x,this.y-this.r);
		ctx.moveTo(this.x+this.r,this.y);
		ctx.lineTo(this.x-this.r,this.y);
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.strokeStyle = "rgb(0,0,0)";
		ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
		ctx.stroke();
		ctx.closePath();
	};
}

class BeegHealth extends HealthPickup {
	constructor(x,y){
		super(x,y);
		this.hp = 10;
		this.color = "rgb(100,100,255)";
	};
}

class Boomer extends Enemy {
	constructor(px,py){
		super(px,py);
		this.speed = 1;
		this.health = 5;
		this.state = 1;
		this.color = "rgb(255,0,0)";
		this.color1 = "rgb(255,255,0)";
		this.r-=1;
	}

	Display(){
		ctx.beginPath();
		if(this.state === 1){
			ctx.fillStyle = this.color;
			this.state = 0;
		} else {
			ctx.fillStyle = this.color1;
			this.state = 1;
		};
		ctx.strokeStyle = "rgb(50,0,0)";
		ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	}

	Destroy() {
		for(i=0;i<enemies.length;i++){
			if(enemies[i] === this){
				zombiesKilled++;
				zombieMap[position.x + (position.y*worldSize)]--;
				if(Math.random()<.025){pickups.push(new HealthPickup(this.x,this.y));};
				explosions.push(new Explosion(this.x,this.y,30,10,[205,0,50],5));
				enemies.splice(i,1);
			};
		};
	}
}