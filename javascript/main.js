var score = 0;
        var jugar = false;
        var sound = true;
        
function init() {
        //Variables
        var score = 0;
        var jugar = false;
        var sound = true;
        
        //initialize the stage
        canvas = document.getElementById("canvas");
        stage = new createjs.Stage(canvas);
        
        //adding the background image       
        var background = new createjs.Bitmap("./images/bgOpt.png");
        stage.addChild(background);
        
        var speaker = stage.addChild(new createjs.Container());
        speaker.name="speaker";
        speaker.x=15;
        speaker.y=10;
	
	//speaker.background = new createjs.Bitmap("./images/speakerOn.png");
	
        //var width = text.getMeasuredWidth()+30;
	//var height = text.getMeasuredHeight()+20;
	
	var background = new createjs.Shape();
	//background.graphics.beginFill(color).drawRoundRect(0,0,width,height,10);
        
	//speaker.contains(background);
        
        
        
        
        
        speaker.on("click",changeSound);
        
        var log = new createjs.Text ("Probando", "14px Arial", "#FFF");
        log.x=canvas.width-100;
        log.y=15;
        stage.addChild(log);
        
        var logo = new createjs.Bitmap("./images/logoBig.png");
        logo.x=70;
        logo.y=90;
        stage.addChild(logo);
        
        var btn1 =stage.addChild(new Button("Play","#4969e1"));
        btn1.x=canvas.width/2;
        btn1.y=300;
        btn1.on("click",startGame);
        btn1.on("tick",alpha);
        
        var btn2 =stage.addChild(new Button("About","#4969e1"));
        btn2.x=canvas.width/2;
        btn2.y=350;
        btn2.on("click",startGame);
        btn2.on("tick",alpha);
        
        createjs.Ticker.on("tick", stage);
        
}

function startGame() {
	alert("You clicked on a button: "+this.label);
}

function alpha(){
      this.alpha = Math.cos(this.count++*0.4)*0.3+1;
}

function changeSound(){
        alert("el valor es: "+ sound);
        if (sound==true) {
                sound=false;
                this.image="./images/speakerOff.png";
                this.updateContext(stage);
                alert("to -> false");
        }
        else{
             sound=true;
             this.image="./images/speakerOff.png";
             this.updateContext(stage);
             alert("to -> true");
        }
}