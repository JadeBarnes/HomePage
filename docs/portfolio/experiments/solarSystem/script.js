var canvas = document.getElementById("canvasMain");
var ctx = canvas.getContext("2d");

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

var wOff = canvas.width/2;
var hOff = canvas.height/2;

var p = [];

function Start(){
	p.push(new Planet(0,7,RA(),0,"rgb(255,255,100)"));		    //The Sun
	
	p.push(new Planet(15,1,RA(),6,"rgb(100,100,100)"));
	p.push(new Planet(20,2,RA(),4,"rgb(255,170,0)"));
	p.push(new Planet(30,2,RA(),2,"rgb(0,0,255)"));
	p.push(new Planet(40,1,RA(),1.2,"rgb(255,0,0)"));
	
	var jupiterPos = RA();
	p.push(new Planet(100,4,jupiterPos,.8,"rgb(207,161,70)"));        //Jupiter
	p.push(new Planet(160,3.5,RA(),.5,"rgb(255,211,120)"));
	p.push(new Planet(210,3,RA(),.2,"rgb(150,150,255)"));
	p.push(new Planet(270,3,RA(),.1,"rgb(0,0,255)"));


	p.push(new Moon(4,1,RA(),9,"rgb(100,100,100)",p[3]));

	p.push(new Moon(3,.5,RA(),9,"rgb(100,100,100)",p[4]));
	p.push(new Moon(4.5,.5,RA(),7,"rgb(100,100,100)",p[4]));
	
	p.push(new Moon(6,.5,RA(),12,"rgb(255,255,0)",p[5]));
	p.push(new Moon(8,.5,RA(),10,"rgb(150,100,100)",p[5]));
	p.push(new Moon(10,.5,RA(),8,"rgb(75,75,75)",p[5]));
	p.push(new Moon(12,1,RA(),6,"rgb(100,100,100)",p[5]));
	
	//Saturns Rings
	for(var i=0;i<200;i++){
		p.push(new Moon(6,.1,RA(),9*Math.random(),"rgb(205,161,70)",p[6]));
	}
	
	//Asteroid Belt
	for(var i=0;i<100;i++){
		p.push(new Planet(50+(Math.random()*10),.5,RA(),.1+Math.random()*.7,"rgb(100,100,100)"));
	}
	
	//Trojon Asteroids
	var trojon1Pos = jupiterPos - 60;
	var trojon2Pos = jupiterPos + 60;
	for(var i=0;i<15;i++){
		p.push(new Planet(100+(Math.random()*7),.5,trojon1Pos + ((Math.random()*10)-5),.8,"rgb(100,100,100)"));
	}
	for(var i=0;i<15;i++){
		p.push(new Planet(100+(Math.random()*7),.5,trojon2Pos + ((Math.random()*10)-5),.8,"rgb(100,100,100)"));
	}
	
	//Kieper Belt
	for(var i=0;i<1000;i++){
		p.push(new Planet(280+(Math.random()*150),.5,RA(),.01+Math.random()*.07,"rgb(100,100,200)"));
	}
	for(var i=0;i<500;i++){
		p.push(new Planet(430+(Math.random()*150),.5,RA(),.01+Math.random()*.07,"rgb(100,100,200)"));
	}
	for(var i=0;i<250;i++){
		p.push(new Planet(580+(Math.random()*150),.5,RA(),.01+Math.random()*.07,"rgb(100,100,200)"));
	}
}

function RA(){
	return(360*Math.random());
};

function Loop(){
	canvas.setAttribute("width", window.innerWidth);
	canvas.setAttribute("height", window.innerHeight);

	wOff = canvas.width/2;
	hOff = canvas.height/2;
	
	//Write coordinates to HTML
	for	(let first20 = 0; first20 < 20; first20++){
		let elem = 0;
		let set1 = document.getElementsByClassName("coordinatesFor" + first20);
		let set2 = document.getElementsByClassName("coordinatesCartesianFor" + first20);
		
		for (let elem = 0; elem < set1.length; elem++){
			set1[elem].innerHTML =
				"(" + 
				(p[first20].dist < 100 ? ("0" + p[first20].dist.toString()) : p[first20].dist)
				+ "r, " + 
				( Math.round( p[first20].angle ) < 10 ? ("00" + Math.round( p[first20].angle ).toString()) : ( Math.round( p[first20].angle ) < 100 ? ("0" + Math.round( p[first20].angle ).toString()) : Math.round( p[first20].angle ).toString() ) )
				+ "°φ)";
		};
		for (let elem = 0; elem < set2.length; elem++){
			set2[elem].innerHTML =
				"(" +
				Math.round( p[first20].x )
				+ "x, "+
				Math.round( p[first20].y )
				+ "y)";
		};
	};

	ctx.clearRect(0,0,wOff*2,hOff*2);
	for(var i=0;i<p.length;i++){
		p[i].Update();
	};
}


class Planet{
	constructor(d,r,theta,speed,color){
		this.x;
		this.y;
		this.dist = d;
		this.r = r;
		this.angle = theta;
		this.speed = speed/5;
		this.c = color;
	}

	Update(){

		this.x = (Math.cos(this.angle*(Math.PI/180)) * this.dist)+wOff;
		this.y = (Math.sin(this.angle*(Math.PI/180)) * this.dist)+hOff;
		this.angle = (this.angle + this.speed) > 360 ? ((this.angle - 360) + this.speed) : this.angle + this.speed;
		

		ctx.beginPath();
		ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
		ctx.fillStyle = this.c;
		ctx.fill();
		ctx.closePath();
	}
}

class Moon{
	constructor(d,r,theta,speed,color,parent){
		this.x;
		this.y;
		this.dist = d;
		this.r = r;
		this.angle = theta;
		this.speed = speed/5;
		this.c = color;
		this.p = parent
	}

	Update(){

		this.x = (Math.cos(this.angle*(Math.PI/180)) * this.dist)+this.p.x;
		this.y = (Math.sin(this.angle*(Math.PI/180)) * this.dist)+this.p.y;
		this.angle += this.speed;

		ctx.beginPath();
		ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
		ctx.fillStyle = this.c;
		ctx.fill();
		ctx.closePath();
	}
}



Start();
setInterval(function(){Loop()},10);