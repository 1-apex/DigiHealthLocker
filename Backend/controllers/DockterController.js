const DoctoerModel = require('../models/Doctorschem');
const CompnaeringPassword = require('../utils/ComparingPassword');
const DoctorValidationWithWebsite = require('../utils/DoctorValidationWithWebsite');
const PatientModel = require('../models/PatientSchema');
const mongoose = require('mongoose');
const generateotp = require('../utils/OtpGeneration');
const otp = require('../models/otp');
const sendOtpWithMail = require('../utils/SendingMail');
const notSendingMailUntilOneMinute = require('../utils/regenerationAftermin');
const sendMessageToUserOnDateAppointment = require("../utils/shedulingTheJobOfNotification");
const { gfsPromise } = require('../models/UploadingFiles');
const archiver = require('archiver');


const temCotroller = async (req, res) => {
    try {
        if (!req.userData) {
            return res.send(400).send({ result: false, message: "User is not authticated" });
        }

        res.status(200).send({ result: true, user: req.userData });
    } catch (err) {
        console.log(err);
        next({ status: 500, message: "Server side error" });
    }
}
const Registrationdoctor = async (req, res) => {
    try {

        let { firstname, middelname, lastname, registrationnumber, yearofregistration, statemedicalcouncil, addressofhospital, password, cpassword, phonenumber, hostpitalname } = req.body;
        const existUser = await DoctoerModel.findOne({ registrationnumber });

        if (existUser) {
            return res.status(409).send({ result: false, message: "User already exists" });
        }

        if (password != cpassword) {
            return res.status(401).send({ result: false, message: "Passwords do not match. Please try again." });
        }
        //checking the validation of the doctor with web scraping
        const validateDoctor = await DoctorValidationWithWebsite({ Doctorname: `${firstname.toLowerCase()} ${middelname.toLowerCase()} ${lastname.toLowerCase()}`, RegistrtionNumber: registrationnumber, userYear: yearofregistration, userStateCouncil: statemedicalcouncil });

        if (!validateDoctor) {
            return res.status(401).send({ result: false, message: "Give correct details of registration number with munciple conusile" });

        }

        //Web scraping for the cheking of the doctor
        console.log("The name of the hostpital will be as per I decide yoooo", hostpitalname);
        const newDoctoruser = await DoctoerModel.create({ fullname: { firstname, middelname, lastname }, registrationnumber, yearofregistration, hostpitalname, statemedicalcouncil, addressofhospital, password, cpassword, phonenumber, });

        newDoctoruser.save();
        const token = await newDoctoruser.generateTokenForDoctor();
        res.status(200).send({ result: true, message: "User is registered sucessfully", token });

    } catch (e) {
        console.log(e);
        next({
            status: 400,
            message: "Login unsuccessful server side error",
        })
    }
}

const loginOfDoctor = async (req, res) => {
    try {
        const { registrationnumber, password } = req.body;
        const user = await DoctoerModel.findOne({ registrationnumber });
        if (!user) {
            return res.status(404).send({ result: false, message: "User not exists" })
        }
        const isMatch = await CompnaeringPassword(password, user.password);
        if (!isMatch) {
            return res.status(404).send({ result: false, message: "Enter correct cerditilas" });
        }

        const token = await user.generateTokenForDoctor();
        // console.log("Token of doctor is ", token);
        res.status(200).send({ result: true, message: "Login sucessfully", token });


    } catch (e) {
        console.log("In the catch", e);

        next({
            status: 400,
            message: "Login unsuccessful server side error",
        })
    }
}

const uploadingFile = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).send({ result: false, message: "Select file to upload" })
        }
        if (!req.body.aadharcardnumber) {
            return res.status(400).send({ result: false, message: "Enter Addharcard Number" });

        }
        if (req.body.aadharcardnumber.length != 12) {
            return res.status(400).send({ result: false, message: "Provide Valid Addhar Card Number" });
        }

        const userFileUpload = await PatientModel.findOne({ aadharcardnumber: req.body.aadharcardnumber });
        if (!userFileUpload) {
            res.status(404).send({ result: false, message: "User not found with the aadharcard" });
        }
        if (userFileUpload.pdfdocumnetslist.find(fileDetail => fileDetail.orginalname === req.file.originalname)) {
            return res.status(404).send({ result: false, message: "File alredy exist" });
        }
        // console.log(userFileUpload);
        // console.log(req.file.id);
        // console.log(req.file.filename);
        const newListPdfs = userFileUpload.pdfdocumnetslist.concat({
            _id: req.file.id.valueOf(),
            filename: req.file.filename,
            orginalname: req.file.originalname
        });

        // console.log(newListPdfs);

        const changeduser = await PatientModel.findOneAndUpdate({
            aadharcardnumber: req.body.aadharcardnumber
        }, { $set: { pdfdocumnetslist: newListPdfs } });

        // console.log(changeduser);
        if (!changeduser) {
            return res.status(400).send({ result: false, message: "File been added but user is not updated" });
        }

        res.status(200).send({ result: true, message: "File added " });




    } catch (e) {
        console.log(e);
        // next({ status: 500 });
        next({
            status: 400,
            message: "Server side error and we can not upload the file",
        })

    }
}

const addAppointment = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(404).send({ result: false, message: "Enter all data required for the appointment" });
        }
        console.log("The body getting after adding:", req.body);
        const { registrtionNumber, patientAadharNo, department, appointmentDate, timeSlot, problem } = req.body;

        console.log("The departmenr is at the top:", department);
        const userToFindAppointmnet = await PatientModel.findOne({ aadharcardnumber: patientAadharNo });

        if (!userToFindAppointmnet) {
            return res.status(404).send({ result: false, message: "Patient with give aadharnumber is not exsits" });
        }
        const upadateDoctor = await DoctoerModel.findOne({ registrationnumber: registrtionNumber })

        if (upadateDoctor === null) {
            res.status(404).send({ result: false, message: "The registrati number is not valid for this number" });
            return;
        }
        const uniqueIdForAppoitment = new mongoose.Types.ObjectId();
        const updateListOfAppointment = upadateDoctor.appointmnets.concat({
            patientName: userToFindAppointmnet.fullname.firstname, appointmentDate: appointmentDate, time: timeSlot, problem, patientAddharnumber: patientAadharNo, appointmentId: uniqueIdForAppoitment.toHexString()
        });

        // console.log(updateListOfAppointment);


        const updatedDoctor = await DoctoerModel.findOneAndUpdate({ registrationnumber: registrtionNumber }, { $set: { appointmnets: updateListOfAppointment } });
        // //Will be not used after jsonwebtoken
        // const deatilsOfDoctor = await DoctoerModel.findOne({ registrationnumber: registrtionNumber });
        if (!updatedDoctor) {

            return res.status(404).send({ result: false, message: "Appointment is not added" });
        }
        console.log(updatedDoctor);
        console.log(updatedDoctor.appointmnets.length);
        // const updateListOfPatientIdIs = updatedDoctor.appointmnets[updatedDoctor.appointmnets.length - 1]._id;

        // console.log("This is the appoinment id we have to create", uniqueIdForAppoitment.toHexString());

        const updatePatientAppointmentList = userToFindAppointmnet.appointmnets.concat({
            appointmentId: uniqueIdForAppoitment.toHexString(), hospitalName: upadateDoctor.hostpitalname, doctorName: { firstname: upadateDoctor.fullname.firstname, middelname: upadateDoctor.fullname.middelname, lastname: upadateDoctor.fullname.lastname }, department: department,
            appointmentDate: appointmentDate, time: timeSlot, problem: problem, addressofhospital: upadateDoctor.addressofhospital
        })

        const updatePaient = await PatientModel.findOneAndUpdate({ aadharcardnumber: patientAadharNo }, { $set: { appointmnets: updatePatientAppointmentList } })

        console.log(updatePaient);

        // Sheduling the job to send the message to the user
        // userToFindAppointmnet.fullname.firstname;
        sendMessageToUserOnDateAppointment({ appointmentDate, timeSlot, patientname: userToFindAppointmnet.fullname.firstname, doctorname: upadateDoctor.fullname.firstname, address: upadateDoctor.addressofhospital, phonenumber: upadateDoctor.phonenumber, email: userToFindAppointmnet.email });
        res.status(200).send({ result: true, message: "Appoinment is added" });














    } catch (e) {
        console.log(e);
        next({
            status: 400,
            message: "Serevr side error and appointment is not added",
        });
    }
}

// const getTheListOfData = async (req, res) => {

//     try {
//         if (!req.body) {
//             res.status(400).send({ result: false, message: "Addharcard is not recived" });
//         }

//         const { registrationnumber } = req.body;

//         const userData = await DoctoerModel.findOne({ registrationnumber });
//         console.log(userData.appointmnets);

//         if (!userData) {
//             res.status(400).send({ result: false, message: "User not found with this aadharcardnumber number" });
//         }

//         res.status(200).send({ result: true, list: userData.appointmnets });



//     } catch (e) {
//         console.log(e);
//         // next({
//         //     status: 500,
//         //     message: "Serevr side error check backend"
//         // })
//         res.status(500).send({ reslut: false, message: "Serevr side error" });
//     }
// }


const genareteOtp = async (req, res) => {
    try {
        const { patientAadharNo: aadharcardnumber } = req.body;


        //checking that the user is prest or not

        const patientpresent = await PatientModel.findOne({ aadharcardnumber });
        // console.log(patientpresent);
        if (!patientpresent) {
            return res.status(404).send({
                result: false,
                message: "User does not found with the provided addharcard"
            });
        }

        //generating the otp for user with utils
        const g_opt = await generateotp();

        const sendingTheLimit = await otp.findOne({ aadharcardnumber });

        if (sendingTheLimit) {
            const sendNextOtp = await notSendingMailUntilOneMinute(sendingTheLimit.timeStamp, 1);
            if (!sendNextOtp) {
                return res.status(400).send({ result: false, message: "Generate the otp after one minute" });
            }
        }

        //storing the otp to the database with addharcard
        const cDate = new Date();
        await otp.findOneAndUpdate({ aadharcardnumber }, { otp: g_opt, timeStamp: new Date(cDate) }, { upsert: true, new: true, setDefalutOnInsert: true });


        const mailInfo = await sendOtpWithMail(patientpresent.email, g_opt);
        console.log("The mail info is", mailInfo);
        res.status(200).send({ result: true, message: "Otp is send sucessfully", otp: g_opt });

        // console.log("The number we want", aadharcardnumber);


    } catch (e) {
        // console.log(e);
        // console.log("The error we getting:", e.errors);


        res.send(400).send({ result: false, message: "Server side error" });

        // next({
        //     status: 400,
        //     message: "Serevr side error and appointment is not added",
        // });
    }
}

const verifyOtp = async (req, res) => {
    try {
        const { patientAadharNo: aadharcardnumber, otp: providedOtp } = req.body;



        const isOtpValidAndPresent = await otp.findOne({ aadharcardnumber, otp: providedOtp });

        if (!isOtpValidAndPresent) {
            return res.status(406).send({ result: false, message: "Otp provided is wrong" });
        }

        //checking the time stamp of the otp if the otp has been generated 10 min it is exprired

        const otpExpried = await notSendingMailUntilOneMinute(isOtpValidAndPresent.timeStamp, 10);
        if (otpExpried) {
            return res.status(410).send({ result: false, message: "Opt is expried regenrate the otp" });
        }

        const patientFiles = await PatientModel.findOne({ aadharcardnumber });
        // console.log(patientFiles);
        if (patientFiles.pdfdocumnetslist.length === 0) {
            return res.status(404).send({ result: false, messgae: "There are no file in the database" });
        }
        const pdfListForThePatient = patientFiles.pdfdocumnetslist;

        const pdfFilenames = pdfListForThePatient.map(doc => doc.filename);
        // console.log(pdfFilenames);

        // console.log("gfs is as follows", gfs);
        const gfs = await gfsPromise;
        console.log("The gfs is as :", gfs);
        const files = await gfs.find({ filename: { $in: pdfFilenames } }).toArray();

        console.log("All fil related to the main paitient", files, "Length is:", files.length);
        // res.status(200).send({ result: true, message: "File are send" });

        if (files.length === 0) {
            return res.status(404).send({ result: false, messgae: "There are no file in the database" });
        }
        const archive = archiver('zip', {
            zlib: { level: 9 }
        });

        archive.pipe(res);
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', 'attachment; filename="all_pdfs.zip"');

        files.forEach(file => {
            const downloadStream = gfs.openDownloadStream(file._id);
            archive.append(downloadStream, { name: file.filename })
        });

        archive.finalize();

        archive.on('end', () => {
            console.log('All files have been streamed');

        });

        archive.on('close', () => {
            console.log('Archive has been finalized');

            // res.status(200).send({ message: "All files have been sent in zip" });
        });





    } catch (e) {
        console.log("The error we getting", e.errors);
        // res.status(400).send({ result: false, message: e[0].errors[0].message });
        // next({
        //     status: 400,
        //     message: "Serevr side error and appointment is not added",
        // });
    }
}

module.exports = { temCotroller, Registrationdoctor, loginOfDoctor, uploadingFile, addAppointment, genareteOtp, verifyOtp };