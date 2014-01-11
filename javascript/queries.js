function login(){
    var username = $('#username').val();
    var password=$('#password').val();
    $.ajax({
        type: "POST",
        url: "php/login.php",
        data: "name="+username+"&pwd="+password,
        success: function(html){
            if(html=='1'){
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
        success: function(html){
            if(html=='1'){
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

function loadOperation(){
    
    
}


