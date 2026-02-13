var _canvas = document.getElementById("canvasParticleLife");
var _ctx = _canvas.getContext("2d");

var _width = _canvas.width;
var _height = _canvas.height;
var _particles = [];
var _typeData = [];
var _typeRange = [];
var _typeColors = [];
var _timer = 0;

var _numOfTypes = 5;
var _startingAmount = 400;
var _maxRange = 150;
var _minRange = 10
var _colRange = 8;
var _colForce = 2;
var _forceWeight = 1000;
var _maxAcceleration = 10;
var _drag = .5;
var _maxForce = .5;
var _speedLimit = 5;

var _edgeMode = "solid";

var _resetTime = 1000;
var _resets = true;

function _Start(reset){
	_canvas.setAttribute("width", window.innerWidth);
	_canvas.setAttribute("height", window.innerHeight);
	_width = _canvas.width;
	_height = _canvas.height;
	
	
	if(reset){
		_timer = 0;
		_particles = [];
		_typeData = [];
		_typeRange = [];
		_typeColors = [];
		_numOfTypes = Math.floor(Math.random()*18)+2;
		_maxRange = Math.floor(Math.random()*200)+_minRange+10;
		_colForce = Math.random()*5;
	};
	
	
	for(i=0;i<_numOfTypes;i++){
		_typeData.push([]);
		for(i1=0;i1<_numOfTypes;i1++){
			var _num1 = ((Math.random()*2)-1)*_forceWeight;
			_typeData[i].push(_num1);
		};
	};
	for(i=0;i<_numOfTypes;i++){
		var _color = "rgb("+ ((Math.random()*205)+50) +","+ ((Math.random()*205)+50) +","+ ((Math.random()*205)+50) +")";
		_typeColors.push(_color);
	};
	for(i=0;i<_numOfTypes;i++){
		var _max = Math.floor(Math.random()*_maxRange)+_minRange;
		_typeRange.push(_max);
	};
	for(i=0;i<_startingAmount;i++){
		_particles.push(new _Particle(Math.floor(Math.random()*_numOfTypes)));
	};
}

function _Draw(){
	
	_canvas.setAttribute("width", window.innerWidth);
	_canvas.setAttribute("height", window.innerHeight);
	_width = _canvas.width;
	_height = _canvas.height;
	
	
	_ctx.clearRect(0,0,_width,_height);
	
	for(p=0;p<_particles.length;p++){
		_particles[p]._PhysicsUpdate();
	};
	for(p=0;p<_particles.length;p++){
		_particles[p]._Update();
	};
	
	if(_resets){
		_timer++
		if(_timer >= (_resetTime)){
			_Start(true);
		};
	};
}






function _Circle(x,y,r,t){
	_ctx.beginPath();
	_ctx.arc(x,y,r,0,Math.PI*2);
	_ctx.fillStyle = _typeColors[t];
	_ctx.fill();
	//_ctx.stroke();
	_ctx.closePath();
}

function _LineCircle(x,y,r,t){
	_ctx.beginPath();
	_ctx.arc(x,y,r,0,Math.PI*2);
	_ctx.strokeStyle = _typeColors[t];
	_ctx.stroke();
	_ctx.closePath();
}

function _Line(x1,y1,x2,y2){
	_ctx.beginPath();
	_ctx.moveTo(x1,y1);
	_ctx.lineTo(x2,y2);
	_ctx.stroke();
	_ctx.closePath();
}

function _Dist(p1,p2){
	var _dist = Math.sqrt(Math.pow(p2.x-p1.x,2)+Math.pow(p2.y-p1.y,2));
	return(_dist);
}

function _Add(v1,v2){
	v1.x += v2.x;
	v1.y += v2.y;
	var v3 = {x:v1.x,y:v1.y};
	return(v3);
}

setTimeout( _Start, 10 );
setInterval(function(){_Draw()},10);