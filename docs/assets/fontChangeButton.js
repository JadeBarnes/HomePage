

function toggleDyslexicFont(){
	let font = document.cookie("font");
	
	if (font === "" || font === "tohama"){
		document.cookie = "font=openDylsexic"; 
	} else if (font === "openDylsexic"){
		document.cookie = "font=tohama"; 
	};
	
	font = getCookie("font");
}