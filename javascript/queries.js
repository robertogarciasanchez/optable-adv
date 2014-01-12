function login(){
    var username = $('#username').val();
    var password=$('#password').val();
    $.ajax({
        type: "POST",
        url: "php/login.php",
        data: "name="+username+"&pwd="+password,
        success: function(data){
            if(data=='1'){
                $("#msg").html("You have logged");
                formDOMElement.visible=false;
                registered=true;
                startGame();
                $("#username").val('username');
                $("#password").val('password');
            }
            else{
                $("#msg").html("*Wrong username or password");
            }
        },
        beforeSend:function(){
            $("#msg").html("Loading...")
        }
    });
}

function statistics(){
    var username = $('#username').val();
    var password=$('#password').val();
    $.ajax({
        type: "POST",
        url: "php/login.php",
        data: "name="+username+"&pwd="+password,
        success: function(data){
            if(data=='1'){
                $("#msg").html("You have logged");
                formDOMElement.visible=false;
                $("#username").val('username');
                $("#password").val('password');
                //MOSTRAR ESTADISTICA
            }
            else{
                $("#msg").html("*Wrong username or password");
            }
        },
        beforeSend:function(){
            $("#msg").html("Loading...")
        }
    });
}

function loadGame(){
    var id = '4857';
    $.ajax({
        type: "POST",
        url: "php/getGame.php",
        data: "id="+id,
        success: function(data){
            alert(data);
            if(data){
                game = eval("("+data+")");
                for(i=0;i<game.pruebas.length;i++)
                    alert(game.pruebas[i]);
            }
            else{
                alert("Error!");
            }
        },
        beforeSend:function(){
            $("#msg").html("Loading...")
        }
    });
}




function loadOperation(){
    
    
}


