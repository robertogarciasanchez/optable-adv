function init() {
        //initialize the stage
        canvas = document.getElementById("canvas");
        stage = new createjs.Stage(canvas);
        
        //adding the background image
        var text = new createjs.Text ("Dos + dos", "36px Arial", "#666");
       
        var background = new createjs.Bitmap("./images/background.jpg");
        stage.addChild(background);
        
        var logo = new createjs.Bitmap("./images/logo.png");
        stage.addChild(logo);
        
        stage.addChild(text);
        //updating the stage
        stage.update();
}