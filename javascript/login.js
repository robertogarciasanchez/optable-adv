
function login(){
        $("#loginForm").fadeIn("normal");
    
        var username = $('#username').val();
        var password=$('#password').val();
        $.ajax({
            type: "POST",
            url: "php/login.php",
            data: "name="+username+"&pwd="+password,
            success: function(html){
                alert(html);
                if(html=='1'){
                    $("#msg").html("You have logged");
                    $("#loginForm").fadeOut("normal");
                    return true;
                }
                else{
                    $("#msg").html("*Wrong username or password");
                }
            },
            beforeSend:function(){
                $("#msg").html("Loading...")
            }
        });
    return false;
}