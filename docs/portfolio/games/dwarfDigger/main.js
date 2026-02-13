var canvas = document.getElementById("canvasMain");
var ctx = canvas.getContext("2d");
document.onkeydown = function(){KeyPressed(event.key)};
document.onkeyup = function(){KeyUp(event.key)};
document.onmousemove = function(){GetMouseCoords(event)};
document.onmousedown = function(){MousePressed(event)};
document.onwheel = function(){MouseScrolled(event)};
document.oncontextmenu = function(){return false};

var sWidth = canvas.width;
var sHeight = canvas.height;
var player;
var craft = new Crafting();
var stationNum = 0;

var debug = false;

var mouseX = 0;
var mouseY = 0;

var scroll = 0;
var maxScroll = craft.recipies.length-5;

//Camera Displacement
var cmx = 0;
var cmy = 0;
// 			   w     a     s     d   shift   e
var keys = [false,false,false,false,false,false];

//WorldSettings
var chunkSize = 4;
var tileSize = 52;
var surfaceLayers = [
	5,
	4,
]

var undergroundLayers = [
	2,
	6,
	7,
	1,

	8,
	3,
	7,
	6,
	
	8,
	12,
	4,
	8
];

var worldWidth = 50;
var worldHeight = 0;
var world = [];

function Start() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight - 40;

	GenerateWorld();
	player = new Player((worldWidth / 2) * (tileSize * chunkSize), 1000)
	//player.AddItem(82);
	//player.AddItem(83);
};

function Draw(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight - 40;
	sWidth = canvas.width;
	sHeight = canvas.height;
	cmx = player.x-(canvas.width/2);
	cmy = player.y-(canvas.height/2);
	ctx.translate(-cmx,-cmy);
	ctx.fillStyle = "hsl(214,100%,"+ (50*darknessPercent) +"%)"
	ctx.fillRect(cmx,cmy,sWidth,sHeight);

	
	for(var i=0;i<world.length;i++){
		world[i].Render();
	};
	player.Update();

	ctx.translate(cmx,cmy);

	//Gui ----------
	//Inventory
	ctx.fillStyle = "#555";
	ctx.fillRect(20,20,315,45);
	for(var g=0;g<10;g++){
		ctx.fillStyle = "#888";
		ctx.fillRect(25+(30*g),25,25+10,25+10);
		ctx.fillStyle = "#ddd";
		ctx.fillRect(30+(30*g),30,25,25);
	};

	//Equipment
	//Hand
	ctx.fillStyle = "#555";
	ctx.fillRect(345,20, 85,45);
	ctx.fillStyle = "#888";
	ctx.fillRect(350,25,25+10,25+10);
	ctx.fillStyle = "#ddd";
	ctx.fillRect(355,30,25,25);
	if(player.holding != false){
		ctx.drawImage(tileset, (tileSize)*(player.holding.number%8),(tileSize)*Math.floor((player.holding.number/8)), tileSize,tileSize, 355,30, 25,25);
	};
	//Head
	ctx.fillStyle = "#888";
	ctx.fillRect(390,25,25+10,25+10);
	ctx.fillStyle = "#ddd";
	ctx.fillRect(395,30,25,25);
	if(player.head != false){
		ctx.drawImage(tileset, (tileSize)*(player.head.number%8),(tileSize)*Math.floor((player.head.number/8)), tileSize,tileSize, 395,30, 25,25);
	};
	//Body
	//ctx.fillStyle = "#888";
	//ctx.fillRect(430,25,25+10,25+10);
	//ctx.fillStyle = "#ddd";
	//ctx.fillRect(435,30,25,25);
	//if(player.body != false){
	//	ctx.drawImage(tileset, (tileSize)*(player.body.number%8),(tileSize)*Math.floor((player.body.number/8)), tileSize,tileSize, 435,30, 25,25);
	//};


	//Selection Square
	ctx.beginPath();
	ctx.rect(25+(30*player.selected),25,35,35);
	ctx.rect(30+(30*player.selected),30,25,25);
	ctx.fillStyle = "#fff";
	ctx.fill("evenodd");
	ctx.closePath();
	//Crafting
	if(keys[5]){
		ctx.fillStyle = "#555";
		ctx.fillRect(20,70,315,315);
		ctx.fillStyle = "#888";
		ctx.fillRect(25,75,305,305);
		ctx.fillStyle = "#fff";
		ctx.fillRect(320,75+(275*(scroll/maxScroll)),10,30);

		for(var c=0;c<5;c++){
			var hovering = false;
			if(c%2 == 1){ctx.fillStyle = "#888"} else {ctx.fillStyle = "#aaa"};
			if((mouseX-cmx) > 25 && (mouseX-cmx) < 25+295 && (mouseY-cmy) > (75)+(61*c) && (mouseY-cmy) < (75)+(61*c)+61){
				hovering = true;
			};
			if(hovering){ctx.fillStyle = "#bbb"}
			ctx.fillRect(25,(75)+(61*c),295,61);
			ctx.font = "10px Arial";
			ctx.fillStyle = "#fff"
			ctx.fillText("Product", 36,(85)+(61*c)+2 );
			ctx.fillText("Matierials:", 90,(85)+(61*c)+2 );
			ctx.fillText("At:", 288,(85)+(61*c)+2 );

			var w = ctx.measureText(craft.recipies[c+scroll][2]).width;
			ctx.fillStyle = "#444";
			ctx.fillRect(39,(74)+(61*c)+(61/2)-(25/2), 27,27 );
			ctx.drawImage(tileset, (tileSize)*(craft.recipies[c+scroll][0]%8),(tileSize)*Math.floor((craft.recipies[c+scroll][0]/8)), tileSize,tileSize, 40,(75)+(61*c)+(61/2)-(25/2), 25,25);
			ctx.fillRect(40,(89)+(61*c)+(61/2)-(25/2),w+2,11);
			ctx.fillStyle = "#fff";
			ctx.fillText(craft.recipies[c+scroll][2], 40,(98)+(61*c)+(61/2)-(25/2));

			for(var m=0;m<craft.recipies[c+scroll][3].length;m++){
				ctx.fillStyle = "#444";
				ctx.fillRect(90+(30*m)-1,(75)+(61*c)+(61/2)-(25/2)-1, 27,27 );
				ctx.drawImage(tileset, (tileSize)*(craft.recipies[c+scroll][3][m][0]%8),(tileSize)*Math.floor((craft.recipies[c+scroll][3][m][0]/8)), tileSize,tileSize, 90+(30*m),(75)+(61*c)+(61/2)-(25/2), 25,25);
				var w = ctx.measureText(craft.recipies[c+scroll][3][m][1]).width
				ctx.fillStyle = "#444";
				ctx.fillRect(90+(30*m),(89)+(61*c)+(61/2)-(25/2),w+2,11);
				ctx.fillStyle = "#fff";
				ctx.fillText(craft.recipies[c+scroll][3][m][1], 90+(30*m),(98)+(61*c)+(61/2)-(25/2));
			};
			
			ctx.fillStyle = "#444";
			ctx.fillRect(280,(74)+(61*c)+(61/2)-(25/2), 27,27 );
			if(craft.recipies[c+scroll][4] != false){
				ctx.drawImage(tileset, (tileSize)*(craft.recipies[c+scroll][4]%8),(tileSize)*Math.floor((craft.recipies[c+scroll][4]/8)), tileSize,tileSize, 281,(75)+(61*c)+(61/2)-(25/2), 25,25);
			};
		};
	};

	//Items
	for(var item=0;item<10;item++){
		if(player.inventory[item][0] != -1){
			ctx.drawImage(tileset, (tileSize)*(player.inventory[item][0]%8),(tileSize)*Math.floor((player.inventory[item][0]/8)), tileSize,tileSize, 30+(30*item),30, 25,25);
			ctx.font = "10px Arial";
			
			var w = ctx.measureText(player.inventory[item][1]).width
			if(player.selected != item){ctx.fillStyle = "#888"} else {ctx.fillStyle = "#fff"};
			ctx.fillRect(31+(30*item)-1,44,w+2,11);
			if(player.selected != item){ctx.fillStyle = "#fff"} else {ctx.fillStyle = "#000"};
			ctx.fillText(player.inventory[item][1], 31+(30*item),54);
			
			
		};
	};
}


function GenerateWorld(){
	for(i=0;i<surfaceLayers.length;i++){
		worldHeight += surfaceLayers[i];
	};
	for(i=0;i<undergroundLayers.length;i++){
		worldHeight += undergroundLayers[i];
	};
	var layersGenerated = 0;
	//Surface
	for(var i=0;i<surfaceLayers.length;i++){
		for(var wy=layersGenerated;wy<surfaceLayers[i]+layersGenerated;wy++){
			for(var wx=0;wx<worldWidth;wx++){
				world.push(new Chunk(wx,wy));
				for(var cy=0;cy<chunkSize;cy++){
					for (var cx = 0; cx < chunkSize; cx++){

						//Parimeter checks
						var edgeTile = false;
						if (wx == 0 && cx == 0) {
							//Left Edge
							edgeTile = true;
							world[wx + (wy * worldWidth)].tiles.push(new Bedrock((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
						};
						if (wx == worldWidth - 1 && cx == chunkSize - 1) {
							//Right Edge
							edgeTile = true;
							world[wx + (wy * worldWidth)].tiles.push(new Bedrock((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
						};
						if (wy == 0 && cy == 0) {
							//Top of world
							edgeTile = true;
							world[wx + (wy * worldWidth)].tiles.push(new Bedrock((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
						};
						if (wy == worldHeight - 1 && cy == chunkSize - 1) {
							//Top of world
							edgeTile = true;
							world[wx + (wy * worldWidth)].tiles.push(new Bedrock((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
						};


						if (edgeTile == false) {

							switch (i) {
								case 0:
									world[wx + (wy * worldWidth)].tiles.push(false);
									break;
								case 1:
									world[wx + (wy * worldWidth)].tiles.push(new Dirt((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
							};
						}
					};
				};
			};
		};
		layersGenerated += surfaceLayers[i];
	};

	//Underground
	for(var i=0;i<undergroundLayers.length;i++){
		for(var wy=layersGenerated;wy<undergroundLayers[i]+layersGenerated;wy++){
			for(var wx=0;wx<worldWidth;wx++){
				world.push(new Chunk(wx,wy));
				for(var cy=0;cy<chunkSize;cy++){
					for (var cx = 0; cx < chunkSize; cx++){

						//Parimeter checks
						var edgeTile = false;
						if (wx == 0 && cx == 0) {
							//Left Edge
							edgeTile = true;
							world[wx + (wy * worldWidth)].tiles.push(new Bedrock((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
						};
						if (wx == worldWidth - 1 && cx == chunkSize - 1) {
							//Right Edge
							edgeTile = true;
							world[wx + (wy * worldWidth)].tiles.push(new Bedrock((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
						};
						if (wy == 0 && cy == 0) {
							//Top of world
							edgeTile = true;
							world[wx + (wy * worldWidth)].tiles.push(new Bedrock((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
						};
						if (wy == worldHeight - 1 && cy == chunkSize - 1) {
							//Top of world
							edgeTile = true;
							world[wx + (wy * worldWidth)].tiles.push(new Bedrock((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
						};


						if (edgeTile == false) {
							var r = Math.random();
							switch (i) {
								case 0:
									if (wy == undergroundLayers[i] + layersGenerated - 1 && cy == chunkSize - 1) {
										if (r > .5) {
											world[wx + (wy * worldWidth)].tiles.push(new Shale((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
										} else {
											world[wx + (wy * worldWidth)].tiles.push(new Sandstone((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
										};
									} else {
										world[wx + (wy * worldWidth)].tiles.push(new Shale((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
									};
									break;

								case 1:
									if (wy == undergroundLayers[i] + layersGenerated - 1 && cy == chunkSize - 1) {
										if (r > .5) {
											world[wx + (wy * worldWidth)].tiles.push(new Sandstone((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
										} else {
											world[wx + (wy * worldWidth)].tiles.push(new Limestone((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
										};
									} else {
										world[wx + (wy * worldWidth)].tiles.push(new Sandstone((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
									};
									break;
								case 2:
									if (wy == undergroundLayers[i] + layersGenerated - 1 && cy == chunkSize - 1) {
										if (r > .5) {
											world[wx + (wy * worldWidth)].tiles.push(new Limestone((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
										} else {
											world[wx + (wy * worldWidth)].tiles.push(new RockSalt((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
										};
									} else {
										world[wx + (wy * worldWidth)].tiles.push(new Limestone((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
									};
									break;
								case 3:
									if (wy == undergroundLayers[i] + layersGenerated - 1 && cy == chunkSize - 1) {
										if (r > .5) {
											world[wx + (wy * worldWidth)].tiles.push(new RockSalt((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
										} else {
											world[wx + (wy * worldWidth)].tiles.push(new Slate((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
										};
									} else {
										world[wx + (wy * worldWidth)].tiles.push(new RockSalt((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
									};
									break;
								case 4:
									if (wy == undergroundLayers[i] + layersGenerated - 1 && cy == chunkSize - 1) {
										if (r > .5) {
											world[wx + (wy * worldWidth)].tiles.push(new Slate((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
										} else {
											world[wx + (wy * worldWidth)].tiles.push(new Marble((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
										};
									} else {
										world[wx + (wy * worldWidth)].tiles.push(new Slate((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
									};
									break;
								case 5:
									if (wy == undergroundLayers[i] + layersGenerated - 1 && cy == chunkSize - 1) {
										if (r > .5) {
											world[wx + (wy * worldWidth)].tiles.push(new Marble((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
										} else {
											world[wx + (wy * worldWidth)].tiles.push(new Phylite((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
										};
									} else {
										world[wx + (wy * worldWidth)].tiles.push(new Marble((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
									};
									break;
								case 6:
									if (wy == undergroundLayers[i] + layersGenerated - 1 && cy == chunkSize - 1) {
										if (r > .5) {
											world[wx + (wy * worldWidth)].tiles.push(new Phylite((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
										} else {
											world[wx + (wy * worldWidth)].tiles.push(new Serpentinite((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
										};
									} else {
										world[wx + (wy * worldWidth)].tiles.push(new Phylite((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
									};
									break;
								case 7:
									if (wy == undergroundLayers[i] + layersGenerated - 1 && cy == chunkSize - 1) {
										if (r > .5) {
											world[wx + (wy * worldWidth)].tiles.push(new Serpentinite((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
										} else {
											world[wx + (wy * worldWidth)].tiles.push(new Granite((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
										};
									} else {
										world[wx + (wy * worldWidth)].tiles.push(new Serpentinite((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
									};
									break;
								case 8:
									if (wy == undergroundLayers[i] + layersGenerated - 1 && cy == chunkSize - 1) {
										if (r > .5) {
											world[wx + (wy * worldWidth)].tiles.push(new Granite((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
										} else {
											world[wx + (wy * worldWidth)].tiles.push(new Gabbro((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
										};
									} else {
										world[wx + (wy * worldWidth)].tiles.push(new Granite((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
									};
									break;
								case 9:
									if (wy == undergroundLayers[i] + layersGenerated - 1 && cy == chunkSize - 1) {
										if (r > .5) {
											world[wx + (wy * worldWidth)].tiles.push(new Gabbro((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
										} else {
											world[wx + (wy * worldWidth)].tiles.push(new Pegmatite((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
										};
									} else {
										world[wx + (wy * worldWidth)].tiles.push(new Gabbro((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
									};
									break;
								case 10:
									if (wy == undergroundLayers[i] + layersGenerated - 1 && cy == chunkSize - 1) {
										if (r > .5) {
											world[wx + (wy * worldWidth)].tiles.push(new Pegmatite((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
										} else {
											world[wx + (wy * worldWidth)].tiles.push(new Periodite((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
										};
									} else {
										world[wx + (wy * worldWidth)].tiles.push(new Pegmatite((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
									};
									break;
								case 11:
									world[wx + (wy * worldWidth)].tiles.push(new Periodite((wx * chunkSize * tileSize) + (cx * tileSize), (wy * chunkSize * tileSize) + (cy * tileSize), [wx, wy, cx, cy], false));
							};
						};
					};
				};
			};
		};
		layersGenerated += undergroundLayers[i];
	};
	
	for(var w=0;w<world.length;w++){
		world[w].Initialize();
	};
}

function Dist(x1,y1,x2,y2) {
	var d = Math.sqrt( Math.pow(x1-x2,2)+Math.pow(y1-y2,2) );
	return(d);
}

function KeyPressed(key) {
	if(!keys[5]){
		if (key == "w" || key == "W" || key == " ") {keys[0] = true;};
		if (key == "a" || key == "A") {keys[1] = true;};
		if (key == "s" || key == "S") {keys[2] = true;};
		if (key == "d" || key == "D") {keys[3] = true;};
		if (key == "Shift") {keys[4] = true;};
		if (key == "f" || key == "F"){
			if(player.inventory[player.selected][0] == -1 ){
				player.Unequip();
			} else {
				player.Equip();
			};
		};
	};
	if (key == "e" || key == "E") {keys[5] = true;};
	if (key == "x" || key == "X") {player.inventory[player.selected] = [-1,0]};

	if(key == "1" || key == "!"){player.selected = 0;};
	if(key == "2" || key == "@"){player.selected = 1;};
	if(key == "3" || key == "#"){player.selected = 2;};
	if(key == "4" || key == "$"){player.selected = 3;};
	if(key == "5" || key == "%"){player.selected = 4;};
	if(key == "6" || key == "^"){player.selected = 5;};
	if(key == "7" || key == "&"){player.selected = 6;};
	if(key == "8" || key == "*"){player.selected = 7;};
	if(key == "9" || key == "("){player.selected = 8;};
	if(key == "0" || key == ")"){player.selected = 9;};
}

function KeyUp(key){
	if (key == "w"|| key == "W" || key == " ") {keys[0] = false;};
	if (key == "a"|| key == "A" ) {keys[1] = false;};
	if (key == "s"|| key == "S" ) {keys[2] = false;};
	if (key == "d"|| key == "D" ) {keys[3] = false;};
	if (key == "Shift") {keys[4] = false;};
	if (key == "e" || key == "E") {keys[5] = false;};
}

function MouseScrolled(e){
	if(!keys[5]){
		var change = 0;
		if(e.deltaY > 0){
			player.selected++;
		} else if (e.deltaY < 0) {
			player.selected--;
		};

		if(player.selected < 0 ){
			player.selected = 9;
		} else if (player.selected > 9){
			player.selected = 0;
		};
	} else {
		var change = 0;

		if(e.deltaY > 0){
			scroll++;
		} else if (e.deltaY < 0) {
			scroll--;
		};

		if(scroll < 0 ){
			scroll = 0;
		} else if (scroll > craft.recipies.length-5){
			scroll = craft.recipies.length-5;
		};
	};
};

function GetMouseCoords(event){
	mouseX = event.clientX+cmx;
	mouseY = event.clientY+cmy-40;
}

function MousePressed(event){
	
	if(keys[5]){
		for(var c=0;c<5;c++){
			if((mouseX-cmx) > 25 && (mouseX-cmx) < 25+295 && (mouseY-cmy) > (75)+(61*c) && (mouseY-cmy) < (75)+(61*c)+61){
				console.log(Craft(craft.recipies[c+scroll]));
			};
		};
	} else {
		if(Dist(mouseX,mouseY,player.x,player.y) < (tileSize*reach)){
			var cx = Math.floor(mouseX/(chunkSize*tileSize));
			var cy = Math.floor(mouseY/(chunkSize*tileSize));
			var tx = Math.floor((mouseX-(cx*chunkSize*tileSize))/tileSize);
			var ty = Math.floor((mouseY-(cy*chunkSize*tileSize))/tileSize);
			
			if(cx >= 0 && cx < worldWidth &&
				cy >= 0 && cy < worldHeight &&
				tx >= 0 && tx < chunkSize &&
				ty >= 0 && ty < chunkSize){
				var selectedTile = world[cx+(cy*worldWidth)].tiles[tx+(ty*chunkSize)];
				if(event.which == 1 && selectedTile != false){
					if(selectedTile.Damage(player.pickPower,player.pickHardness)){player.AddItem(selectedTile.item)};
				} else if (event.which == 3 && selectedTile == false && Dist(mouseX,mouseY,player.x,player.y) > tileSize) {
					if(player.inventory[player.selected][0] != -1 && player.inventory[player.selected][0] < 64){
						var spawned = false;
						if(player.inventory[player.selected][0] === 0){world[cx+(cy*worldWidth)].tiles[tx+(ty*chunkSize)] = new Grass(tx*(tileSize)+(cx*(tileSize*chunkSize)),ty*tileSize+(cy*tileSize*chunkSize),[cx,cy,tx,ty],true);spawned = true};
						if(player.inventory[player.selected][0] === 1){world[cx+(cy*worldWidth)].tiles[tx+(ty*chunkSize)] = new Dirt(tx*(tileSize)+(cx*(tileSize*chunkSize)),ty*tileSize+(cy*tileSize*chunkSize),[cx,cy,tx,ty],true);spawned = true};
						if(player.inventory[player.selected][0] === 2){world[cx+(cy*worldWidth)].tiles[tx+(ty*chunkSize)] = new Sandstone(tx*(tileSize)+(cx*(tileSize*chunkSize)),ty*tileSize+(cy*tileSize*chunkSize),[cx,cy,tx,ty],true);spawned = true};
						if(player.inventory[player.selected][0] === 3){world[cx+(cy*worldWidth)].tiles[tx+(ty*chunkSize)] = new Shale(tx*(tileSize)+(cx*(tileSize*chunkSize)),ty*tileSize+(cy*tileSize*chunkSize),[cx,cy,tx,ty],true);spawned = true};
						if(player.inventory[player.selected][0] === 4){world[cx+(cy*worldWidth)].tiles[tx+(ty*chunkSize)] = new Limestone(tx*(tileSize)+(cx*(tileSize*chunkSize)),ty*tileSize+(cy*tileSize*chunkSize),[cx,cy,tx,ty],true);spawned = true};
						if(player.inventory[player.selected][0] === 5){world[cx+(cy*worldWidth)].tiles[tx+(ty*chunkSize)] = new RockSalt(tx*(tileSize)+(cx*(tileSize*chunkSize)),ty*tileSize+(cy*tileSize*chunkSize),[cx,cy,tx,ty],true);spawned = true};
						if(player.inventory[player.selected][0] === 6){world[cx+(cy*worldWidth)].tiles[tx+(ty*chunkSize)] = new Slate(tx*(tileSize)+(cx*(tileSize*chunkSize)),ty*tileSize+(cy*tileSize*chunkSize),[cx,cy,tx,ty],true);spawned = true};
						if(player.inventory[player.selected][0] === 7){world[cx+(cy*worldWidth)].tiles[tx+(ty*chunkSize)] = new Marble(tx*(tileSize)+(cx*(tileSize*chunkSize)),ty*tileSize+(cy*tileSize*chunkSize),[cx,cy,tx,ty],true);spawned = true};
						if(player.inventory[player.selected][0] === 8){world[cx+(cy*worldWidth)].tiles[tx+(ty*chunkSize)] = new Phylite(tx*(tileSize)+(cx*(tileSize*chunkSize)),ty*tileSize+(cy*tileSize*chunkSize),[cx,cy,tx,ty],true);spawned = true};
						if(player.inventory[player.selected][0] === 9){world[cx+(cy*worldWidth)].tiles[tx+(ty*chunkSize)] = new Serpentinite(tx*(tileSize)+(cx*(tileSize*chunkSize)),ty*tileSize+(cy*tileSize*chunkSize),[cx,cy,tx,ty],true);spawned = true};
						if(player.inventory[player.selected][0] === 10){world[cx+(cy*worldWidth)].tiles[tx+(ty*chunkSize)] = new Gabbro(tx*(tileSize)+(cx*(tileSize*chunkSize)),ty*tileSize+(cy*tileSize*chunkSize),[cx,cy,tx,ty],true);spawned = true};
						if(player.inventory[player.selected][0] === 11){world[cx+(cy*worldWidth)].tiles[tx+(ty*chunkSize)] = new Granite(tx*(tileSize)+(cx*(tileSize*chunkSize)),ty*tileSize+(cy*tileSize*chunkSize),[cx,cy,tx,ty],true);spawned = true};
						if(player.inventory[player.selected][0] === 12){world[cx+(cy*worldWidth)].tiles[tx+(ty*chunkSize)] = new Pegmatite(tx*(tileSize)+(cx*(tileSize*chunkSize)),ty*tileSize+(cy*tileSize*chunkSize),[cx,cy,tx,ty],true);spawned = true};
						if(player.inventory[player.selected][0] === 13){world[cx+(cy*worldWidth)].tiles[tx+(ty*chunkSize)] = new Periodite(tx*(tileSize)+(cx*(tileSize*chunkSize)),ty*tileSize+(cy*tileSize*chunkSize),[cx,cy,tx,ty],true);spawned = true};
						if(player.inventory[player.selected][0] === 14){world[cx+(cy*worldWidth)].tiles[tx+(ty*chunkSize)] = new Malachite(tx*(tileSize)+(cx*(tileSize*chunkSize)),ty*tileSize+(cy*tileSize*chunkSize),[cx,cy,tx,ty],true);spawned = true};
						if(player.inventory[player.selected][0] === 15){world[cx+(cy*worldWidth)].tiles[tx+(ty*chunkSize)] = new Cassiterite(tx*(tileSize)+(cx*(tileSize*chunkSize)),ty*tileSize+(cy*tileSize*chunkSize),[cx,cy,tx,ty],true);spawned = true};
						if(player.inventory[player.selected][0] === 16){world[cx+(cy*worldWidth)].tiles[tx+(ty*chunkSize)] = new Hematite(tx*(tileSize)+(cx*(tileSize*chunkSize)),ty*tileSize+(cy*tileSize*chunkSize),[cx,cy,tx,ty],true);spawned = true};
						if(player.inventory[player.selected][0] === 17){world[cx+(cy*worldWidth)].tiles[tx+(ty*chunkSize)] = new Furnace(tx*(tileSize)+(cx*(tileSize*chunkSize)),ty*tileSize+(cy*tileSize*chunkSize),[cx,cy,tx,ty],true);spawned = true};
						if (player.inventory[player.selected][0] === 18) { world[cx + (cy * worldWidth)].tiles[tx + (ty * chunkSize)] = new Anvil(tx * (tileSize) + (cx * (tileSize * chunkSize)), ty * tileSize + (cy * tileSize * chunkSize), [cx, cy, tx, ty], true); spawned = true };
						
						if(spawned === true){
							world[cx+(cy*worldWidth)].tiles[tx+(ty*chunkSize)].UpdateChunks();
							player.RemoveItem(player.selected,undefined,1);
						};
					};
				};
			};
		};
	};
}

Start();
setInterval(function(){Draw()},10);