let formioliFontOn = true;

function toggleFont(){
	
	
	let allElementsBig = document.querySelectorAll(".formiolli");
	let allEmementsSmall = document.querySelectorAll(".formiolliSmall");
	
	
	if(formioliFontOn){
		for (const e of allElementsBig) {
			e.style.fontFamily = "Tahoma";
		};
		
		for (const e of allEmementsSmall) {
			e.style.fontFamily = "Tahoma";
		};
	} else {
		for (const e of allElementsBig) {
			e.style.fontFamily = "formiollimedium";
		};
		
		for (const e of allEmementsSmall) {
			e.style.fontFamily = "formiollismallmedium";
		};
	};
	
	
	formioliFontOn = !formioliFontOn;
}