var c=document.getElementById("canvas");
var ctx=c.getContext("2d");

var levelSize = 16;
var cellSize = c.width/levelSize;

var player;

var level;

var lives = 199;

var objects = [];

var keys = [];

function Start(){
	Load();
};

function Draw(){
	ctx.clearRect(0,0,c.width,c.height);
	
	for(i=0;i<objects.length;i++){
		objects[i].Update();
	};

  ctx.font="20px Arial";
  ctx.fillText(lives,250,20);
	
	player.Update();
};

function Load(){
	
	player = undefined;
	objects = [];
	
	if(level === undefined){
		level = level1
	} else if(level === level1){
		level = level2;
	} else if(level === level2){
		level = level3;
	} else if (level === level3){
		level = level4;
	} else if (level === level4){
		level = level5;
	} else if (level === level5){
		level = level6;
	} else if (level === level6){
		level = level7;
	} else if (level === level7){
		level = level8;
	} else if (level === level8){
		alert("Congratulations, you win!");
		level = victory;
	} else if (level === victory){
		level = level1;
	};
	
	//alert("Congratulations, you win!");
	
	for(iy=0;iy<levelSize;iy++){
		for(ix=0;ix<levelSize;ix++){
		
			switch(level[iy*levelSize+ix])  {
			
				case 0:
				break;
				
				case 1:
				objects.push(new Box(cellSize,cellSize, 1, ix*cellSize,iy*cellSize, 0,0));
				break;
				
				case 2:
				player = new Player(ix*cellSize,iy*cellSize,0,0);
				break;
				
				case 3:
				objects.push(new Exit(cellSize,cellSize, ix*cellSize,iy*cellSize));
				break;
				
				case 4:
				objects.push(new Lava(cellSize,cellSize, ix*cellSize,iy*cellSize));
				break;
			};
		};
	};
}

function Dist (x1,y1,x2,y2) {
	var dx = (x1-x2);
	var dy = (y1-y2);
	var d = Math.sqrt((dx*dx)+(dy*dy));
	//console.log(d);
	return(d);
};

function SquareCollide(r1,r2){
    var dx=(r1.x+r1.w/2)-(r2.x+r2.w/2);
    var dy=(r1.y+r1.h/2)-(r2.y+r2.h/2);
    var width=(r1.w+r2.w)/2;
    var height=(r1.h+r2.h)/2;
    var crossWidth=width*dy;
    var crossHeight=height*dx;
    var collision='none';
    if(Math.abs(dx)<=width && Math.abs(dy)<=height){
        if(crossWidth>crossHeight){
            collision=(crossWidth>(-crossHeight))?'bottom':'left';
        }else{
            collision=(crossWidth>-(crossHeight))?'right':'top';
        }
    }
    return(collision);
}

function Input(e) {
	if(e === "w" || e === "ArrowUp"){player.Move("jump")}
	else if(e === "s" || e === "ArrowUp"){player.Move("down")}
	else if(e === "d" || e === "ArrowUp"){player.Move("left")}
	else if(e === "a" || e === "ArrowUp"){player.Move("right")}
}

Start();
setInterval(function(){Draw();}, 22);

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});