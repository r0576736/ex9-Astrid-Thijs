module.exports = {

  fieldsNotEmpty: function (object) {                                           //velden mogen niet leeg zijn
    var errors = [];
    for (i = 1; i < arguments.length; i++) {
      if (!this.fieldNotEmpty(object, arguments[i])) {
        errors.push(arguments[i]);
      }
    }
    ;
    return errors.length === 0 ? null : errors;
  },

  fieldNotEmpty: function (object, field) {                                     //veld mag niet leeg zijn
    return object && object[field] && object[field] !== "";
  },

  fieldCorrectType: function() {                                                //veld moet juist datatype hebben

  }
};

console.log("Validate Check");                                                  //Validate check