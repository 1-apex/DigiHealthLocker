const mongoose = require('mongoose');


const otpSchema = new mongoose.Schema({
    aadharcardnumber: {
        type: String,
        require: true
    },
    otp: {
        type: Number,
        require: true
    },
    timeStamp: {
        type: Date,
        default: Date.now(),
        require: true,
        get: (timeStamp) => timeStamp.getTime(),
        set: (timeStamp) => new Date(timeStamp),
    }

});


const otpModel = mongoose.model('Otp', otpSchema);

module.exports = otpModel;