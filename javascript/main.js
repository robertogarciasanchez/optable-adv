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
        
        stage.addChild(logo);
        
        //stage.addChild(text);
        //updating the stage
        stage.update();
        
        
        var smarty = new Button();
        smarty.x = 205;
        smarty.y = 45;

        //include each state
        smarty.up( new Bitmap( 'assets/_up.png') );
        smarty.over( new Bitmap( 'assets/_over.png') );
        smarty.down( new Bitmap( 'assets/_down.png') );
        
        //handle each mouse action
        smarty.press = function(event){ log( 'smarty press' ); };
        smarty.rollOver = function(event){ log( 'smarty rollOver' ); };
        smarty.rollOut = function(event){ log( 'smarty rollOut' ); };
        smarty.release = function(event){ log( 'smarty release' ); };
}