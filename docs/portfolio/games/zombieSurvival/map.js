var position = {x:0,y:0};
var worldSize = 5;
var chunkSize = 20;
var minimapSize = 3;
var mapVisable = true;

var worldMap = [];
var zombieMap = [];

function createNewMap () {
	worldMap = [];
	zombieMap = [];
	var worldXRand = Math.floor(Math.random()*(worldSize-1))+1;
	var worldYRand = Math.floor(Math.random()*(worldSize-1))+1;
	//var worldXRand = 0;
	//var worldYRand = 0;
	var chunkXRand = Math.floor(Math.random()*(chunkSize-2))+1;
	var chunkYRand = Math.floor(Math.random()*(chunkSize-2))+1;

	for(chunky=0;chunky<worldSize;chunky++){
		for(chunkx=0;chunkx<worldSize;chunkx++){

			var localMapTemp = [];
			for(localy=0;localy<chunkSize;localy++){
				for(localx=0;localx<chunkSize;localx++){
					var rand = Math.random();
					if(rand <= .2){
						localMapTemp.push(new Tile(localx,localy,(500/chunkSize),false,"rgb(50,50,50)"));
					} else if (rand >= .995) {
						if(rand <= .9995){
							if(localx === chunkSize){console.log(test)}; //?
							if(localx != 0 && localx != chunkSize-1 && localy != 0 && localy != chunkSize-1){
								localMapTemp.push(new Pickup(SelectRandomGun("common"),localx,localy,(500/chunkSize)/2,false,"rgb(0,0,255)","common"));
							} else {localMapTemp.push(false)};
						} else {
							if(localx != 0 && localx != chunkSize-1 && localy != 0 && localy != chunkSize-1){
								localMapTemp.push(new Pickup(SelectRandomGun("super"),localx,localy,(500/chunkSize)/2,false,"rgb(255,100,100)","rare"));
							} else {localMapTemp.push(false)};
						}
					} else {
						localMapTemp.push(false);
					};
				};
			};

			if(worldXRand === chunkx && worldYRand === chunky){
				localMapTemp[chunkXRand+(chunkYRand*chunkSize)] = new Goal(chunkXRand,chunkYRand,(500/chunkSize),false,"rgb(255,255,0)");

				localMapTemp[(chunkXRand-1)+((chunkYRand+1)*chunkSize)] = new Tile(chunkXRand-1,chunkYRand+1,(500/chunkSize),false,"rgb(50,50,50)");
				localMapTemp[(chunkXRand)+((chunkYRand+1)*chunkSize)] = new Tile(chunkXRand,chunkYRand+1,(500/chunkSize),false,"rgb(50,50,50)");
				localMapTemp[(chunkXRand+1)+((chunkYRand+1)*chunkSize)] = new Tile(chunkXRand+1,chunkYRand+1,(500/chunkSize),false,"rgb(50,50,50)");
				localMapTemp[(chunkXRand+1)+((chunkYRand)*chunkSize)] = new Tile(chunkXRand+1,chunkYRand,(500/chunkSize),false,"rgb(50,50,50)");
				localMapTemp[(chunkXRand+1)+((chunkYRand-1)*chunkSize)] = new Tile(chunkXRand+1,chunkYRand-1,(500/chunkSize),false,"rgb(50,50,50)");
				localMapTemp[(chunkXRand)+((chunkYRand-1)*chunkSize)] = new Tile(chunkXRand,chunkYRand-1,(500/chunkSize),false,"rgb(50,50,50)");
				localMapTemp[(chunkXRand-1)+((chunkYRand-1)*chunkSize)] = new Tile(chunkXRand-1,chunkYRand-1,(500/chunkSize),false,"rgb(50,50,50)");
				localMapTemp[(chunkXRand-1)+((chunkYRand)*chunkSize)] = new Tile(chunkXRand-1,chunkYRand,(500/chunkSize),false,"rgb(50,50,50)");

				//console.log("Goal at "+worldXRand+ ","+worldYRand);
			};

			for(t=0;t<localMapTemp.length;t++){
				if(localMapTemp[localMapTemp[t].x+((localMapTemp[t].y-1)*chunkSize)] != false &&
				   localMapTemp[localMapTemp[t].x+((localMapTemp[t].y-1)*chunkSize)] != undefined &&
					 localMapTemp[localMapTemp[t].x+((localMapTemp[t].y-1)*chunkSize)].type == "tile"){localMapTemp[t].adjacent[0] = true;};
				if(localMapTemp[localMapTemp[t].x+((localMapTemp[t].y+1)*chunkSize)] != false &&
				   localMapTemp[localMapTemp[t].x+((localMapTemp[t].y+1)*chunkSize)] != undefined &&
					 localMapTemp[localMapTemp[t].x+((localMapTemp[t].y+1)*chunkSize)].type == "tile"){localMapTemp[t].adjacent[2] = true;};
				if(localMapTemp[(localMapTemp[t].x-1)+((localMapTemp[t].y)*chunkSize)] != false &&
				   localMapTemp[(localMapTemp[t].x-1)+((localMapTemp[t].y)*chunkSize)] != undefined &&
					 localMapTemp[(localMapTemp[t].x-1)+((localMapTemp[t].y)*chunkSize)].type == "tile"){localMapTemp[t].adjacent[3] = true;};
				if(localMapTemp[(localMapTemp[t].x+1)+((localMapTemp[t].y)*chunkSize)] != false &&
				   localMapTemp[(localMapTemp[t].x+1)+((localMapTemp[t].y)*chunkSize)] != undefined &&
					 localMapTemp[(localMapTemp[t].x+1)+((localMapTemp[t].y)*chunkSize)].type == "tile"){localMapTemp[t].adjacent[1] = true;};
			};
			
			worldMap.push(localMapTemp);
			if(chunkx === 0 && chunky === 0){
				zombieMap.push( 0 );
			} else {
				zombieMap.push( (10+(Math.random()*10))*difficulty );
			};
		};
	};


}

console.log("5 - Map loaded");