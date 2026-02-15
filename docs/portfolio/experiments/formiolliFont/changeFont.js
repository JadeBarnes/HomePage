let formioliFontOn = true;

function toggleFont(){
	
	
	let allElementsBig = document.querySelectorAll(".formiolli");
	let allEmementsSmall = document.querySelectorAll(".formiolliSmall");
	
	let desiredFont = getCookie("font");
	
	if(desiredFont === "" || desiredFont === "tohama"){
		desiredFont = "Tahoma";
	} else {
		desiredFont = "OpenDyslexic";
	};
	
	
	
	
	if(formioliFontOn){
		for (const e of allElementsBig) {
			e.style.fontFamily = desiredFont;
		};
		
		for (const e of allEmementsSmall) {
			e.style.fontFamily = desiredFont;
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