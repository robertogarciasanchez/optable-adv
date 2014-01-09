//Variables globales
var canvas;
var stage;
var score = 0;
var jugar = false;
var sound = true;
var bg;
var layer1;
var layer2;
var formDOMElement;
var registered = false;

//Variables Chronometer
var chrono;
var timercount = false;
var timestart = null;
var timeend;

        
function init() {     
        //initialize the stage
        canvas = $('#canvas').get(0);
        stage = new createjs.Stage(canvas);
        mainLayer();
        gameLayer();
        music();
        soundChange();        
        createjs.Ticker.on("tick", tick); 
}

function mainLayer() {
        var background = stage.addChild(new createjs.Bitmap("./images/bg1.png"));

        layer1 = stage.addChild(new createjs.Container());        
        layer1.name = "layer1";
        
        var logo = layer1.addChild(new createjs.Bitmap("./images/logoBig.png"));
        logo.x=-570;
        logo.y=90;
        createjs.Tween.get(logo).to({alpha:1, x:70},1500,createjs.Ease.bounceOut);
        
        var btn1 =layer1.addChild(new Button("Play","#4969e1"));
        btn1.x=canvas.width/2;
        btn1.y=300;
        btn1.on("click",checkGame);
        btn1.on("tick",alpha);
        
        var btn2 =layer1.addChild(new Button("How to...","#4969e1"));
        btn2.x=canvas.width/2;
        btn2.y=350;
        btn2.txt="Hola";
        btn2.on("click",infoBox);
        btn2.on("tick",alpha);
        
        var btn3 =layer1.addChild(new Button("About","#4969e1"));
        btn3.x=canvas.width/2;
        btn3.y=400;
        btn3.txt="Hola2";
        btn3.on("click",infoBox);
        btn3.on("tick",alpha);
        
        form =$('#loginForm').get(0);
        formDOMElement = new createjs.DOMElement(form);
        formDOMElement.visible=false;
        stage.addChild(formDOMElement);
}

function gameLayer(){  
        layer2 = stage.addChild(new createjs.Container());
        layer2.name = "layer2";
        layer2.visible=false;
        
        var background = layer2.addChild(new createjs.Bitmap("./images/bg1.png"));
        
        var btn3 =layer2.addChild(new Button("About","#4969e1"));
        btn3.x=canvas.width/2;
        btn3.y=400;
        btn3.txt="Hola2";
        btn3.on("click",function(){
                //layer2.visible=false;layer1.visible=true;
                alert(updateChrono());});
        
        var panel = layer2.addChild(new createjs.Container());
        panel.name = "panel";
        panel.width=420;
        panel.height=50;
        panel.x=canvas.width-420;
        
        //var background = panel.addChild(new createjs.Shape());
	//background.graphics.beginFill("blue").drawRect(0,0,panel.width,panel.height,10);
             
        var life;
        for (var i=0;i<3;i++) {
                life = panel.addChild(new createjs.Bitmap("./images/heart.png"));
                life.name="life"+i;
                life.x=10+(40*i);
                life.y=8;
        }
        
        var log = panel.addChild(new createjs.Text ("0000", "28px Arial", "#FFF"));
        log.x= panel.width-100;
        log.y=9;
        
        var clock = panel.addChild(new createjs.Bitmap("./images/clock.png"));
        clock.name="clock";
        clock.x=170;
        clock.y=5;
        
        chrono = panel.addChild(new createjs.Text ("00:10", "26px Arial", "#FFF"));
        chrono.x= 210;
        chrono.y=10;
        
}

function checkGame() {
        layer1.visible=false;
        formDOMElement.visible=true;
        formDOMElement.regX = form.offsetWidth*0.5;
        formDOMElement.regY = form.offsetHeight*0.5;
        //move the form above the screen
        formDOMElement.x = canvas.width * 0.5;
        formDOMElement.y =  -150;
        formDOMElement.rotation=-360;
        formDOMElement.alpha=0;
        createjs.Tween.get(formDOMElement).to({alpha:1, y:canvas.height * 0.5, rotation:360},1000,createjs.Ease.cubicOut);
}

function alpha(){
      this.alpha = Math.cos(this.count++*0.4)*0.3+1;
}

function infoBox() {
        box= stage.addChild(new createjs.Container());        
        box.name = "box";
        box.x=51;
        box.y=50;
	
	var width = 700;
	var height = 400;
	box.background = box.addChild(new createjs.Shape());
	box.background.graphics.beginFill("#CCC").drawRoundRect(0,0,width,height,10);
        box.background.alpha=0.9;
        
        switch (this.label) {
                case "How to...":
                        box.img="./images/about.png";
                        
                        break;
                case "About":
                        box.img="./images/about.png";
                
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
        
        var text = box.addChild(new createjs.Text(this.txt, "15px Arial", "#000"));
        text.x = width/2-100;
	text.y = 70;
        
        var msg = box.addChild(new createjs.Text("Click for close", "Italic 12px Arial", "#000"));
	msg.textAlign = "center";
        msg.x = width/2;
	msg.y = height-20;

        box.on("click",closeBox);
        stage.update();
}


function closeBox(){
        stage.removeChild(stage.getChildByName(this.name));
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

function tick() {
	// this set makes it so the stage only re-renders when an event handler indicates a change has happened.
       // if (update) {
                update = false; // only update once
                stage.update();
       // }
}

function playGuest() {
        formDOMElement.visible=false;
        registered=false;
        startGame();
}

function startGame() {
        layer2.visible=true;
        //alert("JUGANDO");//code
        createjs.Sound.stop();
        createjs.Sound.play("game", createjs.Sound.INTERRUPT_ANY,0,0,-1,0.3);
        
        startChrono();
        chrono.on("tick",updateChrono);
        //;
}

function startChrono(){
    alert("HEllooow");
        if(!timercount){
                timestart   = new Date();
                timercount = true;
        }
}

function updateChrono() {
        var time;
        if(!timercount){
                time="00:00";
        }
        else{
                timeend = new Date();
                var timedifference = timeend.getTime() - timestart.getTime();
                timeend.setTime(timedifference);
        }
        chrono.text=(formatChrono(timeend,0));
        return timeend;
}

function stopChrono() {
    var total= updateChrono();
    timercount=false;
    timestart = null;
    chrono.text=(total);
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

