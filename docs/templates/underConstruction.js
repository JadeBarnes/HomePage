const noticeBar = document.createElement("template");

noticeBar.innerHTML = `
<div class="rowHolder">
	<hr/>
	<div class="columnHolder">
		<img src="` + toRootDirectory + `assets/icons/UnderConstructionIcon.png" alt="Wrench Icon" style="width:32px; height:32px; float:left;">
		<h2  style="height:32px; padding-top:3px; flex-grow:1">Note: This page is still under construction.</h2>
		<img src="` + toRootDirectory + `assets/icons/UnderConstructionIcon.png" alt="Screwdriver Icon" style="width:32px; height:32px; float:right;">
	</div>
	<hr/>
<div/>
`

document.getElementById("middleBit").insertBefore( noticeBar.content, document.getElementById("underConstructionNoticeBar") );