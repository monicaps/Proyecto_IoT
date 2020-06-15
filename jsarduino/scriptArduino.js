var clientId='client_id_'+Math.floor((Math.random()+1000000)+1);
client=new Paho.MQTT.Client("soldier.cloudmqtt.com",37044,clientId);//servidor,websocket port

client.onConnectionLost= onConnectionLost;
client.onMessageArrived= onMessageArrived;

var options={
    useSSL:true,
    userName:"mqwrwnph",
    password:"mlb5VPLWeuj6",
    onSuccess:onConnect,
    onFailure:doFail
}

client.connect(options);

function onConnect(){
    $("#status").html("Conexion Establecida");
    client.subscribe("salida");
}

function onMessageArrived(message){
    $("#mensajesServicios").html(message.payloadString);
    console.log(message.payloadString);
}

function doFail(e){
    console.log(e);
}

function onConnectionLost(responseObject){
    if(responseObject.errorCode!=0){
        console.log("onConnectionLost: "+responseObject.errorMessage);
    }
}

//funcion que envia el valor a traves del servidor
function command(value){
    message= new Paho.MQTT.Message(value+"");
    message.destinationName="Entrada";
    client.send(message);
    console.log("Mensaje para mandar llamar a la animacion "+value);
    //console.log(message);
}

function prueba(){
    var valueAnimacion=$('input:radio[name=animacion]:checked').val(); //obtener los valores del radiobutton
    $("#descripcionAnimacion").html("Ejecutando la animaci&oacute;n "+valueAnimacion);
    console.log("Animacion:"+valueAnimacion);
    command(valueAnimacion);
}