


const headerBar = document.createElement("template");
const footerBar = document.createElement("template");
const particleLife = document.createElement("template");
	let particleLife_script1 = document.createElement("script");
	let particleLife_script2 = document.createElement("script");

//Find path to root directory. This is used for icons and links
let path = location.pathname.toString();
	//Trim directory
while( path.indexOf("HomePage") != 0 ){
	path = path.substring( path.indexOf("/") + 1 );
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
					<img src='` + toRootDirectory + `icons/home.png' class='buttonImg'>Homepage</img>
				</p>
			</a>
	 		`+ portfolioButtonStatus +`
				<p class='bt'>
					<img src='` + toRootDirectory + `icons/portfolio.png' class='buttonImg'>Portfolio</img>
				</p>
			</a>
				`+ aboutMeButtonStatus +`
					<p class='bt'>
						<img src='` + toRootDirectory + `icons/aboutme.png' class='buttonImg'>About me</img>
					</p>
				</a>
		</div>
</div>
`;

footerBar.innerHTML = `
<div id="bottomBar">
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