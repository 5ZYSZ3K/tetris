var col = "";
var t1 = new Array(20);
var tp = new Array(4);
var time = 0;
var tm;
var minu = 0;
var hour = 0;
var time1 = "";
tp[0] = Math.floor(Math.random()*7);
tp[1] = Math.floor(Math.random()*7);
tp[2] = Math.floor(Math.random()*7);
tp[3] = Math.floor(Math.random()*7);
var image;
var image1;
var image2;
var begin = 0;
var lines = 0;
var keyb = false;
var dstr = 0;
var combo = false;
var start = true;
var settled = new Array(20);
var r1 = 0;
var r2 = 0;
var r3 = 0;
var r4 = 0;
var r5 = 0;
var r6 = 0;
var score = 0;
var score1 = 0;
var speed = 1000;
var lvl = 1;
let leftWorks = false;
let leftActive;
let leftIt;
let rightWorks = false;
let rightActive;
let rightIt;
var psqr = new Array(4);
psqr[1] = new Array(2);
psqr[2] = new Array(2);
psqr[3] = new Array(2);
psqr[0] = new Array(2);
var osqr = new Array(4);
osqr[1] = new Array(2);
osqr[2] = new Array(2);
osqr[3] = new Array(2);
osqr[0] = new Array(2);
var itr;
let div = document.getElementById("parent");
window.addEventListener('resize', function(){
	if (window.innerWidth < window.innerHeight){
		document.getElementById("container").style.height="100vw";
		document.getElementById("container").style.width="89vw";
	}
	else {
		document.getElementById("container").style.height="99vh";
		document.getElementById("container").style.width="89vh";
	}
	let parentWidth = 0.5*document.getElementById('container').clientWidth-20;
	for (let i=0; i <= 19; i++){
		for (let j=0; j <= 9; j++){
			curdiv = document.getElementById(i+"_"+j);
			curdiv.style.height = (parentWidth/10)+"px";
			curdiv.style.width = (parentWidth/10)+"px";
		}
		div.append(document.createElement("br"));
	}
	document.getElementById("score").style.fontSize = document.getElementsByClassName("info")[0].clientHeight*(5/14)+"px";
	document.getElementById("parent").style.height = (2*parentWidth+20)+"px";
	document.getElementById("parent").style.width = (parentWidth+20)+"px";
	document.getElementById("tet").style.width = (parentWidth+20)+"px";
	if (document.querySelector("#obr img").clientWidth > document.getElementById("tet").clientWidth){
		let obr = document.getElementById("obr");
		obr.style.width = "70%";
		obr.style.marginLeft = "auto";
		obr.style.marginRight = "auto";
		obr.style.height = "auto";
		let img = document.querySelector("#obr img");
		img.style.width =  "100%";
	}
});
function main(){
	if (window.innerWidth < window.innerHeight){
		document.getElementById("container").style.height="100vw";
		document.getElementById("container").style.width="89vw";
	}
	else {
		document.getElementById("container").style.height="99vh";
		document.getElementById("container").style.width="89vh";
	}
	let parentWidth = 0.5*document.getElementById('container').clientWidth-20;
	document.getElementById("parent").style.height = (2*parentWidth+20)+"px";
	document.getElementById("parent").style.width = (parentWidth+20)+"px";
	document.getElementById("tet").style.width = (parentWidth+20)+"px";
	document.getElementById("score").style.fontSize = document.getElementsByClassName("info")[0].clientHeight*(5/14)+"px";
	for (let i=0; i <= 19; i++){
		settled[i] = new Array(10);
		t1[i] = new Array(10);
		for (let j=0; j <= 9; j++){
			settled[i][j] = false;
			let curdiv = document.createElement("div");
			curdiv.setAttribute("id", i+"_"+j);
			curdiv.classList.add('mint');
			div.append(curdiv);
			curdiv.style.height = (parentWidth/10)+"px";
			curdiv.style.width = (parentWidth/10)+"px";
		}
	}
}
function rand(){
	switch(dstr){
		case 1:
			score1 = 40*lvl;
		break;
		case 2:
			score1 = 100*lvl;
		break;
		case 3:
			score1 = 300*lvl;
		break;
		case 4:
			score1 = 1200*lvl;
		break;
	}
	if (combo){
		score1 = score1*2;
	}
	score += score1;
	if (dstr > 0){
		combo = true;
	} else {
		combo = false;
	}
	dstr = 0;
	score1 = 0;
	if (score > lvl*lvl*1000){
		lvl++;
		speed = Math.floor(speed*4/5);
	}
	document.getElementById("score1").innerHTML = 'SCORE<br><font color="red">'+score+"</font>";
	document.getElementById("lvl").innerHTML = 'LVL<br><font color="red">'+lvl+"</font>";
	document.getElementById("lines").innerHTML = 'LINES<br><font color="red">'+lines+"</font>";
	if (start){
		start = false;
		tp[0] = tp[1];
		tp[1] = tp[2];
		tp[2] = tp[3];
		tp[3] = Math.floor(Math.random()*7);
		image = document.createElement("IMG");
		image.setAttribute("src", "tetris1.png");
		image.setAttribute("width", "230");
		image.setAttribute("id", "obr1");
		image.setAttribute("onclick", "stop()");
		image1 = document.getElementById("obr");
		image1.replaceChild(image, image1.childNodes[0]);
		document.getElementById("obr2").remove();
		tm = setInterval(timer, 1000);
		window.addEventListener('keydown', addKeyboardDownListener, false);
		window.addEventListener('keyup', addKeyboardUpListener, false);
		if(detectMob()){
			addTouchListener();
		}
	}
	if (!settled[0][3]&& !settled[0][4] && !settled[0][5] && !settled[0][6] && !settled[1][3]&& !settled[1][4] && !settled[1][5] && !settled[1][6] && !settled[2][4] && !settled[2][5] && !settled[2][6]){
		tp[0] = tp[1];
		tp[1] = tp[2];
		tp[2] = tp[3];
		tp[3] = Math.floor(Math.random()*7);
		switch(tp[0]){
			case 0: onemidthree(); 
			break;
			case 1: oneleftthree(); 
			break;
			case 2: onerightthree(); 
			break;
			case 3: tworighttwo(); 
			break;
			case 4: twolefttwo();
			break;
			case 5: bar();
			break;
			case 6: square();
			break;
		}
	}
	else {
		image = document.createElement("IMG");
		image.setAttribute("src", "tetris2.png");
		image.setAttribute("width", "230");
		image.setAttribute("id", "obr4");
		image.setAttribute("onclick", "cls()");
		image1 = document.getElementById("obr");
		image1.replaceChild(image, image1.childNodes[0]);
		clearInterval(tm);
		score = 0;
		lvl = 1;
		time = 0;
		window.removeEventListener('keydown', addKeyboardDownListener);
		window.removeEventListener('keyup', addKeyboardUpListener);
		if(detectMob()){
			removeTouchListener();
		}
	}
	let squares = document.getElementsByClassName('squares');
	for (let i=0; i<3; i++){
		if(squares[i].firstElementChild) squares[i].removeChild(squares[i].firstElementChild);
		let img = document.createElement("img");
		img.setAttribute("src", "sqr"+tp[i+1]+".png");
		squares[i].append(img);
	}
}
function onemidthree(){
	psqr[0][0] = 0;
	psqr[0][1] = 5;
	psqr[1][0] = 1;
	psqr[1][1] = 4;
	psqr[2][0] = 1;
	psqr[2][1] = 5;
	psqr[3][0] = 1;
	psqr[3][1] = 6;
	itr = setInterval(falling, speed);
}
function oneleftthree(){
	psqr[0][0] = 0;
	psqr[0][1] = 4;
	psqr[1][0] = 1;
	psqr[1][1] = 4;
	psqr[2][0] = 1;
	psqr[2][1] = 5;
	psqr[3][0] = 1;
	psqr[3][1] = 6;
	itr = setInterval(falling, speed);
}
function onerightthree(){
	psqr[0][0] = 0;
	psqr[0][1] = 6;
	psqr[1][0] = 1;
	psqr[1][1] = 6;
	psqr[2][0] = 1;
	psqr[2][1] = 5;
	psqr[3][0] = 1;
	psqr[3][1] = 4;
	itr = setInterval(falling, speed);
}
function tworighttwo(){
	psqr[0][0] = 0;
	psqr[0][1] = 6;
	psqr[1][0] = 0;
	psqr[1][1] = 5;
	psqr[2][0] = 1;
	psqr[2][1] = 5;
	psqr[3][0] = 1;
	psqr[3][1] = 4;
	itr = setInterval(falling, speed);
}
function twolefttwo(){
	psqr[0][0] = 0;
	psqr[0][1] = 4;
	psqr[1][0] = 0;
	psqr[1][1] = 5;
	psqr[2][0] = 1;
	psqr[2][1] = 5;
	psqr[3][0] = 1;
	psqr[3][1] = 6;
	itr = setInterval(falling, speed);
}
function bar(){
	psqr[0][0] = 0;
	psqr[0][1] = 3;
	psqr[1][0] = 0;
	psqr[1][1] = 4;
	psqr[2][0] = 0;
	psqr[2][1] = 5;
	psqr[3][0] = 0;
	psqr[3][1] = 6;
	itr = setInterval(falling, speed);
}
function square(){
	psqr[0][0] = 0;
	psqr[0][1] = 5;
	psqr[1][0] = 0;
	psqr[1][1] = 4;
	psqr[2][0] = 1;
	psqr[2][1] = 5;
	psqr[3][0] = 1;
	psqr[3][1] = 4;
	itr = setInterval(falling, speed);
}
function falling(){
	osqr[0][0] = psqr[0][0];
	osqr[1][0] = psqr[1][0];
	osqr[2][0] = psqr[2][0];
	osqr[3][0] = psqr[3][0];
	osqr[0][1] = psqr[0][1];
	osqr[1][1] = psqr[1][1];
	osqr[2][1] = psqr[2][1];
	osqr[3][1] = psqr[3][1];
	psqr[0][0]++;
	psqr[1][0]++;
	psqr[2][0]++;
	psqr[3][0]++;
	if ((psqr[0][0] > 19 || psqr[1][0] > 19 || psqr[2][0] > 19 || psqr[3][0] > 19) || (settled[psqr[0][0]][psqr[0][1]] || settled[psqr[1][0]][psqr[1][1]] || settled[psqr[2][0]][psqr[2][1]] || settled[psqr[3][0]][psqr[3][1]])){
		psqr[0][0]--;
		psqr[1][0]--;
		psqr[2][0]--;
		psqr[3][0]--;
		settled[psqr[0][0]][psqr[0][1]] = true;
		settled[psqr[1][0]][psqr[1][1]] = true;
		settled[psqr[2][0]][psqr[2][1]] = true;
		settled[psqr[3][0]][psqr[3][1]] = true;
		clearInterval(itr);
		for(i=0; i<=19; i++){
			if(settled[i][0] && settled[i][1] && settled[i][2] && settled[i][3] && settled[i][4] && settled[i][5] && settled[i][6] && settled[i][7] && settled[i][8] && settled[i][9]){
				dstr++;
				lines++;
				for (j=i; j>=0; j--){
					for(k=0; k<10; k++){
						if(j-1 >= 0){
							settled[j][k] = settled[j-1][k];
							document.getElementById(j+"_"+k).style.backgroundColor = document.getElementById((j-1)+"_"+k).style.backgroundColor;
						}
					}
				}
				i--;
			}
		}
		r1 = 0;
		r2 = 0;
		r3 = 0;
		r4 = 0;
		r5 = 0;
		r6 = 0;
		rand();
	}
	else{
		document.getElementById(osqr[0][0]+"_"+osqr[0][1]).style.backgroundColor = "#012";
		document.getElementById(osqr[1][0]+"_"+osqr[1][1]).style.backgroundColor = "#012";
		document.getElementById(osqr[2][0]+"_"+osqr[2][1]).style.backgroundColor = "#012";
		document.getElementById(osqr[3][0]+"_"+osqr[3][1]).style.backgroundColor = "#012";
		switch(tp[0]){
			case 0:
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = '#f0f';
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = "#f0f";
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = "#f0f";
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = "#f0f";
			break;
			case 1:
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = 'orange';
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = 'orange';
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = 'orange';
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = 'orange';
			break;
			case 2:
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = '#0ff';
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = '#0ff';
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = '#0ff';
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = '#0ff';
			break;
			case 3:
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = 'green';
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = 'green';
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = 'green';
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = 'green';
			break;
			case 4:
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = 'red';
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = 'red';
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = 'red';
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = 'red';
			break;
			case 5:
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = 'blue';
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = 'blue';
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = 'blue';
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = 'blue';
			break;
			case 6:
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = 'yellow';
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = 'yellow';
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = 'yellow';
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = 'yellow';
			break;
		}
	}
}
function arrowLeft(){
	if ((psqr[0][1] > 0 && psqr[1][1] > 0 && psqr[2][1] > 0 && psqr[3][1] > 0) && !(settled[psqr[0][0]][psqr[0][1]-1] || settled[psqr[1][0]][psqr[1][1]-1] || settled[psqr[2][0]][psqr[2][1]-1] || settled[psqr[3][0]][psqr[3][1]-1])){
		osqr[0][0] = psqr[0][0];
		osqr[0][1] = psqr[0][1];
		osqr[1][0] = psqr[1][0];
		osqr[1][1] = psqr[1][1];
		osqr[2][0] = psqr[2][0];
		osqr[2][1] = psqr[2][1];
		osqr[3][0] = psqr[3][0];
		osqr[3][1] = psqr[3][1];
		psqr[0][1]--;
		psqr[1][1]--;
		psqr[2][1]--;
		psqr[3][1]--;
		document.getElementById(osqr[0][0]+"_"+osqr[0][1]).style.backgroundColor = "#012";
		document.getElementById(osqr[1][0]+"_"+osqr[1][1]).style.backgroundColor = "#012";
		document.getElementById(osqr[2][0]+"_"+osqr[2][1]).style.backgroundColor = "#012";
		document.getElementById(osqr[3][0]+"_"+osqr[3][1]).style.backgroundColor = "#012";
		switch(tp[0]){
			case 0:
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = '#f0f';
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = "#f0f";
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = "#f0f";
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = "#f0f";
			break;
			case 1:
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = 'orange';
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = 'orange';
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = 'orange';
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = 'orange';
			break;
			case 2:
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = '#0ff';
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = '#0ff';
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = '#0ff';
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = '#0ff';
			break;
			case 3:
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = 'green';
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = 'green';
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = 'green';
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = 'green';
			break;
			case 4:
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = 'red';
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = 'red';
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = 'red';
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = 'red';
			break;
			case 5:
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = 'blue';
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = 'blue';
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = 'blue';
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = 'blue';
			break;
			case 6:
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = 'yellow';
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = 'yellow';
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = 'yellow';
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = 'yellow';
			break;
		}
	}
}
function arrowRight(){
	if (psqr[0][1] < 9 && psqr[1][1] < 9 && psqr[2][1] < 9 && psqr[3][1] < 9 && !settled[psqr[0][0]][psqr[0][1]+1] && !settled[psqr[1][0]][psqr[1][1]+1] && !settled[psqr[2][0]][psqr[2][1]+1] && !settled[psqr[3][0]][psqr[3][1]+1]){
		osqr[0][0] = psqr[0][0];
		osqr[0][1] = psqr[0][1];
		osqr[1][0] = psqr[1][0];
		osqr[1][1] = psqr[1][1];
		osqr[2][0] = psqr[2][0];
		osqr[2][1] = psqr[2][1];
		osqr[3][0] = psqr[3][0];
		osqr[3][1] = psqr[3][1];
		psqr[0][1]++;
		psqr[1][1]++;
		psqr[2][1]++;
		psqr[3][1]++;
		document.getElementById(osqr[0][0]+"_"+osqr[0][1]).style.backgroundColor = "#012";
		document.getElementById(osqr[1][0]+"_"+osqr[1][1]).style.backgroundColor = "#012";
		document.getElementById(osqr[2][0]+"_"+osqr[2][1]).style.backgroundColor = "#012";
		document.getElementById(osqr[3][0]+"_"+osqr[3][1]).style.backgroundColor = "#012";
		switch(tp[0]){
			case 0:
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = '#f0f';
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = "#f0f";
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = "#f0f";
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = "#f0f";
			break;
			case 1:
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = 'orange';
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = 'orange';
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = 'orange';
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = 'orange';
			break;
			case 2:
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = '#0ff';
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = '#0ff';
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = '#0ff';
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = '#0ff';
			break;
			case 3:
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = 'green';
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = 'green';
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = 'green';
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = 'green';
			break;
			case 4:
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = 'red';
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = 'red';
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = 'red';
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = 'red';
			break;
			case 5:
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = 'blue';
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = 'blue';
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = 'blue';
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = 'blue';
			break;
			case 6:
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = 'yellow';
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = 'yellow';
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = 'yellow';
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = 'yellow';
			break;
		}
		clearInterval(itr);
		itr = setInterval(falling, speed);
	}
}
function arrowDown(){
	if (!keyb){
		clearInterval(itr);
		itr = setInterval(falling, speed/10);
		keyb = true;
	}
}
function arrowDownUp(){
	clearInterval(itr);
	itr = setInterval(falling, speed);
	keyb = false;
}
function arrowUp(){
	switch (tp[0]){
		case 0: onemidthreer(); 
		break;
		case 1: oneleftthreer(); 
		break;
		case 2: onerightthreer(); 
		break;
		case 3: tworighttwor(); 
		break;
		case 4: twolefttwor();
		break;
		case 5: barr();
		break;
	}
	clearInterval(itr);
	itr = setInterval(falling, speed);
}
function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}
function Polygon() {
	var pointList = [];
	this.node = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
	function build(arg) {
		var res = [];
		for (var i = 0, l = arg.length; i < l; i++) {
			res.push(arg[i].join(','));
		}
		return res.join(' ');
	}
	this.attribute = function (key, val) {
		if (val === undefined) return this.node.getAttribute(key);
		this.node.setAttribute(key, val);
	};
	this.getPoint = function (i) {
		return pointList[i]
	};
	this.setPoint = function (i, x, y) {
		pointList[i] = [x, y];
		this.attribute('points', build(pointList));
	};
	this.points = function () {
		for (var i = 0, l = arguments.length; i < l; i += 2) {
			pointList.push([arguments[i], arguments[i + 1]]);
		}
		this.attribute('points', build(pointList));
	};
	this.points.apply(this, arguments);
}
if (detectMob()){
	const polygon = new Array(4);
	polygon[0] = new Polygon(315.869,21.178, 294.621,0, 91.566,203.718, 294.621,407.436, 315.869,386.258, 133.924,203.718);
	polygon[1] = new Polygon(386.258,91.567, 203.718,273.512, 21.179,91.567, 0,112.815, 203.718,315.87, 407.437,112.815);
	polygon[2] = new Polygon(112.814,0, 91.566,21.178, 273.512,203.718, 91.566,386.258, 112.814,407.436, 315.869,203.718);
	polygon[3] = document. createElementNS("http://www.w3.org/2000/svg", "path");
	polygon[3].setAttribute("d", "M407.517,123.262l-27.717,11.48c18.585,44.869,18.585,94.29,0,139.159c-18.585,44.869-53.531,79.815-98.4,98.4 c-92.627,38.368-199.194-5.776-237.559-98.4C8.46,188.486,43.246,91.212,121.514,46.501v74.992h30V7.498H37.519v30h43.755 c-73,57.164-102.323,158.139-65.15,247.885c33.754,81.49,112.806,130.768,195.972,130.762c26.96-0.002,54.367-5.184,80.784-16.125 C400.788,355.322,452.213,231.169,407.517,123.262z");
	const svg = new Array(4);
	for(let i=0; i<4; i++){
		svg[i] = document.createElementNS("http://www.w3.org/2000/svg","svg");
		svg[i].setAttribute("id", "Layer_"+i);
		svg[i].setAttribute("version", "1.1");
		svg[i].setAttribute("viewBox", "0 0 512 512");
		svg[i].classList.add("layer");
		document.body.append(svg[i]);
		if (i !== 3) svg[i].append(polygon[i].node);
		else svg[i].append(polygon[i]);
	}
}
function onemidthreer(){
	switch(r1){
		case 0:
			if (psqr[1][0] < 19 && psqr[1][1] < 9 && !(settled[psqr[1][0]+1][psqr[1][1]+1])){
				osqr[1][0] = psqr[1][0];
				osqr[1][1] = psqr[1][1];
				psqr[1][0]++;
				psqr[1][1]++;
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = "#f0f";
				document.getElementById(osqr[1][0]+"_"+osqr[1][1]).style.backgroundColor = "#012";
				r1 = 1;
			} else if (!settled[psqr[1][0]][psqr[1][1]+1] && !settled[psqr[2][0]-1][psqr[2][1]] && !settled[psqr[3][0]-1][psqr[3][1]]){
				osqr[0][0] = psqr[0][0];
				osqr[0][1] = psqr[0][1];
				osqr[1][0] = psqr[1][0];
				osqr[1][1] = psqr[1][1];
				osqr[2][0] = psqr[2][0];
				osqr[2][1] = psqr[2][1];
				osqr[3][0] = psqr[3][0];
				osqr[3][1] = psqr[3][1];
				psqr[1][1]++;
				psqr[0][0]--;
				psqr[2][0]--;
				psqr[3][0]--;
				document.getElementById(osqr[0][0]+"_"+osqr[0][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[1][0]+"_"+osqr[1][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[2][0]+"_"+osqr[2][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[3][0]+"_"+osqr[3][1]).style.backgroundColor = "#012";
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = "#f0f";
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = "#f0f";
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = "#f0f";
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = "#f0f";
				r1 = 1;
			}
		break;
		case 1:
			if (!settled[psqr[0][0]+1][psqr[0][1]-1] && psqr[0][0] < 19 && psqr[0][1] > 0){
				osqr[0][0] = psqr[0][0];
				osqr[0][1] = psqr[0][1];
				psqr[0][0]++;
				psqr[0][1]--;
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = "#f0f";
				document.getElementById(osqr[0][0]+"_"+osqr[0][1]).style.backgroundColor = "#012";
				r1 = 2;
			} else if (!settled[psqr[0][0]+1][psqr[0][1]] && !settled[psqr[1][0]+1][psqr[1][1]+1] && !settled[psqr[2][0]][psqr[2][1]+1] && !settled[psqr[3][0]][psqr[3][1]+1]){
				osqr[0][0] = psqr[0][0];
				osqr[0][1] = psqr[0][1];
				osqr[1][0] = psqr[1][0];
				osqr[1][1] = psqr[1][1];
				osqr[2][0] = psqr[2][0];
				osqr[2][1] = psqr[2][1];
				osqr[3][0] = psqr[3][0];
				osqr[3][1] = psqr[3][1];
				psqr[0][0]++;
				psqr[1][1]++;
				psqr[2][1]++;
				psqr[3][1]++;
				document.getElementById(osqr[0][0]+"_"+osqr[0][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[1][0]+"_"+osqr[1][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[2][0]+"_"+osqr[2][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[3][0]+"_"+osqr[3][1]).style.backgroundColor = "#012";
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = "#f0f";
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = "#f0f";
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = "#f0f";
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = "#f0f";
				r1 = 2;
			}
		break;
		case 2:
			if (psqr[3][0] > 0 && psqr[3][1] > 0 && !settled[psqr[3][0]-1][psqr[3][1]-1]){
				osqr[3][0] = psqr[3][0];
				osqr[3][1] = psqr[3][1];
				psqr[3][0]--;
				psqr[3][1]--;
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = "#f0f";
				document.getElementById(osqr[3][0]+"_"+osqr[3][1]).style.backgroundColor = "#012";
				r1 = 3;
			}
		break;
		case 3:
			if (psqr[1][0]>0 && psqr[1][1] < 9 && !settled[psqr[1][0] -1][psqr[1][1]+1]){
				osqr[1][0] = psqr[1][0];
				osqr[1][1] = psqr[1][1];
				psqr[1][0]--;
				psqr[1][1]++;
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = "#f0f";
				document.getElementById(osqr[1][0]+"_"+osqr[1][1]).style.backgroundColor = "#012";
				psqr[0][0] = psqr[2][0] - 1;
				psqr[0][1] = psqr[2][1] ;
				psqr[1][1] = psqr[2][1] - 1;
				psqr[3][0] = psqr[2][0];
				psqr[3][1] = psqr[2][1] + 1;
				r1 = 0;
			} else if (!settled[psqr[1][0] -1][psqr[1][1]] && !settled[psqr[0][0]][psqr[0][1]-1] && !settled[psqr[2][0]][psqr[2][1]-1]&& !settled[psqr[3][0]][psqr[3][1]-1]){
				osqr[0][0] = psqr[0][0];
				osqr[0][1] = psqr[0][1];
				osqr[1][0] = psqr[1][0];
				osqr[1][1] = psqr[1][1];
				osqr[2][0] = psqr[2][0];
				osqr[2][1] = psqr[2][1];
				osqr[3][0] = psqr[3][0];
				osqr[3][1] = psqr[3][1];
				psqr[1][0]--;
				psqr[0][1]--;
				psqr[2][1]--;
				psqr[3][1]--;
				document.getElementById(osqr[0][0]+"_"+osqr[0][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[1][0]+"_"+osqr[1][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[2][0]+"_"+osqr[2][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[3][0]+"_"+osqr[3][1]).style.backgroundColor = "#012";
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = "#f0f";
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = "#f0f";
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = "#f0f";
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = "#f0f";
				psqr[0][0] = psqr[2][0] - 1;
				psqr[0][1] = psqr[2][1] ;
				psqr[1][1] = psqr[2][1] - 1;
				psqr[3][0] = psqr[2][0];
				psqr[3][1] = psqr[2][1] + 1;
				r1 = 0;
			}
		break;
	}
}
function oneleftthreer(){
	switch(r2){
		case 0:
			if (psqr[3][0] < 19 && !settled[psqr[0][0]][psqr[0][1]+1] && !settled[psqr[0][0]][psqr[0][1]+2] && !settled[psqr[2][0]+1][psqr[2][1]]){
				osqr[0][0] = psqr[0][0];
				osqr[0][1] = psqr[0][1];
				osqr[1][0] = psqr[1][0];
				osqr[1][1] = psqr[1][1];
				osqr[3][0] = psqr[3][0];
				osqr[3][1] = psqr[3][1];
				psqr[0][1] = psqr[0][1] + 2;
				psqr[1][0]--;
				psqr[1][1]++;
				psqr[3][0]++;
				psqr[3][1]--;
				document.getElementById(osqr[0][0]+"_"+osqr[0][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[1][0]+"_"+osqr[1][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[3][0]+"_"+osqr[3][1]).style.backgroundColor = "#012";
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = "orange";
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = "orange";
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = "orange";
				r2 = 1;
			} else if (!settled[psqr[0][0]-1][psqr[0][1]+1] && !settled[psqr[0][0]-1][psqr[0][1]+2] && !settled[psqr[2][0]][psqr[2][1]] && !settled[psqr[2][0]-1][psqr[2][1]]){
				osqr[0][0] = psqr[0][0];
				osqr[0][1] = psqr[0][1];
				osqr[1][0] = psqr[1][0];
				osqr[1][1] = psqr[1][1];
				osqr[2][0] = psqr[2][0];
				osqr[2][1] = psqr[2][1];
				osqr[3][0] = psqr[3][0];
				osqr[3][1] = psqr[3][1];
				psqr[0][1] = psqr[0][1] + 2;
				psqr[0][0]--;
				psqr[1][0]--;
				psqr[1][0]--;
				psqr[2][0]--;
				psqr[1][1]++;
				psqr[3][1]--;
				document.getElementById(osqr[0][0]+"_"+osqr[0][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[1][0]+"_"+osqr[1][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[2][0]+"_"+osqr[2][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[3][0]+"_"+osqr[3][1]).style.backgroundColor = "#012";
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = "orange";
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = "orange";
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = "orange";
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = "orange";
				r2 = 1;
			}
		break;
		case 1:
			if (psqr[3][1] > 0 && !settled[psqr[0][0]+1][psqr[0][1]] && !settled[psqr[0][0]+2][psqr[0][1]] && !settled[psqr[2][0]][psqr[2][1]-1]){
				osqr[0][0] = psqr[0][0];
				osqr[0][1] = psqr[0][1];
				osqr[1][0] = psqr[1][0];
				osqr[1][1] = psqr[1][1];
				osqr[3][0] = psqr[3][0];
				osqr[3][1] = psqr[3][1];
				psqr[0][0] = psqr[0][0] + 2;
				psqr[1][0]++;
				psqr[1][1]++;
				psqr[3][0]--;
				psqr[3][1]--;
				document.getElementById(osqr[0][0]+"_"+osqr[0][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[1][0]+"_"+osqr[1][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[3][0]+"_"+osqr[3][1]).style.backgroundColor = "#012";
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = "orange";
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = "orange";
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = "orange";
				r2 = 2;
			} else if (!settled[psqr[0][0]+1][psqr[0][1]+1] && !settled[psqr[0][0]+2][psqr[0][1]+1] && !settled[psqr[2][0]][psqr[2][1]] && !settled[psqr[2][0]][psqr[2][1]+1]){
				osqr[0][0] = psqr[0][0];
				osqr[0][1] = psqr[0][1];
				osqr[1][0] = psqr[1][0];
				osqr[1][1] = psqr[1][1];
				osqr[2][0] = psqr[2][0];
				osqr[2][1] = psqr[2][1];
				osqr[3][0] = psqr[3][0];
				osqr[3][1] = psqr[3][1];
				psqr[0][0] = psqr[0][0] + 2;
				psqr[1][0]++;
				psqr[0][1]++;
				psqr[1][1]++;
				psqr[1][1]++;
				psqr[2][1]++;
				psqr[3][0]--;
				document.getElementById(osqr[0][0]+"_"+osqr[0][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[1][0]+"_"+osqr[1][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[2][0]+"_"+osqr[2][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[3][0]+"_"+osqr[3][1]).style.backgroundColor = "#012";
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = "orange";
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = "orange";
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = "orange";
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = "orange";
				r2 = 2;
			}
		break;
		case 2:
			if (!settled[psqr[2][0]+1][psqr[2][1]] && !settled[psqr[2][0]+1][psqr[2][1]-1] && !settled[psqr[2][0]-1][psqr[2][1]]){
				osqr[0][0] = psqr[0][0];
				osqr[0][1] = psqr[0][1];
				osqr[1][0] = psqr[1][0];
				osqr[1][1] = psqr[1][1];
				osqr[3][0] = psqr[3][0];
				osqr[3][1] = psqr[3][1];
				psqr[0][1] = psqr[0][1] - 2;
				psqr[1][0]++;
				psqr[1][1]--;
				psqr[3][0]--;
				psqr[3][1]++;
				document.getElementById(osqr[0][0]+"_"+osqr[0][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[1][0]+"_"+osqr[1][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[3][0]+"_"+osqr[3][1]).style.backgroundColor = "#012";
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = "orange";
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = "orange";
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = "orange";
				r2 = 3;
			}
		break;
		case 3:
			if (psqr[1][1] < 9 && !settled[psqr[0][0]-2][psqr[0][1]] && !settled[psqr[0][0]-1][psqr[0][1]] && !settled[psqr[2][0]][psqr[2][1]+1]){
				osqr[0][0] = psqr[0][0];
				osqr[0][1] = psqr[0][1];
				osqr[1][0] = psqr[1][0];
				osqr[1][1] = psqr[1][1];
				osqr[3][0] = psqr[3][0];
				osqr[3][1] = psqr[3][1];
				psqr[0][0] = psqr[0][0] - 2;
				psqr[1][0]--;
				psqr[1][1]--;
				psqr[3][0]++;
				psqr[3][1]++;
				document.getElementById(osqr[0][0]+"_"+osqr[0][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[1][0]+"_"+osqr[1][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[3][0]+"_"+osqr[3][1]).style.backgroundColor = "#012";
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = "orange";
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = "orange";
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = "orange";
				r2 = 0;
			} else if (!settled[psqr[0][0]-2][psqr[0][1]-1] && !settled[psqr[0][0]-1][psqr[0][1]-1] && !settled[psqr[2][0]][psqr[2][1]] && !settled[psqr[2][0]][psqr[2][1]-1]){
				osqr[0][0] = psqr[0][0];
				osqr[0][1] = psqr[0][1];
				osqr[1][0] = psqr[1][0];
				osqr[1][1] = psqr[1][1];
				osqr[2][0] = psqr[2][0];
				osqr[2][1] = psqr[2][1];
				osqr[3][0] = psqr[3][0];
				osqr[3][1] = psqr[3][1];
				psqr[0][0] = psqr[0][0] - 2;
				psqr[0][1]--;
				psqr[1][0]--;
				psqr[1][1]--;
				psqr[1][1]--;
				psqr[2][1]--;
				psqr[3][0]++;
				document.getElementById(osqr[0][0]+"_"+osqr[0][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[1][0]+"_"+osqr[1][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[2][0]+"_"+osqr[2][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[3][0]+"_"+osqr[3][1]).style.backgroundColor = "#012";
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = "orange";
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = "orange";
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = "orange";
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = "orange";
				r2 = 0;
			}
		break;
	}
}
function onerightthreer(){
	switch(r3){
		case 0:
			if (psqr[2][0] < 19 && !settled[psqr[2][0]+1][psqr[2][1]] && !settled[psqr[2][0]+1][psqr[2][1]+1] && !settled[psqr[2][0]-1][psqr[2][1]]){
				osqr[0][0] = psqr[0][0];
				osqr[0][1] = psqr[0][1];
				osqr[1][0] = psqr[1][0];
				osqr[1][1] = psqr[1][1];
				osqr[3][0] = psqr[3][0];
				osqr[3][1] = psqr[3][1];
				psqr[0][0] = psqr[0][0] + 2;
				psqr[1][0]++;
				psqr[1][1]--;
				psqr[3][0]--;
				psqr[3][1]++;
				document.getElementById(osqr[0][0]+"_"+osqr[0][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[1][0]+"_"+osqr[1][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[3][0]+"_"+osqr[3][1]).style.backgroundColor = "#012";
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = "#0ff";
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = "#0ff";
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = "#0ff";
				r3 = 1;
			} else if (!settled[psqr[2][0]][psqr[2][1]] && !settled[psqr[2][0]][psqr[2][1]+1] && !settled[psqr[2][0]-2][psqr[2][1]] && !settled[psqr[2][0]-1][psqr[2][1]]){
				osqr[0][0] = psqr[0][0];
				osqr[0][1] = psqr[0][1];
				osqr[1][0] = psqr[1][0];
				osqr[1][1] = psqr[1][1];
				osqr[2][0] = psqr[2][0];
				osqr[2][1] = psqr[2][1];
				osqr[3][0] = psqr[3][0];
				osqr[3][1] = psqr[3][1];
				psqr[0][0] ++;
				psqr[1][1]--;
				psqr[2][0]--;
				psqr[3][0]--;
				psqr[3][0]--;
				psqr[3][1]++;
				document.getElementById(osqr[0][0]+"_"+osqr[0][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[1][0]+"_"+osqr[1][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[2][0]+"_"+osqr[2][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[3][0]+"_"+osqr[3][1]).style.backgroundColor = "#012";
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = "#0ff";
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = "#0ff";
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = "#0ff";
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = "#0ff";
				r3 = 1;
			}
		break;
		case 1:
			if (psqr[2][1] > 0 && !settled[psqr[2][0]][psqr[2][1]-1] && !settled[psqr[2][0]+1][psqr[2][1]-1] && !settled[psqr[2][0]][psqr[2][1]+1]){
				osqr[0][0] = psqr[0][0];
				osqr[0][1] = psqr[0][1];
				osqr[1][0] = psqr[1][0];
				osqr[1][1] = psqr[1][1];
				osqr[3][0] = psqr[3][0];
				osqr[3][1] = psqr[3][1];
				psqr[0][1] = psqr[0][1] - 2;
				psqr[1][0]--;
				psqr[1][1]--;
				psqr[3][0]++;
				psqr[3][1]++;
				document.getElementById(osqr[0][0]+"_"+osqr[0][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[1][0]+"_"+osqr[1][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[3][0]+"_"+osqr[3][1]).style.backgroundColor = "#012";
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = "#0ff";
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = "#0ff";
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = "#0ff";
				r3 = 2;
			} else if (!settled[psqr[2][0]][psqr[2][1]] && !settled[psqr[2][0]+1][psqr[2][1]] && !settled[psqr[2][0]][psqr[2][1]+1] && !settled[psqr[2][0]][psqr[2][1]+2]){
				osqr[0][0] = psqr[0][0];
				osqr[0][1] = psqr[0][1];
				osqr[1][0] = psqr[1][0];
				osqr[1][1] = psqr[1][1];
				osqr[1][0] = psqr[1][0];
				osqr[1][1] = psqr[1][1];
				osqr[3][0] = psqr[3][0];
				osqr[3][1] = psqr[3][1];
				psqr[0][1]--;
				psqr[1][0]--;
				psqr[2][1]++;
				psqr[3][0]++;
				psqr[3][1]++;
				psqr[3][1]++;
				document.getElementById(osqr[0][0]+"_"+osqr[0][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[1][0]+"_"+osqr[1][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[2][0]+"_"+osqr[2][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[3][0]+"_"+osqr[3][1]).style.backgroundColor = "#012";
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = "#0ff";
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = "#0ff";
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = "#0ff";
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = "#0ff";
				r3 = 2;
			}
		break;
		case 2:
			if (!settled[psqr[2][0]][psqr[2][1]-1] && !settled[psqr[2][0]+1][psqr[2][1]-1] && !settled[psqr[2][0]][psqr[2][1]+1]){
				osqr[0][0] = psqr[0][0];
				osqr[0][1] = psqr[0][1];
				osqr[1][0] = psqr[1][0];
				osqr[1][1] = psqr[1][1];
				osqr[3][0] = psqr[3][0];
				osqr[3][1] = psqr[3][1];
				psqr[0][0] = psqr[0][0] - 2;
				psqr[1][0]--;
				psqr[1][1]++;
				psqr[3][0]++;
				psqr[3][1]--;
				document.getElementById(osqr[0][0]+"_"+osqr[0][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[1][0]+"_"+osqr[1][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[3][0]+"_"+osqr[3][1]).style.backgroundColor = "#012";
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = "#0ff";
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = "#0ff";
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = "#0ff";
				r3 = 3;
			}
		break;
		case 3:
			if (psqr[2][1] < 9 && !settled[psqr[2][0]][psqr[2][1]+1] && !settled[psqr[2][0]-1][psqr[2][1]+1] && !settled[psqr[2][0]][psqr[2][1]-1]){
				osqr[0][0] = psqr[0][0];
				osqr[0][1] = psqr[0][1];
				osqr[1][0] = psqr[1][0];
				osqr[1][1] = psqr[1][1];
				osqr[3][0] = psqr[3][0];
				osqr[3][1] = psqr[3][1];
				psqr[0][1] = psqr[0][1] + 2;
				psqr[1][0]++;
				psqr[1][1]++;
				psqr[3][0]--;
				psqr[3][1]--;
				document.getElementById(osqr[0][0]+"_"+osqr[0][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[1][0]+"_"+osqr[1][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[3][0]+"_"+osqr[3][1]).style.backgroundColor = "#012";
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = "#0ff";
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = "#0ff";
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = "#0ff";
				r3 = 0;
			} else if (!settled[psqr[2][0]][psqr[2][1]] && !settled[psqr[2][0]-1][psqr[2][1]] && !settled[psqr[2][0]][psqr[2][1]-1] && !settled[psqr[2][0]][psqr[2][1]-2]){
				osqr[0][0] = psqr[0][0];
				osqr[0][1] = psqr[0][1];
				osqr[1][0] = psqr[1][0];
				osqr[1][1] = psqr[1][1];
				osqr[2][0] = psqr[2][0];
				osqr[2][1] = psqr[2][1];
				osqr[3][0] = psqr[3][0];
				osqr[3][1] = psqr[3][1];
				psqr[0][1]++;
				psqr[1][0]++;
				psqr[2][1]--;
				psqr[3][0]--;
				psqr[3][1]--;
				psqr[3][1]--;
				document.getElementById(osqr[0][0]+"_"+osqr[0][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[1][0]+"_"+osqr[1][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[2][0]+"_"+osqr[2][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[3][0]+"_"+osqr[3][1]).style.backgroundColor = "#012";
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = "#0ff";
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = "#0ff";
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = "#0ff";
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = "#0ff";
				r3 = 0;
			}
		break;
	}
}
function tworighttwor(){
	switch(r4){
		case 0:
			if (!settled[psqr[1][0]-1][psqr[1][1]] && !settled[psqr[0][0]+1][psqr[0][1]]){
				osqr[0][0] = psqr[0][0];
				osqr[0][1] = psqr[0][1];
				osqr[2][0] = psqr[2][0];
				osqr[2][1] = psqr[2][1];
				osqr[3][0] = psqr[3][0];
				osqr[3][1] = psqr[3][1];
				psqr[0][0]--;
				psqr[0][1]--;
				psqr[2][0]--;
				psqr[2][1]++;
				psqr[3][1]++;
				psqr[3][1]++;
				document.getElementById(osqr[0][0]+"_"+osqr[0][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[2][0]+"_"+osqr[2][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[3][0]+"_"+osqr[3][1]).style.backgroundColor = "#012";
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = "green";
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = "green";
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = "green";
				r4 = 1;
			}
		break;
		case 1:
			if (!settled[psqr[3][0]][psqr[3][1]-2] && !settled[psqr[1][0]+1][psqr[1][1]] && psqr[1][1] > 0){
				osqr[0][0] = psqr[0][0];
				osqr[0][1] = psqr[0][1];
				osqr[2][0] = psqr[2][0];
				osqr[2][1] = psqr[2][1];
				osqr[3][0] = psqr[3][0];
				osqr[3][1] = psqr[3][1];
				psqr[0][0]++;
				psqr[0][1]++;
				psqr[2][0]++;
				psqr[2][1]--;
				psqr[3][1]--;
				psqr[3][1]--;
				document.getElementById(osqr[0][0]+"_"+osqr[0][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[2][0]+"_"+osqr[2][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[3][0]+"_"+osqr[3][1]).style.backgroundColor = "#012";
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = "green";
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = "green";
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = "green";
				r4 = 0;
			} else if (!settled[psqr[1][0]+1][psqr[1][1]] && !settled[psqr[2][0]][psqr[2][1]+1] && psqr[2][1] > 0){
				osqr[0][0] = psqr[0][0];
				osqr[0][1] = psqr[0][1];
				osqr[1][0] = psqr[1][0];
				osqr[1][1] = psqr[1][1];
				osqr[2][0] = psqr[2][0];
				osqr[2][1] = psqr[2][1];
				osqr[3][0] = psqr[3][0];
				osqr[3][1] = psqr[3][1];
				psqr[0][0]++;
				psqr[0][1] = psqr[0][1] + 2;
				psqr[1][1]++;
				psqr[2][0]++;
				psqr[3][1]--;
				document.getElementById(osqr[0][0]+"_"+osqr[0][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[1][0]+"_"+osqr[1][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[2][0]+"_"+osqr[2][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[3][0]+"_"+osqr[3][1]).style.backgroundColor = "#012";
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = "green";
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = "green";
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = "green";
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = "green";
				r5 = 0;
			} 
		break;
	}
}
function twolefttwor(){
	switch(r5){
		case 0:
			if (!settled[psqr[3][0]][psqr[3][1]-2] && !settled[psqr[1][0]-1][psqr[1][1]]){
				osqr[0][0] = psqr[0][0];
				osqr[0][1] = psqr[0][1];
				osqr[2][0] = psqr[2][0];
				osqr[2][1] = psqr[2][1];
				osqr[3][0] = psqr[3][0];
				osqr[3][1] = psqr[3][1];
				psqr[0][0]--;
				psqr[0][1]++;
				psqr[2][0]--;
				psqr[2][1]--;
				psqr[3][1]--;
				psqr[3][1]--;
				document.getElementById(osqr[0][0]+"_"+osqr[0][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[2][0]+"_"+osqr[2][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[3][0]+"_"+osqr[3][1]).style.backgroundColor = "#012";
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = "red";
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = "red";
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = "red";
				r5 = 1;
			} 
		break;
		case 1:
			if (!settled[psqr[3][0]][psqr[3][1]+2] && !settled[psqr[1][0]+1][psqr[1][1]] && psqr[1][1] < 9){
				osqr[0][0] = psqr[0][0];
				osqr[0][1] = psqr[0][1];
				osqr[2][0] = psqr[2][0];
				osqr[2][1] = psqr[2][1];
				osqr[3][0] = psqr[3][0];
				osqr[3][1] = psqr[3][1];
				psqr[0][0]++;
				psqr[0][1]--;
				psqr[2][0]++;
				psqr[2][1]++;
				psqr[3][1]++;
				psqr[3][1]++;
				document.getElementById(osqr[0][0]+"_"+osqr[0][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[2][0]+"_"+osqr[2][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[3][0]+"_"+osqr[3][1]).style.backgroundColor = "#012";
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = "red";
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = "red";
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = "red";
				r5 = 0;
			} else if (!settled[psqr[2][0]][psqr[2][1]-2] && !settled[psqr[2][0]][psqr[2][1]-1] && psqr[2][1] > 0 && !settled[psqr[3][0]][psqr[3][1]-1]){
				osqr[0][0] = psqr[0][0];
				osqr[0][1] = psqr[0][1];
				osqr[1][0] = psqr[1][0];
				osqr[1][1] = psqr[1][1];
				osqr[2][0] = psqr[2][0];
				osqr[2][1] = psqr[2][1];
				osqr[3][0] = psqr[3][0];
				osqr[3][1] = psqr[3][1];
				psqr[0][0]++;
				psqr[0][1]--;
				psqr[0][1]--;
				psqr[1][1]--;
				psqr[2][0]++;
				psqr[3][1]++;
				document.getElementById(osqr[0][0]+"_"+osqr[0][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[1][0]+"_"+osqr[1][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[2][0]+"_"+osqr[2][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[3][0]+"_"+osqr[3][1]).style.backgroundColor = "#012";
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = "red";
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = "red";
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = "red";
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = "red";
				r5 = 0;
			} 
		break;
	}
}
function barr(){
	switch(r6){
		case 0:
			if (psqr[0][0] < 19 && !settled[psqr[2][0]-2][psqr[2][1]] && !settled[psqr[2][0]-1][psqr[2][1]] && !settled[psqr[2][0]][psqr[2][1]] && !settled[psqr[2][0]+1][psqr[2][1]]){
				osqr[0][0] = psqr[0][0];
				osqr[0][1] = psqr[0][1];
				osqr[1][0] = psqr[1][0];
				osqr[1][1] = psqr[1][1];
				osqr[2][0] = psqr[2][0];
				osqr[2][1] = psqr[2][1];
				osqr[3][0] = psqr[3][0];
				osqr[3][1] = psqr[3][1];
				psqr[0][0]--;
				psqr[0][0]--;
				psqr[0][1]++;
				psqr[0][1]++;
				psqr[1][0]--;
				psqr[1][1]++;
				psqr[3][0]++;
				psqr[3][1]--;
				document.getElementById(osqr[0][0]+"_"+osqr[0][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[1][0]+"_"+osqr[1][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[2][0]+"_"+osqr[2][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[3][0]+"_"+osqr[3][1]).style.backgroundColor = "#012";
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = "blue";
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = "blue";
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = "blue";
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = "blue";
				r6 = 1;
			} else if (!settled[psqr[2][0]-3][psqr[2][1]] && !settled[psqr[2][0]-2][psqr[2][1]] && !settled[psqr[2][0]-1][psqr[2][1]] && !settled[psqr[2][0]][psqr[2][1]]){
				osqr[0][0] = psqr[0][0];
				osqr[0][1] = psqr[0][1];
				osqr[1][0] = psqr[1][0];
				osqr[1][1] = psqr[1][1];
				osqr[2][0] = psqr[2][0];
				osqr[2][1] = psqr[2][1];
				osqr[3][0] = psqr[3][0];
				osqr[3][1] = psqr[3][1];
				psqr[0][0]--;
				psqr[0][0]--;
				psqr[0][0]--;
				psqr[0][1]++;
				psqr[0][1]++;
				psqr[1][0]--;
				psqr[1][0]--;
				psqr[2][0]--;
				psqr[1][1]++;
				psqr[3][1]--;
				document.getElementById(osqr[0][0]+"_"+osqr[0][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[1][0]+"_"+osqr[1][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[2][0]+"_"+osqr[2][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[3][0]+"_"+osqr[3][1]).style.backgroundColor = "#012";
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = "blue";
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = "blue";
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = "blue";
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = "blue";
				r6 = 1;
			}
		break;
		case 1:
			if (psqr[0][1] < 9 && psqr[0][1] > 1 && !settled[psqr[1][0]][psqr[1][1]+1] && !settled[psqr[1][0]][psqr[1][1]] && !settled[psqr[1][0]][psqr[1][1]-1] && !settled[psqr[1][0]][psqr[1][1]-2]){
				osqr[0][0] = psqr[0][0];
				osqr[0][1] = psqr[0][1];
				osqr[1][0] = psqr[1][0];
				osqr[1][1] = psqr[1][1];
				osqr[2][0] = psqr[2][0];
				osqr[2][1] = psqr[2][1];
				osqr[3][0] = psqr[3][0];
				osqr[3][1] = psqr[3][1];
				psqr[0][0]++;
				psqr[0][1]--;
				psqr[0][1]--;
				psqr[2][0]--;
				psqr[1][1]--;
				psqr[3][0]--;
				psqr[3][0]--;
				psqr[3][1]++;
				document.getElementById(osqr[0][0]+"_"+osqr[0][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[1][0]+"_"+osqr[1][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[2][0]+"_"+osqr[2][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[3][0]+"_"+osqr[3][1]).style.backgroundColor = "#012";
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = "blue";
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = "blue";
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = "blue";
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = "blue";
				r6 = 0;
			} else if (psqr[0][1] > 2 && !settled[psqr[1][0]][psqr[1][1]] && !settled[psqr[1][0]][psqr[1][1]-1] && !settled[psqr[1][0]][psqr[1][1]-2] && !settled[psqr[1][0]][psqr[1][1]-3]){
				osqr[0][0] = psqr[0][0];
				osqr[0][1] = psqr[0][1];
				osqr[1][0] = psqr[1][0];
				osqr[1][1] = psqr[1][1];
				osqr[2][0] = psqr[2][0];
				osqr[2][1] = psqr[2][1];
				osqr[3][0] = psqr[3][0];
				osqr[3][1] = psqr[3][1];
				psqr[0][0]++;
				psqr[0][1]--;
				psqr[0][1]--;
				psqr[0][1]--;
				psqr[2][0]--;
				psqr[1][1]--;
				psqr[1][1]--;
				psqr[2][1]--;
				psqr[3][0]--;
				psqr[3][0]--;
				document.getElementById(osqr[0][0]+"_"+osqr[0][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[1][0]+"_"+osqr[1][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[2][0]+"_"+osqr[2][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[3][0]+"_"+osqr[3][1]).style.backgroundColor = "#012";
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = "blue";
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = "blue";
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = "blue";
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = "blue";
				r6 = 0;
			} else if (psqr[0][1] < 8 && psqr[0][1] > 0 && !settled[psqr[1][0]][psqr[1][1]+2] && !settled[psqr[1][0]][psqr[1][1]+1] && !settled[psqr[1][0]][psqr[1][1]] && !settled[psqr[1][0]][psqr[1][1]-1]){
				osqr[0][0] = psqr[0][0];
				osqr[0][1] = psqr[0][1];
				osqr[1][0] = psqr[1][0];
				osqr[1][1] = psqr[1][1];
				osqr[2][0] = psqr[2][0];
				osqr[2][1] = psqr[2][1];
				osqr[3][0] = psqr[3][0];
				osqr[3][1] = psqr[3][1];
				psqr[0][0]++;
				psqr[0][1]--;
				psqr[2][0]--;
				psqr[2][1]++;
				psqr[3][0]--;
				psqr[3][0]--;
				psqr[3][1]++;
				psqr[3][1]++;
				document.getElementById(osqr[0][0]+"_"+osqr[0][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[1][0]+"_"+osqr[1][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[2][0]+"_"+osqr[2][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[3][0]+"_"+osqr[3][1]).style.backgroundColor = "#012";
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = "blue";
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = "blue";
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = "blue";
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = "blue";
				r6 = 0;
			} else if (psqr[0][1] < 7 && !settled[psqr[1][0]][psqr[1][1]+3] && !settled[psqr[1][0]][psqr[1][1]+2] && !settled[psqr[1][0]][psqr[1][1]+1] && !settled[psqr[1][0]][psqr[1][1]]){
				osqr[0][0] = psqr[0][0];
				osqr[0][1] = psqr[0][1];
				osqr[1][0] = psqr[1][0];
				osqr[1][1] = psqr[1][1];
				osqr[2][0] = psqr[2][0];
				osqr[2][1] = psqr[2][1];
				osqr[3][0] = psqr[3][0];
				osqr[3][1] = psqr[3][1];
				psqr[0][0]++;
				psqr[2][0]--;
				psqr[1][1]++;
				psqr[2][1]++;
				psqr[2][1]++;
				psqr[3][0]--;
				psqr[3][0]--;
				psqr[3][1]++;
				psqr[3][1]++;
				psqr[3][1]++;
				document.getElementById(osqr[0][0]+"_"+osqr[0][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[1][0]+"_"+osqr[1][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[2][0]+"_"+osqr[2][1]).style.backgroundColor = "#012";
				document.getElementById(osqr[3][0]+"_"+osqr[3][1]).style.backgroundColor = "#012";
				document.getElementById(psqr[0][0]+"_"+psqr[0][1]).style.backgroundColor = "blue";
				document.getElementById(psqr[1][0]+"_"+psqr[1][1]).style.backgroundColor = "blue";
				document.getElementById(psqr[2][0]+"_"+psqr[2][1]).style.backgroundColor = "blue";
				document.getElementById(psqr[3][0]+"_"+psqr[3][1]).style.backgroundColor = "blue";
				r6 = 0;
			}
		break;
	}
}
function addKeyboardDownListener(){
	switch (event.keyCode){
		case 37: arrowLeft();
		break;
		case 39: arrowRight();
		break;
		case 40: arrowDown();
		break;
		case 38: arrowUp();
		break;
	}
}
function addKeyboardUpListener(){
	if(event.keyCode === 40){
		arrowDownUp();
	}
}
function touchMoveLeftStart(){
	arrowLeft();
	leftActive = setTimeout(function(){
		leftWorks = true;
		leftIt = setInterval(arrowLeft, 50);
	}, 500);
}
function touchMoveLeftEnd(){
	if (leftWorks) {
		clearInterval(leftIt);
		leftWorks = false;
	}
	else clearTimeout(leftActive);
}
function touchMoveRightStart(){
	arrowRight();
	rightActive = setTimeout(function(){
		rightWorks = true;
		rightIt = setInterval(arrowRight, 50);
	}, 500);
}
function touchMoveRightEnd(){
	if (rightWorks) {
		clearInterval(rightIt);
		rightWorks = false;
	}
	else {
		clearTimeout(rightActive);
	}
}
function addTouchListener(){
	document.getElementById("Layer_0").addEventListener("touchstart", touchMoveLeftStart,false);
	document.getElementById("Layer_0").addEventListener("touchend", touchMoveLeftEnd),false;
	document.getElementById("Layer_1").addEventListener("touchstart", arrowDown,false);
	document.getElementById("Layer_1").addEventListener("touchend", arrowDownUp,false);
	document.getElementById("Layer_2").addEventListener("touchstart", touchMoveRightStart,false);
	document.getElementById("Layer_2").addEventListener("touchend", touchMoveRightEnd,false);
	document.getElementById("Layer_3").addEventListener("touchstart", arrowUp,false);	
}
function removeTouchListener(){
	document.getElementById("Layer_0").removeEventListener("touchstart", touchMoveLeftStart);
	document.getElementById("Layer_0").removeEventListener("touchend", touchMoveLeftEnd);
	document.getElementById("Layer_1").removeEventListener("touchstart", arrowDown);
	document.getElementById("Layer_1").removeEventListener("touchend", arrowDownUp);
	document.getElementById("Layer_2").removeEventListener("touchstart", touchMoveRightStart);
	document.getElementById("Layer_2").removeEventListener("touchend", touchMoveRightEnd);
	document.getElementById("Layer_3").removeEventListener("touchstart", arrowUp);	
}
function stop(){
	image = document.createElement("IMG");
	image.setAttribute("src", "tetris.png");
	image.setAttribute("width", "230");
	image.setAttribute("id", "obr3");
	image.setAttribute("onclick", "resume()");
	image1 = document.getElementById("obr");
	image1.replaceChild(image, image1.childNodes[0]);
	clearInterval(itr);
	clearInterval(tm);
	window.removeEventListener('keydown', addKeyboardDownListener);
	window.removeEventListener('keyup', addKeyboardUpListener);
	if(detectMob()){
		removeTouchListener();
	}
}
function resume(){
	image = document.createElement("IMG");
	image.setAttribute("src", "tetris1.png");
	image.setAttribute("width", "230");
	image.setAttribute("id", "obr1");
	image.setAttribute("onclick", "stop()");
	image1 = document.getElementById("obr");
	image1.replaceChild(image, image1.childNodes[0]);
	itr = setInterval(falling, speed);
	tm = setInterval(timer, 1000);
	window.addEventListener('keydown', addKeyboardDownListener, false);
	window.addEventListener('keyup', addKeyboardUpListener, false);
	if(detectMob()){
		addTouchListener();
	}
}
function cls(){
	for (i=0; i <= 19; i++){
		for (j=0; j <= 9; j++){
			settled[i][j] = false;
			document.getElementById(i+"_"+j).style.backgroundColor = "#012";
		}	
	}
	image = document.createElement("IMG");
	image.setAttribute("src", "tetris.png");
	image.setAttribute("width", "230");
	image.setAttribute("id", "obr1");
	image.addEventListener('click', function(){
		image = document.createElement("IMG");
		image.setAttribute("src", "tetris1.png");
		image.setAttribute("width", "230");
		image.setAttribute("id", "obr1");
		image.setAttribute("onclick", "stop()");
		image1 = document.getElementById("obr");
		image1.replaceChild(image, image1.childNodes[0]);
		window.addEventListener('keydown', addKeyboardDownListener, false);
		window.addEventListener('keyup', addKeyboardUpListener, false);
		if(detectMob()){
			addTouchListener();
		}
		tm = setInterval(timer, 1000);
		rand();
	});
	image1 = document.getElementById("obr");
	image1.replaceChild(image, image1.childNodes[0]);
	time1 = 0;
	time = 0;
}
function timer(){
	time++;
	if (time/60 > 1){
		if (time/3600 > 1){
			if (time%3600 < 10){
				hour = Math.floor(time/3600);
				minu = Math.floor(time/60) - 60;
				time1 = hour+":"+minu+":0"+(time%3600);
			} else {
				hour = Math.floor(time/3600);
				minu = Math.floor(time/60) - 60;
				time1 = hour+":"+minu+":"+(time%3600);
			}
		}
		else{
			if (time%60 < 10){
				minu = Math.floor(time/60);
				time1 = minu+":0"+(time%60);
			} else {
				minu = Math.floor(time/60);
				time1 = minu+":"+(time%60);
			}
		}
	}
	else {
		if (time < 10){
			time1 = "0:0"+time;
		} else {
			time1 = "0:"+time;
		}
	}
	document.getElementById("t").innerHTML = 'TIME<br><font color="red">'+time1+"</font>";
}