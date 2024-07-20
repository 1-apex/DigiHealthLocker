const expres = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const patientSchema = new mongoose.Schema({
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
    aadharcardnumber: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    phonenumber: {
        type: String,
        require: true,
    },
    pdfdocumnetslist: [
        {
            _id: mongoose.Types.ObjectId,
            filename: String,
            orginalname: String
        }
    ],
    appointmnets: [
        {
            appointmentId: String,
            hospitalName: String,
            doctorName: {
                firstname: {
                    type: String,

                },
                middelname: {
                    type: String,

                },
                lastname: {
                    type: String,

                },
            },
            department: String,
            appointmentDate: {
                type: Date
            },
            time: {
                type: String
            },
            problem: String,
            addressofhospital: String,

        }
    ],
    email: String,
    age: String,
    sex: String,
    bmiindex: String,
});

patientSchema.pre("save", async function (next) {
    try {

        if (!this.isModified("password")) {
            next();
        }
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

        next();



    } catch (err) {
        console.log(err);
        next({ message: "Encryption error" });
    }
})

patientSchema.methods.generateWebTocken = async function () {
    try {
        //returning the signed token which contents the payload as aadharcardnumber
        return await jwt.sign({ _id: this._id, aadharcardnumber: this.aadharcardnumber }, process.env.SECRET_KEY);



    } catch (e) {
        console.log(e);
        next({ status: 400 });
    }
}

const PatientModel = new mongoose.model('Patient', patientSchema);

module.exports = PatientModel;
