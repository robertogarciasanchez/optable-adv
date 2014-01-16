/**
* @fileoverview  Consultas AJAX al serviodr
*
* @author Roberto García
* @version 0.1
*/

/*  The JavaScript code in this page is free software: you can
    redistribute it and/or modify it under the terms of the GNU
    General Public License (GNU GPL) as published by the Free Software
    Foundation, either version 3 of the License, or (at your option)
    any later version.  The code is distributed WITHOUT ANY WARRANTY;
    without even the implied warranty of MERCHANTABILITY or FITNESS
    FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

    As additional permission under GNU GPL version 3 section 7, you
    may distribute non-source (e.g., minimized or compacted) forms of
    that code without the copy of the GNU GPL normally required by
    section 4, provided you include this license notice and a URL
    through which recipients can access the Corresponding Source.
    */

/**
* Enviar al servidor la peticion de login
* 
*/

function login(){
    createjs.Sound.play("click", createjs.Sound.INTERRUPT_ANY,0,0,0,0.5);
    var username = $('#username').val();
    var password=$('#password').val();
    $.ajax({
        type: "POST",
        url: "php/login.php",
        data: "name="+username+"&pwd="+password,
        success: function(data){
            if(data!=0){
                $("#msg").html("You have logged");
                stage.getChildByName("layerForm").visible=false;
                registered=true;
                usuario=data;
                askGame();
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

/**
* Muestra las últimas partidas del usuario
* 
*/

function statistics(){
    createjs.Sound.play("click", createjs.Sound.INTERRUPT_ANY,0,0,0,0.5);
    var username = $('#username').val();
    var password=$('#password').val();
    $.ajax({
        type: "POST",
        url: "php/login.php",
        data: "name="+username+"&pwd="+password,
        success: function(data){
            if(data=='1'){
                $("#msg").html("You have logged");
                stage.getChildByName("layerForm").visible=false;
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

/**
* Recupera del servidor la información del juego
* 
*/

function loadGame(op){
    var id = op;
    $.ajax({
        type: "POST",
        url: "php/getGame.php",
        data: "id="+id,
        success: function(data){    
            if(data){
                game = eval("(" + data + ")");
                load=true;
            }
            else{
                alert("Error!");
                load=false;
            }
        },
        beforeSend:function(){
            $("#msg").html("Loading...")
        }
    });
}


