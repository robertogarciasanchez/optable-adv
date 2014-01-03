function init() {
        //Variables
        var score = 0;
        var jugar = false;
        
        //initialize the stage
        canvas = document.getElementById("canvas");
        stage = new createjs.Stage(canvas);
        
        //adding the background image       
        var background = new createjs.Bitmap("./images/background.jpg");
        stage.addChild(background);
        
         var log = new createjs.Text ("Probando", "14px Arial", "#FFF");
        log.x=20;
        log.y=10;
        stage.addChild(log);
        
        var logo = new createjs.Bitmap("./images/logoBig.png");
        logo.x=150;
        logo.y=80;
        stage.addChild(logo);
        
        var btn1 =stage.addChild(new Button("Play","#4969e1"));
        btn1.x=canvas.width/2-50;
        btn1.y=280;
        btn1.on("click",botonea);
        btn1.on("tick",alpha);
        
        var btn2 =stage.addChild(new Button("About","#4969e1"));
        btn2.x=canvas.width/2-50;
        btn2.y=330;
        btn2.on("click",botonea);
        btn2.on("tick",alpha);
        
        createjs.Ticker.on("tick", stage);
        
}

function botonea() {
	alert("You clicked on a button: "+this.label);
}

function alpha(){
        this.alpha = Math.cos(this.count++*0.4)*0.3+1;
}