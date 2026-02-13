var stations = [];

class Crafting {
	constructor(){
		this.recipies = [
//		[itemNumber,itemName,amountCrafted,materials[[ingredient1Number,amount],[ingredient2Number,amount], crafting station ]]
			[17, "Furnace", 1, [[80, 8], [64, 4]], false],
			[18, "Anvil", 1, [[68, 10]], false], //New Additions 1-4-23
			[65,"Copper",1,[[64,1], [14,1]], 17 ],
			[67,"Bronze",2,[[64,2], [14,1], [15,1]], 17 ],
			[68,"Iron",1,[[64,2], [16,1]], 17 ],
			[69,"Steel",1,[[64,3], [16,2], [4,2]], 17 ],
			[72,"Bronze Pickaxe",1,[ [67,8]], false ],
			[73,"Iron Pickaxe",1,[[68,8]], 18 ],
			[74,"Steel Pickaxe",1,[[69,8]], 18 ],

			//New Additions 1-4-23
			[82, "Diamond Pickaxe", 1, [[74, 1], [78, 5], [79, 5]], 18],
			[81, "Torch", 1, [[65, 4], [64, 6]], false],
			[84, "Ruby Staff", 1, [[67, 4], [77, 8]], 18],
			[83, "Flashlight", 1, [[69, 4], [75, 4], [76, 4], [77, 4]], 18]
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
		//console.log(r[4]);
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