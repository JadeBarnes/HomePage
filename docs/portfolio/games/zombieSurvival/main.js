var canvas = document.getElementById("canvas1");
var ctx = canvas.getContext("2d");
var mapCanvas = document.getElementById("canvasMap");
var mapCtx = mapCanvas.getContext("2d");
document.onkeydown = function(){KeyPressed(event.key)};
document.onkeyup = function(){KeyUp(event.key)};
document.onmousemove = function(){GetMouseCoords(event)};
document.onmousedown = function(){MousePressed()};

var hpDisp = document.getElementById("healthDisplay");
var gun1 = document.getElementById("gun1Display");
var gun2 = document.getElementById("gun2Display");
var gun3 = document.getElementById("gun3Display");
var scoreDisp = document.getElementById("scoreDisplay");
var highDisp = document.getElementById("highDisplay");
var timeDisp = document.getElementById("timeDisplay");
var levelDisp = document.getElementById("levelDisplay");

var loop;

var zombiesKilled = 0;
var timeSurvived = 0;
var explored = [];
var boomerRate = .1;
var boomerCap = .15;

var keys = [false,false,false,false,false,  false,false,false,false, false,false,false, false];
var debug = true;
var totalDebugs = 1;
var frameInterval = 10;
var paused = false;

var player;
var enemies = [];
var pickups = [];

var mesh = [];
var gridWidth = chunkSize*2;
var gridHeight = chunkSize*2;
var navMesh = [];

var localMap = [];

var difficulty = .5;
var maxTime = (50000)/difficulty;
var timeLeft;
var level = 0;

var roomTimer = 0;

var score = 0;
var highScore = 0;
var roomTime = 500;

var cookie = getCookie("highScore");

function Start (reset) {
	console.log("Starting game");
	if(cookie === '' || cookie < highScore){
		setCookie("highScore", highScore, 7);
	} else {
		highScore = cookie;
	};
	maxTime = (50000)/difficulty;
	if(reset){
		zombiesKilled = 0;
		timeSurvived = 0;
		explored = [];
		enemies = [];
		pickups = []
		localMap = [];
		timeLeft = maxTime;
		level = 0;	
	};
	bullets = [];
	explosion = [];

	createNewMap();
	position.x = 0;
	position.y = 0;
	localMap = worldMap[position.x + (position.y*worldSize)];
	UpdateMesh();
	explored.push(localMap);
	MapDisplay();

	navMesh = new AStarGrid(mesh,gridWidth,gridHeight);

	if(reset){
		//Generate Player
		var e = 0;
		while(e < 1){
			var x = Math.floor(Math.random()*40);
			var y = Math.floor(Math.random()*40);
			if(mesh[x+(y*(chunkSize*2))] === true){
				player = new Player(x,y);
				e++;
			};
		};
		e=0;
	} else {
		var e = 0;
		while(e < 1){
			var x = Math.floor(Math.random()*40);
			var y = Math.floor(Math.random()*40);
			if(mesh[x+(y*(chunkSize*2))] === true){
				player.x = ((x*(500/(chunkSize*2))) + ((500/(chunkSize*2))/2));;
				player.y = ((y*(500/(chunkSize*2))) + ((500/(chunkSize*2))/2));;
				e++;
			};
		};
		e=0;
	};
	roomTimer = 0;

	//localMap[7+(7*20)] = false;
	if(reset){
		player.weapons[0] = new Pistol(Infinity);
		//player.weapons[0] = new PlasGrenade(3);
		//player.weapons[1] = new FragGrenade(3);
		//player.weapons[2] = new StunGrenade(3);
		//player.weapons[1] = new SingularityCannon(Infinity);
		loop = setInterval(function(){Draw();}, frameInterval);
	};
}

function Draw () {
	ctx.clearRect(0,0,500,500);
	
	
	for(i=bullets.length-1;i>=0;i--){bullets[i].Update()};
	for(i=0;i<localMap.length;i++){if(localMap[i] != false){localMap[i].Update()}};
	for(i=enemies.length-1;i>=0;i--){if(enemies[i] != undefined){enemies[i].Update()}};
	for(i=explosions.length-1;i>=0;i--){explosions[i].Update()};
	for(i=pickups.length-1;i>=0;i--){pickups[i].Update()};
	player.Update();

	if(roomTimer > 0){
		canvas.style = "border:1px solid #FF0000";
	} else {
		canvas.style = "border:1px solid #000000";	
	};

	if(player.x < 1){
		if(position.x != 0 && worldMap[(position.x-1) + (position.y*worldSize)][(chunkSize-1) + (player.gridY*chunkSize)] == false && roomTimer < 0){
			//if(zombieMap[(position.x-1) + (position.y*worldSize)] > 0){player.health--};
			position.x -= 1;
			localMap = worldMap[position.x + (position.y*worldSize)];
			player.x = 490;
			if(InArray(explored,localMap) == false){explored.push(localMap)};
			MapDisplay();
			bullets = [];
			explosions = [];
			enemies = [];
			pickups = [];
			if(zombieMap[position.x + (position.y*worldSize)] > 0){
				roomTimer = roomTime;
			};

			UpdateMesh();
			CreateZombies(zombieMap[position.x + (position.y*worldSize)]);
		} else {
			player.x = 1;
		};
	};
	if(player.y < 1){
		if(position.y != 0 && worldMap[position.x + ((position.y-1)*worldSize)][player.gridX+((chunkSize-1)*chunkSize)] == false && roomTimer < 0){
			position.y -= 1;
			localMap = worldMap[position.x + (position.y*worldSize)];
			player.y = 490;
			if(InArray(explored,localMap) == false){explored.push(localMap)};
			MapDisplay();
			bullets = [];
			explosions = [];
			pickups = [];
			if(zombieMap[position.x + (position.y*worldSize)] > 0){
				roomTimer = roomTime;
			};

			UpdateMesh();
			CreateZombies(zombieMap[position.x + (position.y*worldSize)]);
		} else {
			player.y = 1;
		};
	};
	if(player.x > 499){
		if(position.x != worldSize-1 && worldMap[(position.x+1) + (position.y*worldSize)][0 + (player.gridY*chunkSize)] == false && roomTimer < 0){
			position.x += 1;
			localMap = worldMap[position.x + (position.y*worldSize)];
			player.x = 10;
			if(InArray(explored,localMap) == false){explored.push(localMap)};
			MapDisplay();
			bullets = [];
			explosions = [];
			pickups = [];
			if(zombieMap[position.x + (position.y*worldSize)] > 0){
				roomTimer = roomTime;
			};

			UpdateMesh();
			CreateZombies(zombieMap[position.x + (position.y*worldSize)]);
		} else {
			player.x = 499;
		};
	};
	if(player.y > 499){
		if(position.y != worldSize-1 && worldMap[position.x + ((position.y+1)*worldSize)][player.gridX] == false && roomTimer < 0){
			position.y += 1;
			localMap = worldMap[position.x + (position.y*worldSize)];
			player.y = 10;
			if(InArray(explored,localMap) == false){explored.push(localMap)};
			MapDisplay();
			bullets = [];
			explosions = [];
			pickups = [];
			if(zombieMap[position.x + (position.y*worldSize)] > 0){
				roomTimer = roomTime;
			};

			UpdateMesh();
			CreateZombies(zombieMap[position.x + (position.y*worldSize)]);
		} else {
			player.y = 499;
		};
	};

	roomTimer--;
	timeSurvived++;
	timeLeft--;

	score = ((zombiesKilled*2)+(explored.length*10) + (level*500));
	if(score>highScore){highScore = score};

	scoreDisp.innerHTML = "Score: "+ score;
	highDisp.innerHTML = "Highscore: "+ highScore;
	timeDisp.innerHTML = "Time Left: "+ Math.floor(timeLeft/100)+"s";
	levelDisp.innerHTML = "Level: "+ (level+1);
	if(timeLeft === 0){
		var tryAgain = confirm("You ran out of time.\n-------------------- \nZombies Killed: "+zombiesKilled+" \nTime Survived: "+ Math.floor(timeSurvived/100) +" \nChunks Explored: "+ explored.length +" \nLevels Cleared: "+ level +" \n-------------------- \nFinal Score: "+ score +"\nTry Again?");
		clearInterval(loop);
		if(tryAgain === true){
			//location.reload();
			score = 0;
			Start(true);
		};
	};

	if(debug){Debug()};
}

function UpdateMesh() {
	mesh = [];
	for(var my=0;my<chunkSize*2;my++){
		for(var mx=0;mx<chunkSize*2;mx++){
			if(localMap[(Math.floor(mx/2))+(Math.floor(my/2)*chunkSize)].type == "tile"){
				mesh[mx+(my*chunkSize*2)] = false;
			} else {
				mesh[mx+(my*(chunkSize*2))] = true;
			};
		};
	};

	navMesh = new AStarGrid(mesh,(chunkSize*2),(chunkSize*2));
}

function MapDisplay() {
	if(mapVisable){
		mapCtx.clearRect(0,0,mapCanvas.width,mapCanvas.height);
		mapCanvas.width = (chunkSize*worldSize)*minimapSize;
		mapCanvas.height = (chunkSize*worldSize)*minimapSize;

		for(wmy=0;wmy<worldSize;wmy++){
			for(wmx=0;wmx<worldSize;wmx++){

				if(InArray(explored,worldMap[wmx+(wmy*worldSize)]) == true ){
					if(zombieMap[wmx+(wmy*worldSize)] > 0){
						mapCtx.beginPath();
						mapCtx.fillStyle = "rgba(255,0,0,0.1)"
						mapCtx.fillRect( ((wmx*chunkSize))*minimapSize, ((wmy*chunkSize))*minimapSize, chunkSize*minimapSize, chunkSize*minimapSize );
						mapCtx.closePath();
					};
					for(cy=0;cy<chunkSize;cy++){
						for(cx=0;cx<chunkSize;cx++){
							if( worldMap[wmx+(wmy*worldSize)][cx+(cy*chunkSize)] != false){
								mapCtx.beginPath();
								mapCtx.fillStyle = worldMap[wmx+(wmy*worldSize)][cx+(cy*chunkSize)].fill;
								mapCtx.fillRect( (cx+(wmx*chunkSize))*minimapSize, (cy+(wmy*chunkSize))*minimapSize, 1*minimapSize, 1*minimapSize );
								mapCtx.closePath();
							};
						};
					};
				} else {
					mapCtx.beginPath();
					mapCtx.fillStyle = "rgb(0,0,0)"
					mapCtx.fillRect( ((wmx*chunkSize))*minimapSize, ((wmy*chunkSize))*minimapSize, chunkSize*minimapSize, chunkSize*minimapSize );
					mapCtx.closePath();
				};
			};
		};

		mapCtx.beginPath();
		mapCtx.strokeStyle = "rgb(255,0,0)";
		mapCtx.rect((((position.x*chunkSize)*minimapSize)-1),(((position.y*chunkSize)*minimapSize)-1),chunkSize*minimapSize+2,chunkSize*minimapSize+2);
		mapCtx.stroke();
		mapCtx.closePath();
	};

	for(t=0;t<localMap.length;t++){
		if(localMap[t] != false){
			if(localMap[localMap[t].x+((localMap[t].y-1)*chunkSize)] != false &&
			   localMap[localMap[t].x+((localMap[t].y-1)*chunkSize)] != undefined &&
				 localMap[localMap[t].x+((localMap[t].y-1)*chunkSize)].type == "tile"){localMap[t].adjacent[0] = true} else {localMap[t].adjacent[0] = false};
			if(localMap[localMap[t].x+((localMap[t].y+1)*chunkSize)] != false &&
			   localMap[localMap[t].x+((localMap[t].y+1)*chunkSize)] != undefined &&
				 localMap[localMap[t].x+((localMap[t].y+1)*chunkSize)].type == "tile"){localMap[t].adjacent[2] = true} else {localMap[t].adjacent[2] = false};
			if(localMap[(localMap[t].x-1)+((localMap[t].y)*chunkSize)] != false &&
			   localMap[(localMap[t].x-1)+((localMap[t].y)*chunkSize)] != undefined &&
				 localMap[(localMap[t].x-1)+((localMap[t].y)*chunkSize)].type == "tile"){localMap[t].adjacent[3] = true} else {localMap[t].adjacent[3] = false};
			if(localMap[(localMap[t].x+1)+((localMap[t].y)*chunkSize)] != false &&
			   localMap[(localMap[t].x+1)+((localMap[t].y)*chunkSize)] != undefined &&
				 localMap[(localMap[t].x+1)+((localMap[t].y)*chunkSize)].type == "tile"){localMap[t].adjacent[1] = true} else {localMap[t].adjacent[1] = false};
		}
	};
}

function KeyPressed(key) {
	if (key == "w" || key == "W") {keys[0] = true;};
	if (key == "a" || key == "A") {keys[1] = true;};
	if (key == "s" || key == "S") {keys[2] = true;};
	if (key == "d" || key == "D") {keys[3] = true;};
	if (key == "Shift") {keys[4] = true;};

	if (key == "ArrowUp") {keys[5] = true;};
	if (key == "ArrowLeft") {keys[6] = true;};
	if (key == "ArrowDown") {keys[7] = true;};
	if (key == "ArrowRight") {keys[8] = true;};

	if (key == "1" || key == "!") {keys[9] = true;};
	if (key == "2" || key == "@") {keys[10] = true;};
	if (key == "3" || key == "#") {keys[11] = true;};

	if (key == "p" || key == "P") {
		if(paused == true){
			paused = false;
			loop = setInterval(function(){Draw();}, frameInterval);
			} else {
			paused = true;
			clearInterval(loop);
			ctx.beginPath();
			ctx.fillStyle = "rgba(0,0,0,.6)";
			ctx.fillRect(0,0,500,500);
			ctx.fillStyle = "rgb(0,0,0)";
			ctx.font = "30px Arial";
			ctx.textAlign = "center";
			ctx.fillText("[Paused]", 250, 220);
			ctx.fillText("Press P again to unpause", 250, 250);
			ctx.closePath();
		};
	};

	if(key == "`"){debug = true};
};

function KeyUp(key){
	if (key == "w"|| key == "W" ) {keys[0] = false;};
	if (key == "a"|| key == "A" ) {keys[1] = false;};
	if (key == "s"|| key == "S" ) {keys[2] = false;};
	if (key == "d"|| key == "D" ) {keys[3] = false;};
	if (key == "Shift") {keys[4] = false;};

	if(key == "ArrowUp") {keys[5] = false;};
	if (key == "ArrowLeft") {keys[6] = false;};
	if (key == "ArrowDown") {keys[7] = false;};
	if (key == "ArrowRight") {keys[8] = false;};

	if (key == "1") {keys[9] = false;};
	if (key == "2") {keys[10] = false;};
	if (key == "3") {keys[11] = false;};

	if(key == "`"){debug = false};
}

function CreateZombies(amount){
	enemies = [];
	var e = 0;
	var boomSpawn = (boomerRate*difficulty);
	var px = Math.floor((player.x/500)*(chunkSize*2));
	var py = Math.floor((player.y/500)*(chunkSize*2));
	while(e < amount){
		var x = Math.floor(Math.random()*chunkSize*2);
		var y = Math.floor(Math.random()*chunkSize*2);
		if(mesh[x+(y*(chunkSize*2))] === true && Distance(x,y,px,py) > 5){
			if(boomSpawn > boomerCap){boomSpawn = boomerCap};
			if(Math.random() <  boomSpawn){
				enemies.push( new Boomer(x,y) );
			} else {
				enemies.push( new Enemy(x,y) );
			};
			e++;
		};
	}
};

function GetMouseCoords() {

}

function MousePressed() {
	
}

function Debug() {
	
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

setTimeout( _StartGame, 10 );
function _StartGame(){Start(true);};

console.log("7 - Main loaded");