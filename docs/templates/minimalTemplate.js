

const background = document.createElement("template");
const minimalistHeaderBar = document.createElement("template");
const infoPanel = document.createElement("template");

//Find path to root directory. This is used for icons and links
let path = location.pathname.toString();
	//Trim directory
while( (path.indexOf("docs") != 0) ){
	console.log("before: " + path);
	path = path.substring( path.indexOf("/") + 1 );
	console.log("after : " + path);
};

	//Find all forward slashes
let depth = 0;
while( path.indexOf("/") != -1 ){
	path = path.substring( path.indexOf("/") + 1 );
	depth++;
};
//console.log("File Depth = " + depth);
	//Generate directory ammendment
let toRootDirectory = ``;
let i = 1;
while( i != depth ){
	toRootDirectory = toRootDirectory + `../`;
	i++;
};

background.innerHTML = `
<div id="backPanel">
</div>
`

const actualHeader = document.createElement("template");
actualHeader.innerHTML = `
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Jaiden's Homepage</title>
`

minimalistHeaderBar.innerHTML = `
<div style="width:100%;height:100%;">
	<div class="columnHolder" style="justify-content:left;">
		<div class="topBarButtonPanel" style="height:38px;" >
			<a href="../Portfolio.html" class="custyButton custyButtonTopBar" id="topBarButton" > <p class="bt"><img src="../../assets/icons/back.png" class="buttonImg">Back</p> </a>
			<a href="../../home.html" class="custyButton custyButtonTopBar" id="topBarButton" > <p class="bt"><img src="../../assets/icons/home.png" class="buttonImg">Home</p> </a>
		</div>
		
		<div class="topBarButtonPanel" style="height:38px;" >
			<a onclick="myFunction()" class="custyButton custyButtonTopBar" id="topBarButton" style="width:150px" > <p class="bt"><img src="../../assets/icons/questionmark.png" class="buttonImg">About</p> </a>
		</div>
	</div>
</div>
`;

infoPanel.innerHTML = `
<div class="infoPanel" id="infoPanel" onclick="myFunction()">
`+ document.getElementById("infoPanelContent").innerHTML +`
</div>
`;


//Create content
	//HTML Head
document.head.appendChild(actualHeader.content);

	//Background
document.body.appendChild(background.content);
	//Header
document.getElementById("backPanel").appendChild(minimalistHeaderBar.content);
	//Content
document.getElementById("backPanel").appendChild( document.getElementById("pageContent").content );
	//Info panel overlay
document.getElementById("backPanel").appendChild( infoPanel.content );




function myFunction() {
	var x = document.getElementById("infoPanel");
	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}




let font = getCookie("font");
let bigElementThatMakesAllTheRules = document.querySelector("*");

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function toggleDyslexicFont(){
	font = getCookie("font");
	
	if (font === "" || font === "tohama"){
		document.cookie = "font=openDylsexic; expires=; path=/"; 
		bigElementThatMakesAllTheRules.style.fontFamily = "OpenDyslexic";
	} else if (font === "openDylsexic"){
		document.cookie = "font=tohama; expires=; path=/"; 
		bigElementThatMakesAllTheRules.style.fontFamily = "Tahoma";
	};
	
	font = getCookie("font");
}
if (font === "" || font === "tohama"){
	bigElementThatMakesAllTheRules.style.fontFamily = "Tahoma";
} else if (font === "openDylsexic"){
	bigElementThatMakesAllTheRules.style.fontFamily = "OpenDyslexic";
};