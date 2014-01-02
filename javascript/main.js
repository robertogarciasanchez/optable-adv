







function init() {
        //Variables
        var score = 0;
        var jugar = false;
        
        
        //initialize the stage
        canvas = document.getElementById("canvas");
        stage = new createjs.Stage(canvas);
        
        
       
        //adding the background image
       //var text = new createjs.Text ("Dos + dos", "36px Arial", "#666");
       
        var background = new createjs.Bitmap("./images/background.jpg");
        stage.addChild(background);
        
        var logo = new createjs.Bitmap("./images/logoBig.png");
        logo.x=230;
        logo.y=140;
        
        stage.addChild(logo);
        
        
        //stage.addChild(text);
        //updating the stage
        stage.update();
        
        var btn1 =stage.addChild(new Button("Jugar","#F00"));
        btn1.x=300;
        btn1.y=350;
        
        createjs.Ticker.addEventListener("tick",stage);
        createjs.Ticker.addEventListener("click",stage);        

}