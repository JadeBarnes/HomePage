const headerBar = document.createElement("template");
const footerBar = document.createElement("template");
const particleLife = document.createElement("template");
	let particleLife_script1 = document.createElement("script");
	let particleLife_script2 = document.createElement("script");

//Find path to root directory. This is used for icons and links
let path = location.pathname.toString();

	//Trim directory
if( (path.indexOf("docs") != 0) ){
	while( (path.indexOf("docs") != 0) ){
		path = path.substring( path.indexOf("/") + 1 );
	};
} else {
	console.log(path);
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

//Find which page we're on. This is used to find "dead buttons"
path = location.pathname.toString();
path = path.substring( path.lastIndexOf("/") + 1 );
let homeButtonStatus = (path === "home.html" ? `<a class='deadButton custyButtonTopBar' id='topBarButton'>` : `<a href='` + toRootDirectory + `home.html' class='custyButton custyButtonTopBar' id='topBarButton'>`);
let aboutMeButtonStatus = (path === "AboutMe.html" ? `<a class='deadButton custyButtonTopBar' id='topBarButton'>` : `<a href='` + toRootDirectory + `AboutMe.html' class='custyButton custyButtonTopBar' id='topBarButton'>`);


let portfolioButtonStatus = ``;
if(path === "AboutMe.html" || path === "home.html"){
	//On a home or about me pages, standard button
	portfolioButtonStatus = `<a href='portfolio/Portfolio.html' class='custyButton custyButtonTopBar' id='topBarButton'>`
} else if (path === "Portfolio.html"){
	//On portfolio page, dead button
	portfolioButtonStatus = `<a class='deadButton custyButtonTopBar' id='topBarButton'>`;
} else {
	//On a subpage of portfolio, dead button with working link
	portfolioButtonStatus = `<a href="` + toRootDirectory + `/portfolio/Portfolio.html" class='deadButton custyButtonTopBar' id='topBarButton'>`;
};

const actualHeader = document.createElement("template");
actualHeader.innerHTML = `
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Jaiden's Homepage</title>
`

headerBar.innerHTML = `
<div class='topBar'>
	<p class='title'>Jaiden Barnes</p>
	 	<hr>
	 	<div class='topBarButtonPanel'>
	 		`+ homeButtonStatus +`
				<p class='bt'>
					<img src='` + toRootDirectory + `assets/icons/home.png' class='buttonImg'>Homepage</img>
				</p>
			</a>
	 		`+ portfolioButtonStatus +`
				<p class='bt'>
					<img src='` + toRootDirectory + `assets/icons/portfolio.png' class='buttonImg'>Portfolio</img>
				</p>
			</a>
				`+ aboutMeButtonStatus +`
					<p class='bt'>
						<img src='` + toRootDirectory + `assets/icons/aboutme.png' class='buttonImg'>About me</img>
					</p>
				</a>
		</div>
</div>
`;

footerBar.innerHTML = `
<div id="bottomBar">
	<button id="dyslexicFontButton" type="button" onclick="toggleDyslexicFont()" style="float:right;"> Change font </button>
	
	
	<p class="bottomText">Contact Me At:</p>
	<p class="bottomText">michaelapbarneswork@gmail.com</p>
</div>
`;

particleLife.innerHTML = `
<div style="width:100%; height:100%;" id="canvasHolder">
	<canvas id="canvasParticleLife">
	</canvas>
</div>
`;

particleLife_script1.src = toRootDirectory.toString() + "particleLife/particle.js";
particleLife_script2.src = toRootDirectory.toString() + "particleLife/main.js";


//Create content
	//HTML Head
document.head.appendChild(actualHeader.content);

	//Particle Life Background
document.body.appendChild(particleLife.content);
document.body.appendChild(particleLife_script1);
document.body.appendChild(particleLife_script2);

	//Header
document.body.appendChild(headerBar.content);
	//Content
document.body.appendChild(document.getElementById("pageContent").content);
	//Footer
document.body.appendChild(footerBar.content);





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
	console.log(font);
}
if (font === "" || font === "tohama"){
	bigElementThatMakesAllTheRules.style.fontFamily = "Tahoma";
} else if (font === "openDylsexic"){
	bigElementThatMakesAllTheRules.style.fontFamily = "OpenDyslexic";
};