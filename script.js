document.addEventListener("DOMContentLoaded", ()=>{
	
	//get the svg map
fetch("https://upload.wikimedia.org/wikipedia/commons/1/1a/Blank_US_Map_%28states_only%29.svg")
	.then(res => res.text())
	.then(svg => {
		document.querySelector("main footer").innerHTML = svg;
		svg = document.querySelector("svg");
		let w = svg.getAttribute("width");
		let h = svg.getAttribute("height");
		svg.setAttribute("width", "100%");
		svg.removeAttribute("height");
		svg.setAttribute("preserveAspectRatio", "xMinYMin meet");
		svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
        toolTipInit();
	});
	
});

var tooltip;

const toolTips = {
    ca:"My wife and I met and live in San Diego.",
    la:"My mom's side of the family is from Oak Grove, Louisiana. They moved around a lot, but The South is where they made their home.",
    ma:"My extended family have made their way to Massachusetts and New Hampshire. I love the Boston area!",
    va:"I was born in Virginia, right outside of Washington D.C. My dad was an FBI Agent and my mom was a Teacher. I get my analytical side from my dad and my intuitive side from my mom!"
};

//document.addEventListener("DOMContentLoaded", init);

function toolTipInit(){
	document.querySelectorAll("path.ca, path.la, path.va, path.ma").forEach(setupTooltip);
}

function setupTooltip(img){
    console.log(img);
	img.addEventListener("mouseover", tooltipOn);
}	

function tooltipOn(e){
	e.target.removeEventListener("mouseover", tooltipOn);
	e.target.addEventListener("mousemove", tooltipMove);
	e.target.addEventListener("mouseout", tooltipOff);
	tooltip = document.createElement("div");
	tooltip.id = "tooltip";
	tooltip.innerHTML = toolTips[e.currentTarget.getAttribute("class")];
	tooltipMove(e);
	document.body.appendChild(tooltip);
}

function tooltipMove(e){
	tooltip.style.left = e.pageX + "px";
	tooltip.style.top = e.pageY + "px";
}

function tooltipOff(e){
	e.target.removeEventListener("mousemove", tooltipMove);
	e.target.removeEventListener("mouseout", tooltipOff);
	e.target.addEventListener("mouseover", tooltipOn);
	document.body.removeChild(tooltip);
}
		