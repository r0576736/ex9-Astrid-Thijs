# ex9-Astrid-Thijs

Dit is oefening 9. Hier heb ik alle resources ingeladen: in CocoaRestClient werkt het, in robomongo niet. 
Daarom heb ik een 2e oefening gemaakt met behulp van code van Jelle Van Loock waarbij het wel in robomongo (mongoose) werkt. 
(Zie repository ex9-Astrid-Thijs-Mongoose).


Storage: 
  Mongodb installeren.
  Url meegeven waar je de data gaat in opslagen (./Resources)
  Connecteren naar mongodb
  
  Devices:  
    saveDevice = een toestel opslagen
    allDevice = alle toestellen opvragen
    findDevice = een toestel opzoeken
  Alarms:  
    saveAlarm = een alarm opslagen
    allAlarm = lijst van alarmen opvragen
    findAlarm = een alarm opzoeken 
  WhiteLists:  
    saveWhiteList = een record opslagen
    allWhiteLists = gehele lijst opvragen
    findWhiteList = een record opzoeken
 
  Check Storage.
 
 Validate:
 Velden mogen niet leeg zijn en moet juist datatype bevatten.
 Check Validate.
 
 Main:
  Extenties installeren (express, body-parser, uuid, mongodb).
  Dal linken in de main.
  Device
    GET       alle toestellen opvragen
    GET/:id   toestel met bepaald id opvragen
    POST      een toestel toevoegen
  Alarm
    GET       alle alarmen opvragen
    GET/:id   een alarm opvragen met bepaald id
    POST      een alarm toevoegen
  WhiteLists
    GET       gehele lijst opvragen
    GET/:id   een record opvragen met bepaald id
    POST      een record toevoegen
 
  Via app.listen start de server op: http://localhost:4567
  Check via console.log.
 
 
 Astrid Thijs.
  
  
