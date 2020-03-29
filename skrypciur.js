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
console.log(document.getElementById("container").clientWidth);
let div = document.getElementById("parent");
console.log(div.clientWidth);
window.addEventListener('resize', function(){
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
window.addEventListener('keydown', function(event){
	switch (event.keyCode){
		case 37:
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
		break;
		case 39:
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
		break;
		case 40:
			if (!keyb){
				clearInterval(itr);
				itr = setInterval(falling, speed/10);
				keyb = true;
			}
		break;
		case 38:
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
		break;
	}
}, false);
window.addEventListener('keyup', function(event) {
	switch (event.keyCode){
		case 40:
			clearInterval(itr);
			itr = setInterval(falling, speed);
			 keyb = false;
		break;
	}
}, false);
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
	image.setAttribute("onclick", "rand()");
	image1 = document.getElementById("obr");
	image1.replaceChild(image, image1.childNodes[0]);
	time1 = 0;
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