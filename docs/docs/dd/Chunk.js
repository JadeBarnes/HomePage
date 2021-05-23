class Chunk {
	constructor(x,y){
		this.chunkX = x;
		this.chunkY = y;
		this.tiles = [];
	};

	Render(){
		if(this.chunkX*(chunkSize*tileSize)+(chunkSize*tileSize) > cmx && this.chunkX*(chunkSize*tileSize) < cmx+window.innerWidth){
			if(this.chunkY*(chunkSize*tileSize)+(chunkSize*tileSize) > cmy && this.chunkY*(chunkSize*tileSize) < cmy+window.innerWidth){
				for(var rend=0;rend<this.tiles.length;rend++){
					if(this.tiles[rend] != false){
						this.tiles[rend].Update();
					};
				};

				if(debug){
					ctx.beginPath();
					ctx.strokeStyle = "#00f";
					ctx.rect(this.chunkX*(chunkSize*tileSize),this.chunkY*(chunkSize*tileSize),(tileSize*chunkSize),(tileSize*chunkSize));
					ctx.stroke();
					ctx.closePath();
				};
			};
		};
	}
	
	Mesh(){
		for(var mesh=0;mesh<this.tiles.length;mesh++){
			if(this.tiles[mesh] != false){
				this.tiles[mesh].adj = [false,false,false,false];
				this.tiles[mesh].FindAdjacents();
			};
		};
	};

	Initialize(){
		for(var mesh=0;mesh<this.tiles.length;mesh++){
			if(this.tiles[mesh] != false){
				this.tiles[mesh].adj = [false,false,false,false];
				this.tiles[mesh].Initialize();
			};
		};
	};

	Destroy(){
		this.tiles = [];
	};
}