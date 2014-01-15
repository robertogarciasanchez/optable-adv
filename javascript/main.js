/**
* @fileoverview Código creación interfaz Operating Table - Adventure
*
* @author Roberto García
* @version 0.1
*/


/*  The JavaScript code in this page is free software: you can
    redistribute it and/or modify it under the terms of the GNU
    General Public License (GNU GPL) as published by the Free Software
    Foundation, either version 3 of the License, or (at your option)
    any later version.  The code is distributed WITHOUT ANY WARRANTY;
    without even the implied warranty of MERCHANTABILITY or FITNESS
    FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

    As additional permission under GNU GPL version 3 section 7, you
    may distribute non-source (e.g., minimized or compacted) forms of
    that code without the copy of the GNU GPL normally required by
    section 4, provided you include this license notice and a URL
    through which recipients can access the Corresponding Source.
    */

//Variables globales
var canvas;
var stage;

//Variables Chronometer
var chrono;
var timercount = false;
var timestart = null;
var timeend;

//Variables Juego
var usuario=0;
var sound = true;
var game;
var actions;
var gameLog;
var load;
var indexGame=0;
var indexAction=0;
var lifes=3;
var score=0;
var control;
        
function init() {     
        //initialize the stage
        canvas = $('#canvas').get(0);
        stage = new createjs.Stage(canvas);
        stage.enableMouseOver(10);
        layerMain();
	layerForm();
	layerWarning()
        layerGame();
        music();
        soundChange();        
        createjs.Ticker.on("tick", stage); 
}

function layerMain() {
        var layerMain = stage.addChild(new createjs.Container());        
        layerMain.name = "layerMain";
	
	var background = layerMain.addChild(new createjs.Bitmap("./images/bg1.png"));
	background.name="bg";
        
        var btn1 = layerMain.addChild(new createjs.Bitmap("./images/play.png"));
        btn1.x=canvas.width/2-65;
        btn1.y=255;
        btn1.on("click",checkUser);
        btn1.on("mouseover",alpha);
        btn1.on("mouseout",noalpha);
        
        var btn2 = layerMain.addChild(new createjs.Bitmap("./images/guest.png"));
        btn2.x=canvas.width/2-65;
        btn2.y=btn1.y+43;
        btn2.on("click",playGuest);
        btn2.on("mouseover",alpha);
        btn2.on("mouseout",noalpha);
        
        var btn3 =layerMain.addChild(new createjs.Bitmap("./images/howto.png"));
        btn3.x=canvas.width/2-65;
        btn3.y=btn2.y+43;
        btn3.txt="howto";
        btn3.on("click",infoBox);
        btn3.on("mouseover",alpha);
        btn3.on("mouseout",noalpha);
        
        var btn4 =layerMain.addChild(new createjs.Bitmap("./images/statistics.png"));
        btn4.x=canvas.width/2-65;
        btn4.y=btn3.y+43;
        btn4.txt="sta";
        btn4.on("click",showStatistics);
        btn4.on("mouseover",alpha);
        btn4.on("mouseout",noalpha);  
        
        var btn5 =layerMain.addChild(new createjs.Bitmap("./images/about1.png"));
        btn5.x=canvas.width/2-65;
        btn5.y=btn4.y+43;
        btn5.txt="about";
        btn5.on("click",infoBox);
        btn5.on("mouseover",alpha);
        btn5.on("mouseout",noalpha);
        
        var logo = layerMain.addChild(new createjs.Bitmap("./images/logoBig.png"));
        logo.x=-570;
        logo.y=65;
        createjs.Tween.get(logo).to({alpha:1, x:70},1500,createjs.Ease.bounceOut);
}

function main() {
	createjs.Sound.stop();
        createjs.Sound.play("intro1", createjs.Sound.INTERRUPT_ANY,0,0,-1,0.5);
	stage.getChildByName("layerForm").visible=false;
        stage.getChildByName("layerGame").visible=false;
        stage.getChildByName("layerMain").visible=true;
        stage.getChildByName("form").visible=false;
        
}

function layerForm(){
	var layerForm = stage.addChild(new createjs.Container());
        layerForm.name = "layerForm";
        layerForm.visible=false;
	
	var background = layerForm.addChild(new createjs.Bitmap("./images/waiting.png"));
	background.name="bgWaiting";
	
	var formHTML =$('#loginForm').get(0);
        var form = layerForm.addChild(new createjs.DOMElement(formHTML));
        form.visible=false;
	form.name="form";
}
function layerWarning(){
	var layerWarning = stage.addChild(new createjs.Container());
        layerWarning.name = "layerWarning";
	layerWarning.visible = false;
	
	var background = layerWarning.addChild(new createjs.Bitmap("./images/waiting.png"));
	background.name="bgWaiting";
	
	var warning = layerWarning.addChild(new createjs.Text ("", "28px Arial", "#FFF"));
	warning.name="warning";
	warning.x = canvas.width/2;
	warning.y = canvas.height-100;
	warning.textAlign="center";
	warning.count=0;
	warning.on("tick",changeAlpha);
	warning.shadow = new createjs.Shadow("#000", 5, 5, 10);
}

function layerGame(){  
        var layerGame = stage.addChild(new createjs.Container());
        layerGame.name = "layerGame";
        layerGame.visible=false;
	
	var background = layerGame.addChild(new createjs.Bitmap("./images/waiting.png"));
	background.name="bgGame";
        
        var panel1 = layerGame.addChild(new createjs.Container());
        panel1.name = "panel1";
        panel1.width=420;
        panel1.height=50;
        panel1.x=canvas.width-420;
	
	var backgroundData = panel1.addChild(new createjs.Shape());
	backgroundData.graphics.beginFill("gray").drawRect(0,0,panel1.width,panel1.height-6,0);
	backgroundData.alpha=0.60;
           
        drawLifes();
        
        var log = panel1.addChild(new createjs.Text ("0000", "28px Arial", "#FFF"));
	log.name="log";
	log.textAlign="rigth";
        log.x= panel1.width-115;
        log.y=9;
	
        
        var clock = panel1.addChild(new createjs.Bitmap("./images/clock.png"));
        clock.name="clock";
        clock.x=160;
        clock.y=5;
        
        chrono = panel1.addChild(new createjs.Text ("00:00", "26px Arial", "#FFF"));
        chrono.x= 200;
        chrono.y=10;
	
        
        var exit = panel1.addChild(new createjs.Bitmap("./images/exit.png"));
        exit.name="clock";
        exit.x=panel1.width-40;
        exit.y=5;
        exit.on('click',endGame); 
        
        var panel2 = layerGame.addChild(new createjs.Container());
        panel2.name = "panel2";
        panel2.width=798;
        panel2.height=110;
        panel2.y=canvas.height-110;
        
	var backgroundText = panel2.addChild(new createjs.Bitmap("./images/bgtxt.png"));
	backgroundText.x=400;
	
	var backgroundAction = panel2.addChild(new createjs.Bitmap("./images/bgAct.png"));
	
	gameLog = panel2.addChild(new createjs.Text ("", "14px Arial", "#FFF"));
	gameLog.name="gameLog";
        gameLog.x= 420;
        gameLog.y=15;
	gameLog.lineWidth=370;
	gameLog.shadow = new createjs.Shadow("#000", 2, 2, 10);
	
	var next = panel2.addChild(new createjs.Bitmap("./images/bnext.png"));
        next.name="bnext";
        next.x=panel2.width-35;
        next.y=panel2.height-35;
        next.on("click", play);
	
	control = panel2.addChild(new createjs.Container());
        control.name = "layerGame";
        control.visible=false;
	
	var label1 = control.addChild(new createjs.Text ("Who", "20px Arial", "#000"));
	label1.x=80;
	label1.y=5;
	label1.textAlign="right";
	label1.shadow = new createjs.Shadow("#000", 5, 5, 10);
	
	var label2 = control.addChild(new createjs.Text ("Action", "20px Arial", "#000"));
	label2.x=80;
	label2.y=30;
	label2.textAlign="right";
	label2.shadow = new createjs.Shadow("#000", 5, 5, 10);
	
	var label3 = control.addChild(new createjs.Text ("Whom", "20px Arial", "#000"));
	label3.x=80;
	label3.y=55;
	label3.textAlign="right";
	label3.shadow = new createjs.Shadow("#000", 5, 5, 10);
	
	var label4 = control.addChild(new createjs.Text ("Material", "20px Arial", "#000"));
	label4.x=80;
	label4.y=80;
	label4.textAlign="right";
	label4.shadow = new createjs.Shadow("#FFF", 3, 3, 10);
	
	var btest = control.addChild(new createjs.Bitmap("./images/bnext2.png"));
	btest.x=350;
	btest.y=30;
	btest.on("click",checkAnswer);
	
	drawControls();
}

function showForm(type){
	stage.getChildByName("layerMain").visible=false;
	stage.getChildByName("layerForm").visible=true;
	$("#msg").html("");
	
	var form = stage.getChildByName("layerForm").getChildByName("form");
        form.visible=true;
        form.regX = stage.offsetWidth*0.5;
        form.regY = form.offsetHeight*0.5;
        //move the form above the screen
        form.x = canvas.width * 0.5-120;
        form.y =  -170;
        form.rotation=-360;
        form.alpha=0;
        $('#botton').on('click',type);
        createjs.Tween.get(form).to({alpha:1, y:canvas.height * 0.5-100, rotation:360},1000,createjs.Ease.cubicOut);       
}

function checkUser() {
	createjs.Sound.play("click", createjs.Sound.INTERRUPT_ANY,0,0,0,0.5);
	showForm(login);
}

function showStatistics() {
	createjs.Sound.play("click", createjs.Sound.INTERRUPT_ANY,0,0,0,0.5);
	showForm(login);
}

function showWarning(txt) {
	stage.getChildByName("layerWarning").visible=true;
	stage.getChildByName("layerWarning").getChildByName("warning").text=txt;
}

function closeWarning() {
	stage.getChildByName("layerWarning").visible=false;
}

function noalpha(){
      this.alpha = 1;
}

function alpha(){
      this.alpha = 0.75;
}

function changeAlpha(){
      this.alpha = Math.cos(this.count++*0.1)*0.5+0.8;
}

function infoBox() {
	var texto;
	createjs.Sound.play("click", createjs.Sound.INTERRUPT_ANY,0,0,0,0.5);
        box= stage.addChild(new createjs.Container());        
        box.name = "box";
        box.x=51;
        box.y=50;
	
	var width = 700;
	var height = 430;
	box.background = box.addChild(new createjs.Shape());
	box.background.graphics.beginFill("#CCC").drawRoundRect(0,0,width,height,10);
        box.background.alpha=0.9;
        
        switch (this.txt) {
                case "howto":
                        box.img="./images/howto2.png";
			texto="Manual de instrucciones en desarrollo.";
                        break;
                case "about":
                        box.img="./images/about.png";
			texto="Desarrollado por Roberto García Sánchez\n\n\n Licencia GPLv3.";
                        break;
                default:
                        box.img="./images/about.png";
        }
        var img = box.addChild(new createjs.Bitmap(box.img));
        img.x = 30;
	img.y = 30;
        
	var title = box.addChild(new createjs.Text(this.label, "Bold 20px Arial", "#000"));
        title.x = width/2-100;
	title.y = 30;
        
        var text = box.addChild(new createjs.Text(texto, "15px Arial", "#000"));
        text.x = width/2-100;
	text.y = 70;
        
        var msg = box.addChild(new createjs.Text("Click for close", "Italic 12px Arial", "#000"));
	msg.textAlign = "center";
        msg.x = width/2;
	msg.y = height-20;

        box.on("click",closeBox);
        //stage.update();
}


function closeBox(){
        stage.removeChild(stage.getChildByName(this.name));
}

function drawLifes(){
	var panel=stage.getChildByName("layerGame").getChildByName("panel1");
	if (panel.getChildByName("life0")) {
		for (var i=0;i<lifes;i++) {
			name="life"+i;
			panel.getChildByName(name).visible=true;
		}
	}
	else{ 
		for (var i=0;i<lifes;i++) {
			var life = panel.addChild(new createjs.Bitmap("./images/heart.png"));
			life.name="life"+i;
			life.x=10+(40*i);
			life.y=8;
		}
	}
}

function loadControls() {
	var newOptions;
	newOptions = "<select id=\"select1\">";
	newOptions += "<option value=\"null\">-</option>";
	for(var i=0;i < game.personal.length;i++){
			newOptions += "<option value=\""+game.personal[i]+"\">"+game.personal[i]+"</option>";		
	}
	newOptions += "</select>";
	
	newOptions += "<select id=\"select2\">";
	newOptions += "<option value=\"null\">-</option>";
	for(var i=0;i < game.actions.length;i++){
			newOptions += "<option value=\""+game.actions[i].action+"\">"+game.actions[i].action+"</option>";		
	}
	newOptions += "</select>";
	
	newOptions += "<select id=\"select3\">";
	newOptions += "<option value=\"null\">-</option>";
	for(var i=0;i < game.actions.length;i++){
			newOptions += "<option value=\""+game.actions[i].receptor+"\">"+game.actions[i].receptor+"</option>";		
	}
	newOptions += "</select>";
	
	newOptions += "<select id=\"select4\">";
	newOptions += "<option value=\"0\">-</option>";
	for(var i=0;i < game.actions.length;i++){
			newOptions += "<option value=\""+game.actions[i].receptor+"\">"+game.actions[i].material+"</option>";		
	}
	newOptions += "</select>";
	
	$("#controls").html(newOptions);
	drawControls();
	
}

function drawControls(){
	var select1 = $('#select1').get(0);
        var panelControl1 = control.addChild(new createjs.DOMElement(select1));
	panelControl1.x=90;
	panelControl1.y=90;
	
	var select2 = $('#select2').get(0);
        var panelControl2 = control.addChild(new createjs.DOMElement(select2));
	panelControl2.x=90;
	panelControl2.y=115;
	
	var select3 = $('#select3').get(0);
        var panelControl3 = control.addChild(new createjs.DOMElement(select3));
	panelControl3.x=90;
	panelControl3.y=140;
	
	var select4 = $('#select4').get(0);
        var panelControl4 = control.addChild(new createjs.DOMElement(select4));
	panelControl4.x=90;
	panelControl4.y=165;
	
}

function soundChange(){
        if (stage.removeChild(stage.getChildByName("speaker"))){
                if (sound==true) {
                        createjs.Sound.setMute(true);
                        var speaker = stage.addChild(new createjs.Bitmap("./images/speakerOff.png"));
                        sound=false;
                }
                else{
                        createjs.Sound.setMute(false);
                        var speaker = stage.addChild(new createjs.Bitmap("./images/speakerOn.png"));
                        sound=true;
                }
        }
        else{
               var speaker = stage.addChild(new createjs.Bitmap("./images/speakerOn.png")); 
        }
        speaker.name="speaker";
        speaker.x=15;
        speaker.y=10;
        speaker.on("click",soundChange);
}

function music(){
        if (!createjs.Sound.initializeDefaultPlugins()) {return;}
 
        var audioPath = "./media/";
        var manifest = [{id:"intro1", src:"intro.ogg"},{id:"click", src:"pum.ogg"},{id:"game", src:"intro2.mp3"}];
 
        createjs.Sound.alternateExtensions = ["mp3"];               
        createjs.Sound.addEventListener("fileload", handleLoad);
        createjs.Sound.registerManifest(manifest, audioPath);
        function handleLoad(event) {
                createjs.Sound.play("intro1", createjs.Sound.INTERRUPT_ANY,0,0,-1,0.5);
                createjs.Sound.setMute(true);//OJO QUITAR
        }
}

function startChrono(){
        if(!timercount){
                timestart   = new Date();
                timercount = true;
        }
	chrono.on("tick",updateChrono);
}

function updateChrono() {
        var time;
        if(!timercount){
                time="00:00";
		chrono.text=(time);
        }
        else{
                timeend = new Date();
                var timedifference = timeend.getTime() - timestart.getTime();
                timeend.setTime(timedifference);
		chrono.text=(formatChrono(timeend,0));
		time=timeend;
        }
        
        return time;
}

function stopChrono() {
    var total= updateChrono();
    timercount=false;
    timestart = null;
    chrono.text=("00:00");
    return total;
}

function formatChrono(t,milliseconds){
        var time;
        var minutes_passed = t.getMinutes();
        if(minutes_passed < 10){
                minutes_passed = "0" + minutes_passed;
        }
        var seconds_passed = t.getSeconds();
        if(seconds_passed < 10){
                seconds_passed = "0" + seconds_passed;
        }
        if (milliseconds) {
                var milliseconds_passed = t.getMilliseconds();
                if(milliseconds_passed < 10){
                        milliseconds_passed = "00" + milliseconds_passed;
                }
                else if(milliseconds_passed < 100){
                        milliseconds_passed = "0" + milliseconds_passed;
                }
                time = minutes_passed + ":" + seconds_passed + "." + milliseconds_passed;
        }
        else{
                time = minutes_passed + ":" + seconds_passed;   
        }
        return time;
}

function askGame(){
	createjs.Sound.play("click", createjs.Sound.INTERRUPT_ANY,0,0,0,0.5);
        var ask = stage.addChild(new createjs.Container());        
        ask.name = "ask";
	
	var bg = ask.addChild(new createjs.Bitmap("./images/bg1.png"));
	bg.name="bgAsk";
	
	ask.background = ask.addChild(new createjs.Shape());
	ask.background.graphics.beginFill("#CCC").drawRoundRect(canvas.width/2-125,canvas.height/2-100,250,150,10);
        ask.background.alpha=0.9;
	
	
	var msg = ask.addChild(new createjs.Text("Dupuytren's Contracture", "Italic 15px Arial", "#000"));
	msg.textAlign = "center";
        msg.x = canvas.width/2;
	msg.y = 200;
	msg.shadow = new createjs.Shadow("#000", 5, 5, 10)
	msg.on("click",preLoadGame, null, false, {op:'4857'});
	msg.on("mouseover",alpha);
        msg.on("mouseout",noalpha);
	
	var msg2 = ask.addChild(new createjs.Text("Trigger finger", "Italic 15px Arial", "#000"));
	msg2.textAlign = "center";
        msg2.x = canvas.width/2;
	msg2.y = 250;
	msg2.shadow = new createjs.Shadow("#000", 5, 5, 10);
	msg2.on("click",preLoadGame, null, false, {op:'137'});
	msg2.on("mouseover",alpha);
        msg2.on("mouseout",noalpha);

}


function preLoadGame(evt, data) {
	stage.removeChild(stage.getChildByName("ask"));
	showWarning("Cargando ...");
	loadGame(data.op);
	setTimeout("startGame();", 3000);
}

function playGuest() {
	createjs.Sound.play("click", createjs.Sound.INTERRUPT_ANY,0,0,0,0.5);
        stage.getChildByName("layerMain").visible=false;
	askGame();
}

function startGame() {
	closeWarning();
	if(load==1){
		stage.getChildByName("layerGame").visible=true;
		createjs.Sound.stop();
		createjs.Sound.play("game", createjs.Sound.INTERRUPT_ANY,0,0,-1,0.5);
		//Personaje hablando
		indexGame=0;
		play();
	}
	else	{
		alert("Imposible load game");
		endGame();
	}
}

function play(){
	var txt;
	createjs.Sound.play("click", createjs.Sound.INTERRUPT_ANY,0,0,0,0.5);
	switch (indexGame) {
		case 0: txt = "Your are going to practice ";
			txt += game.problema.nombre+".\n"+game.problema.descripcion;
			gameLog.text=(txt);
			stage.getChildByName("layerGame").getChildByName("panel2").getChildByName("bnext").visible=true;
			indexGame++;
			break;
		
		case 1:	if (game.sintomas.length!=0) {
				txt = "The usual simptoms are: \n";
				for(var i=0;i < game.sintomas.length;i++){
					txt += game.sintomas[i]+".\n";
				}
			}
			else
				txt="No simptoms";
			gameLog.text=(txt);
			indexGame++;
			break;
		
		case 2:if (game.causas.length!=0) {
				txt = "The cuases can be: \n";
				for(var i=0;i < game.causas.length;i++){
					txt += game.causas[i]+".\n";
				}
			}
			else
				txt="No causes.";
			gameLog.text=(txt);
			indexGame++;
			break;
		
		case 3:	if (game.pruebas.length!=0) {
				txt = "These are the clinical tests which are needed:\n";
				for(var i=0;i < game.pruebas.length;i++){
					txt += game.pruebas[i]+".\n";
				}
			}
			else
				txt="No clinical tests..";
			gameLog.text=(txt);
			indexGame++;
			break;
		
		case 4:	if (game.tratamientos.length!=0) {
				txt = "These treatments are available:\n";
				for(var i=0;i < game.tratamientos.length;i++){
					txt += game.tratamientos[i].nombre+".\n";
				}
			}
			else
				txt="No treatments..";
			gameLog.text=(txt);
			indexGame++;
			break;
		
		case 5:	if (game.tratamientos.length!=0) {
				txt = "This is the surgery we want to practice:\n";
				for(var i=0;i < game.tratamientos.length;i++){
					if (game.tratamientos[i].aplicacion == "Surgeon" ) {
						txt += game.tratamientos[i].nombre+".\n";
						txt += game.tratamientos[i].descripcion+".\n";
					}
					
				}
			}
			else {
				txt="No treatments..";
				indexGame=10;
				break;
			}
			gameLog.text=(txt);
			indexGame++;
			break;
		case 6: txt = "Now we are ready to start.\nConcentrate!\nAnd good luck!";
			gameLog.text=(txt);
			indexGame++;
			break;
		
		case 7:	loadControls();
			control.visible=true;
			txt = game.actions[indexAction].etapa;
			gameLog.text=(txt);
			stage.getChildByName("layerGame").getChildByName("panel2").getChildByName("bnext").visible=false;
			startChrono();
			break;
		
		default: endGame();
	}
}

function endGame() {
        registered=false;
        score=0;
	stage.getChildByName("layerGame").getChildByName("panel1").getChildByName("log").color="white";
	stage.getChildByName("layerGame").getChildByName("panel1").getChildByName("log").text=score;
	indexGame=0;
	control.visible=false;
	game=null;
	load=0;
	lifes=3;
	drawLifes()
        stopChrono();
        main();
}

function morePoints(num){
	if (!num) {
		num=100;
	}
	score += num;
	if (score >= 0) {
		stage.getChildByName("layerGame").getChildByName("panel1").getChildByName("log").color="white";
	}
	stage.getChildByName("layerGame").getChildByName("panel1").getChildByName("log").text=score;
}

function lessPoints(num){
	if (!num) {
		num=50;
	}
	score -= num;
	if (score < 0) {
		stage.getChildByName("layerGame").getChildByName("panel1").getChildByName("log").color="red";
	}
	stage.getChildByName("layerGame").getChildByName("panel1").getChildByName("log").text=score;
}


function checkAnswer() {
	var comprobacion=true;
	createjs.Sound.play("click", createjs.Sound.INTERRUPT_ANY,0,0,0,0.5);
	var txt= $('#select1').val()+ $('#select2').val()+ $('#select3').val()+ $('#select4').val();
	
	if ($('#select1').val()!=game.actions[indexAction].actor) {
		comprobacion=false;
	}
	if ($('#select2').val()!=game.actions[indexAction].action) {
		comprobacion=false;
	}if ($('#select3').val()!=game.actions[indexAction].receptor) {
		comprobacion=false;
	}
	if ($('#select4').val()!=game.actions[indexAction].material) {
		comprobacion=false;
	}
	if (comprobacion) {
		morePoints();
		indexAction ++;
	}
	else{
		lessPoints();
		lifes-=1;
		var txtlife="life"+lifes;
		stage.getChildByName("layerGame").getChildByName("panel1").getChildByName(txtlife).visible=false;
		
		if (lifes==0) {
			showScore();
			endGame();
		}
	}
}

function showScore(){
	createjs.Sound.play("click", createjs.Sound.INTERRUPT_ANY,0,0,0,0.5);
        var ask = stage.addChild(new createjs.Container());        
        ask.name = "score";
	ask.on("click",closeScore);
		
	ask.background = ask.addChild(new createjs.Shape());
	ask.background.graphics.beginFill("#202BAA").drawRoundRect(canvas.width/2-125,canvas.height/2-100,250,150,10);
        ask.background.alpha=0.9;
	
	var msg = ask.addChild(new createjs.Text("Score", "Italic 28px Arial", "#fff"));
	msg.textAlign = "center";
        msg.x = canvas.width/2;
	msg.y = 180;
	msg.shadow = new createjs.Shadow("#000", 5, 5, 10)
	
	var msg2 = ask.addChild(new createjs.Text(score, "Italic 26px Arial", "#fff"));
	msg2.textAlign = "center";
        msg2.x = canvas.width/2;
	msg2.y = 220;
	msg2.shadow = new createjs.Shadow("#000", 5, 5, 10);
	
	var msg2 = ask.addChild(new createjs.Text("click to close", "Italic 11px Arial", "#fff"));
	msg2.textAlign = "center";
        msg2.x = canvas.width/2;
	msg2.y = 280;
	msg2.shadow = new createjs.Shadow("#000", 5, 5, 10);
	
}

function closeScore(){
	stage.removeChild(stage.getChildByName("score"));
}
