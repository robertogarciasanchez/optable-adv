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
var registered= false;
        
function init() {     
        //initialize the stage
        canvas = document.getElementById("canvas");
        stage = new createjs.Stage(canvas);
        mainLayer();
        gameLayer();
        music();
        soundChange();        
        createjs.Ticker.on("tick", stage); 
}

function mainLayer() {
        var background = stage.addChild(new createjs.Bitmap("./images/bg1.png"));

        layer1 = stage.addChild(new createjs.Container());        
        layer1.name = "layer1";
        
        var logo = layer1.addChild(new createjs.Bitmap("./images/logoBig.png"));
        logo.x=70;
        logo.y=90;
        
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
        
        form = document.getElementById("myform");
        formDOMElement = new createjs.DOMElement(form);
        //move it's rotation center at the center of the form
        formDOMElement.regX = form.offsetWidth*0.5;
        formDOMElement.regY = form.offsetHeight*0.5;
        //move the form above the screen
        formDOMElement.x = canvas.width * 0.5;
        formDOMElement.y =  300;
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
        btn3.on("click",function(){layer2.visible=false;layer1.visible=true;});
        
        var log = layer1.addChild(new createjs.Text ("Probando", "14px Arial", "#FFF"));
        log.x=canvas.width-100;
        log.y=15;
}

function checkGame() {
        layer1.visible=false;
        formDOMElement.visible=true;
        //Tween.get(formDOMElement).to({alpha:1, y:canvas.height * 0.5, rotation:720},2000,Ease.cubicOut);
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
        if (update) {
                update = false; // only update once
                stage.update();
        }
}

function checkUser() {
        alert("Comprobar usuario");
        
        //COMPROBAR EN MYSQL
        formDOMElement.visible=false;
        registered=true;
        startGame();
}

function playGuest() {
        formDOMElement.visible=false;
        registered=false;
        startGame();
}

function startGame() {
        layer2.visible=true;
        alert("JUGANDO");//code
        createjs.Sound.stop();
        createjs.Sound.play("game", createjs.Sound.INTERRUPT_ANY,0,0,-1,0.3);
}