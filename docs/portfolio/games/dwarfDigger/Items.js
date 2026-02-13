class Item {
	constructor(){
		this.number;
		this.tag = "Item";
	}
}

class Tool extends Item {
	constructor(){
		super();
		this.duribility;
		this.hardness;
		this.power;
		this.type;
		this.tag = "Tool";
	}
}


//Items-------------------------------
class Coal extends Item {
	constructor(){
		super();
		this.number = 64;
	}
}

class Copper extends Item {
	constructor(){
		super();
		this.number = 65;
	}
}

class Tin extends Item {
	constructor(){
		super();
		this.number = 66;
	}
}

class Bronze extends Item {
	constructor(){
		super();
		this.number = 67;
	}
}

class Iron extends Item {
	constructor(){
		super();
		this.number = 68;
	}
}

class Steel extends Item {
	constructor(){
		super();
		this.number = 69;
	}
}

class Gold extends Item {
	constructor(){
		super();
		this.number = 70;
	}
}




//Tools-------------------------------
class CopperPickaxe extends Tool {
	constructor(){
		super();
		this.number = 71;
		this.hardness = 2;
		this.power = 1;
		this.type = "Pickaxe";
	}
}

class BronzePickaxe extends Tool {
	constructor(){
		super();
		this.number = 72;
		this.hardness = 3;
		this.power = 2;
		this.type = "Pickaxe";
	}
}

class IronPickaxe extends Tool {
	constructor(){
		super();
		this.number = 73;
		this.hardness = 4;
		this.power = 4;
		this.type = "Pickaxe";
	}
}

class SteelPickaxe extends Tool {
	constructor(){
		super();
		this.number = 74;
		this.hardness = 5;
		this.power = 6;
		this.type = "Pickaxe";
	}
}


//New Items 1-4-23
class MiningHelmet extends Tool {
	constructor(){
		super();
		this.number = 81;
		this.armor = 1;
		this.light = 150;
		this.type = "Headwear";
	}
}

class DiamondPickaxe extends Tool {
	constructor() {
		super();
		this.number = 82;
		this.hardness = 100;
		this.power = 100;
		this.type = "Pickaxe";
	}
}

class RubyStaff extends Tool {
	constructor() {
		super();
		this.number = 84;
		this.armor = 1;
		this.light = 300;
		this.type = "Headwear";
	}
}

class Flashlight extends Tool {
	constructor() {
		super();
		this.number = 83;
		this.armor = 1;
		this.light = 600;
		this.type = "Headwear";
	}
}