



const noticeBar = document.createElement("template");



//Find path to root directory. This is used for icons and links
//NOTE: This has to be slightly differant than the other function for some reason that I can't be asked for figure out right now

let pathForNotice = location.pathname.toString();
	//Trim directory
let localHostTestForNotice = 0;
while( pathForNotice.indexOf("HomePage") != 0 ){
	pathForNotice = pathForNotice.substring( pathForNotice.indexOf("/") + 1 );
	localHostTestForNotice++;
	if(localHostTestForNotice >= 6) {
		break;
	};
};

pathForNotice = location.pathname.toString();
if(localHostTestForNotice >= 6) {
	while( pathForNotice.indexOf("docs") != 0 ){
		pathForNotice = pathForNotice.substring( pathForNotice.indexOf("/") + 1 );
	};
};
	//Find all forward slashes
let depthForNotice = 0;
while( pathForNotice.indexOf("/") != -1 ){
	pathForNotice = pathForNotice.substring( pathForNotice.indexOf("/") + 1 );
	depthForNotice++;
};
let toRootDirectoryForNoticeBar = ``;
let iNotice = 1;
while( iNotice != depthForNotice ){
	toRootDirectoryForNoticeBar = toRootDirectoryForNoticeBar + `../`;
	iNotice++;
};



noticeBar.innerHTML = `
<div class="rowHolder">
	<hr/>
	<div class="columnHolder">
		<img src="` + toRootDirectoryForNoticeBar + `assets/icons/UnderConstructionIcon.png" alt="Wrench Icon" style="width:32px; height:32px; float:left;">
		<h2  style="height:32px; padding-top:3px; flex-grow:1">Note: This page is still under construction.</h2>
		<img src="` + toRootDirectoryForNoticeBar + `assets/icons/UnderConstructionIcon.png" alt="Screwdriver Icon" style="width:32px; height:32px; float:right;">
	</div>
	<hr/>
<div/>
`

document.getElementById("middleBit").insertBefore( noticeBar.content, document.getElementById("underConstructionNoticeBar") );