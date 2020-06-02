var clientId='client_id_'+Math.floor((Math.random()+1000000)+1);
client=new Paho.MQTT.Client("servidor",32480,clientId);//servidor,websocket port

client.onConnectionLost= onConnectionLost;
client.onMessageArrived= onMessageArrived;

var options={
    useSSL:true,
    userName:"",
    password:"",
    onSuccess:onConnect,
    onFailure:doFail
}


function onConnect(){
    $("#card-text-status").html("Conexion Establecida");
    client.subscribe("salida");
}

function onMessageArrived(message){
    $("#card-text-msj").html(message.payloadString);
}

function onConnectionLost(responseObject){
    if(responseObject.errorCode!=0){
        console.log("onConnectionLost: "+responseObject.errorMessage);
    }
}

function command(value){
    message= new Paho.MQTT.Message(value+"");
    message.destinationName="entrada";
    client.send(message);
}

//función prueba para mostrar datos a traves del modal
function prueba(){
    var valueAnimacion=$('input:radio[name=animacion]:checked').val(); //obtener los valores del radiobutton
    $(".modal-body").html("&iquest;Desea ejecutar esta animaci&oacute;n?<br>Animaci&oacute;n "+valueAnimacion);
}