var MongoClient = require('mongodb').MongoClient;                               //mongo installeren
var url = "mongodb://localhost:27017/Resources";                                //hier is onze database (./Resources)

module.exports = {                          
    connect: function(error, result){                                           //connecteren met mongo
        MongoClient.connect(url, function (error, db){
        if (error)
           throw new Error(error);                                              //lukt niet, error
        console.log("Succesfully connected!");                                  //lukt wel, succes!
        result(db);
        });
    },
    
    devices: {},                                                                //opslag 'Devices'

    saveDevice: function(device) {                                              //een toestel opslagen
        this.devices[device.id] = device;                                       
    },
    AllDevices: function() {                                                    //alle toestellen opvragen
        var rtnValue = [];
        for (var item in this.devices) {
            rtnValue.push(this.devices[item]);
        };
        return rtnValue;
    },
    findDevice: function(id) {                                                  //een toestel opzoeken
        return this.devices[id];
    },

    alarms: {},                                                                 //opslag 'Alarms'

    saveAlarm: function(alarm) {                                                //een alarm opslagen
        this.alarms[alarm.id] = alarm;
    },
    AllAlarms: function() {                                                     //alle alarmen opvragen
        var rtnValue = [];
        for (var item in this.alarms) {
            rtnValue.push(this.alarms[item]);
        };
        return rtnValue;
    },

    findAlarm: function(id) {                                                   //een alarm opzoeken
        return this.alarms[id];
    },

    whitelists: {},                                                             //opslag 'WhiteLists'

    saveWhitelist: function(whitelist) {                                        //een record opslagen
        this.whitelists[whitelist.id] = whitelist;
    },
    AllWhitelists: function() {                                                 //alle records opvragen
        var rtnValue = [];
        for (var item in this.whitelists) {
            rtnValue.push(this.whitelists[item]);
        };
        return rtnValue;
    },
    findWhitelist: function(id) {                                               //een record opzoeken
        return this.whitelists[id];
    }
};

console.log("Storage check");                                                   //Storage check