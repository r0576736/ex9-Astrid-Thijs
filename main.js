
var express = require('express');                                               //webserver in Node JS
var bodyParser = require('body-parser');                                        //body uitlezen
var uuid = require('uuid');                                                     //automatische unieke id


var dal = require("./storage.js");                                              //opslag
var validation = require("./validate.js");                                      //data validatie


var app = express();                                                            //variabele aanmaken in webserver
app.use(bodyParser.json());                                                     //automatische body parser, meegeven in request



//Devices

app.get("/devices", function(request, response) {                               //methode GET implementatie
    response.send(dal.AllDevices());                                            //alle toestellen opvragen
});


app.get("/devices/:id", function(request, response) {                           //methode GET/:d implementatie
    var device = dal.findDevice(request.params.id);                             //een toestel opvragen met bepaalde id
    if (device) {   
        response.send(device);                                                  //gevonden, toestel weergeven
    } else {
        response.status(404).send();                                            //niet gevonden, error 
    }
});

app.post("/devices", function(request, response) {                              //methode POST implementatie
    var device = request.body;                                                  //body meegeven

    var errors = validation.fieldsNotEmpty(device, "mac_address_device", "time_captured", "distance"); 
    if (errors) {                                                               //data validatie
        response.status(400).send({                                             
            message: "Following field(s) are mandatory:" + errors.concat()      //lege of onjuiste velden, error
        });
        return;
    }


    var existingDevice = dal.findDevice(device.mac_address_device);             //opvragen of het wel een uniek record is
    if (existingDevice) {
        response.status(409).send({
            message: "id must be unique, it's already registered",              //error
            link: "../devices/" + existingDevice.id
        });
        return;
    }


    device.id = uuid.v4();                                                      //toestel unieke id meegeven

    dal.saveDevice(device);                                                     //toestel opslagen in datastore 'Devices'

    response.status(201).location("../devices/" + device.id).send();            //status zenden
});



app.get("/alarms", function(request, response) {                                //methode GET
    response.send(dal.AllAlarms());                                             //lijst met alarmen opvragen
}); 


app.get("/alarms/:id", function(request, response) {                            //methode GET/:id
    var device = dal.findAlarm(request.params.id);                              //alarm opzoeken met bepaalde id
    if (device) {               
        response.send(device);                                                  //gevonden, alarm weergeven
    } else {
        response.status(404).send();                                            //niet gevonden, error
    }
});


app.post("/alarms", function(request, response) {                               //methode POST 

    var alarm = request.body;                                                   //body meegeven


    var errors = validation.fieldsNotEmpty(alarm, "name_drone", "location", "type_alarm", "time_alarm", "notification", "type_notification", "important_alarm");
    if (errors) {                                                               //data validatie
        response.status(400).send({
            message: "Following field(s) are mandatory:" + errors.concat()      //lege of onjuiste velden, error 
        });
        return;
    }

 
    alarm.id = uuid.v4();                                                       //alarm unieke id meegeven

    dal.saveAlarm(alarm);                                                       //alarm opslagen in datastor 'Alarms'

    response.status(201).location("../alarms/" + alarm.id).send();              //status zenden
});



//WhiteLists

app.get("/whitelists", function(request, response) {                            //methode GET
    response.send(dal.AllWhitelists());                                         //gehele lijst 'WhiteLists' opvragen
});


app.get("/whitelists/:id", function(request, response) {                        //methode GET/:id
    var whitelist = dal.findWhitelist(request.params.id);                       //record opvragen met bepaalde id
    if (whitelist) {
        response.send(whitelist);                                               //gevonden, record weergeven
    } else {
        response.status(404).send();                                            //niet gevonden, error
    }
});


app.post("/whitelists", function(request, response) {                           //methode POST

    var whitelist = request.body;                                               //body meegeven


    var errors = validation.fieldsNotEmpty(whitelist, "name", "function_person", "mac_address_device", "type_device");
    if (errors) {                                                               //data validatie
        response.status(400).send({
            message: "Following field(s) are mandatory:" + errors.concat()      //lege of onjuiste velden, error
        });
        return; 
    }


    whitelist.id = uuid.v4();                                                   //record unieke id meegeven

    dal.saveWhitelist(whitelist);                                               //record opslagen in datastore 'WhiteLists'

    response.status(201).location("../whitelists/" + whitelist.id).send();      //status zenden
});



app.listen(4567);                                                               //server start op http://localhost:4567

console.log("Server started");                                                  //check
