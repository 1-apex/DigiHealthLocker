// const exprees = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const doctoerSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            require: true,
        },
        middelname: {
            type: String,
            require: true,
        },
        lastname: {
            type: String,
            require: true,
        },
    },
    hostpitalname: String,
    registrationnumber: {
        type: String,
        require: true,

    },
    yearofregistration: {
        type: String,
        require: true
    },
    statemedicalcouncil: {
        type: String,
        require: true
    },
    addressofhospital: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    phonenumber: {
        type: String,
        require: true
    },
    degrees: [
        {

            type: String,


        }
    ],
    appointmnets: [
        {
            appointmentId: String,
            patientName: String,
            patientAddharnumber: String,
            appointmentDate: {
                type: Date
            },
            time: {
                type: String
            },
            problem: String

        }
    ],
    email: String,
    age: String,
    sex: String,
});

doctoerSchema.pre("save", async function (next) {
    try {

        if (!this.isModified("password")) {
            const salt = await bcrypt.genSalt();
            this.password = await bcrypt.hash(this.password, salt);
        }

    } catch (e) {
        console.log(e);
        next({ status: 412, message: "server side encryption failed" });
    }
})

doctoerSchema.methods.generateTokenForDoctor = async function () {
    try {
        return await jwt.sign({ _id: this._id, registrationnumber: this.registrationnumber }, process.env.SECRET_KEY);
    } catch (e) {
        console.log(e);
        next({ message: "Token can not be generated" });
    }
}

const DoctoerModel = new mongoose.model("Doctoer", doctoerSchema);

module.exports = DoctoerModel;
