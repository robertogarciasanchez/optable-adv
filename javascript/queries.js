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
                $("#loginForm").fadeOut("normal");
                registered=true;
                startGame();
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

function showStatistics(){
    var username = $('#username').val();
    var password=$('#password').val();
    $.ajax({
        type: "POST",
        url: "php/login.php",
        data: "name="+username+"&pwd="+password,
        success: function(html){
            if(html=='1'){
                $("#msg").html("You have logged");
                $("#loginForm").fadeOut("normal");
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


