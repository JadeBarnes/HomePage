var stations = [];

class Crafting {
	constructor(){
		this.recipies = [
//		[itemNumber,itemName,amountCrafted,materials[[ingredient1Number,amount],[ingredient2Number,amount], ... ]]
			[17,"Furnace",1,[[80,20], [64,5]], false],
			[65,"Copper",1,[[64,2], [14,1]], 17 ],
			[67,"Bronze",2,[[64,3], [14,1], [15,1]], 17 ],
			[68,"Iron",1,[[64,3], [16,1]], 17 ],
			[69,"Steel",1,[[64,6], [16,2], [4,2]], 17 ],
			[71,"Copper Pickaxe",1,[ [65,10]], false ],
			[72,"Bronze Pickaxe",1,[ [67,10]], false ],
			[73,"Iron Pickaxe",1,[[68,10]], false ],
			[74,"Steel Pickaxe",1,[[69,10]], false ]
			
			/*[75,"Mining Helmet",1,[ [65,8], [64,15] ]]*/
		];
	};
}

function Craft(r){
	var canCraft = true;
	for(var C = 0; C < r[3].length; C++){
		if(player.SearchForItem(r[3][C][0],r[3][C][1]) == false ){
			canCraft = false;
		};
	};
	if(player.SearchForItem(-1,0) == false ){
		canCraft = false;
	};
	if(r[4] != false){
		console.log(r[4]);
		stationFound = false;
		for(var S = 0; S < stations.length; S++){
			if(stations[S][0] == r[4]){
				if( Dist(stations[S][1], stations[S][2], player.x, player.y ) < 100){
					stationFound = true;
					break;
				};
			};
		};
		if(!stationFound){
			canCraft = false;
		};
	};

	if(canCraft === true){
		for(var C = 0; C < r[3].length; C++){
			player.RemoveItem(undefined,r[3][C][0],r[3][C][1]);
		};
		for(var A = 0; A < r[2]; A++){
				player.AddItem(r[0]);
			};
	};

	return(canCraft);
}