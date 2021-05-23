var canvas = document.getElementById("canvas");
var canvasHolder = document.getElementById("canvasHolder");
var ctx = canvas.getContext("2d");

var width = canvas.width;
var height = canvas.height;
var particles = [];
var typeData = [];
var typeRange = [];
var typeColors = [];
var timer = 0;

var numOfTypes = 5;
var startingAmount = 400;
var maxRange = 150;
var minRange = 10
var colRange = 8;
var colForce = 2;
var forceWeight = 1000;
var maxAcceleration = 10;
var drag = .5;
var maxForce = .5;
var speedLimit = 5;

var edgeMode = "solid";

var resetTime = 1000;
var resets = true;

function Start(reset){
	canvas.setAttribute("width", window.innerWidth);
	canvas.setAttribute("height", window.innerHeight);
	width = canvas.width;
	height = canvas.height;
	
	
	if(reset){
		timer = 0;
		particles = [];
		typeData = [];
		typeRange = [];
		typeColors = [];
		numOfTypes = Math.floor(Math.random()*18)+2;
		maxRange = Math.floor(Math.random()*200)+minRange+10;
		colForce = Math.random()*5;
	};
	
	
	for(i=0;i<numOfTypes;i++){
		typeData.push([]);
		for(i1=0;i1<numOfTypes;i1++){
			var num1 = ((Math.random()*2)-1)*forceWeight;
			typeData[i].push(num1);
		};
	};
	for(i=0;i<numOfTypes;i++){
		var color = "rgb("+ ((Math.random()*205)+50) +","+ ((Math.random()*205)+50) +","+ ((Math.random()*205)+50) +")";
		typeColors.push(color);
	};
	for(i=0;i<numOfTypes;i++){
		var max = Math.floor(Math.random()*maxRange)+minRange;
		typeRange.push(max);
	};
	for(i=0;i<startingAmount;i++){
		particles.push(new Particle(Math.floor(Math.random()*numOfTypes)));
	};
}

function Draw(){
	
	canvas.setAttribute("width", window.innerWidth);
	canvas.setAttribute("height", window.innerHeight);
	width = canvas.width;
	height = canvas.height;
	
	
	ctx.clearRect(0,0,width,height);
	
	for(p=0;p<particles.length;p++){
		particles[p].PhysicsUpdate();
	};
	for(p=0;p<particles.length;p++){
		particles[p].Update();
	};
	
	if(resets){
		timer++
		if(timer >= (resetTime)){
			Start(true);
		};
	};
}






function Circle(x,y,r,t){
	ctx.beginPath();
	ctx.arc(x,y,r,0,Math.PI*2);
	ctx.fillStyle = typeColors[t];
	ctx.fill();
	//ctx.stroke();
	ctx.closePath();
}

function LineCircle(x,y,r,t){
	ctx.beginPath();
	ctx.arc(x,y,r,0,Math.PI*2);
	ctx.strokeStyle = typeColors[t];
	ctx.stroke();
	ctx.closePath();
}

function Line(x1,y1,x2,y2){
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.stroke();
	ctx.closePath();
}

function Dist(p1,p2){
	var dist = Math.sqrt(Math.pow(p2.x-p1.x,2)+Math.pow(p2.y-p1.y,2));
	return(dist);
}

function Add(v1,v2){
	v1.x += v2.x;
	v1.y += v2.y;
	var v3 = {x:v1.x,y:v1.y};
	return(v3);
}


Start(false);
setInterval(function(){Draw()},10);