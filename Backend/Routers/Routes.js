const expres = require('express');
const router = expres.Router();
const { temCotroller, Registrationdoctor, loginOfDoctor, uploadingFile, addAppointment, getTheListOfData, genareteOtp, verifyOtp } = require('../controllers/DockterController');
const { registrationpatient, loginOfPatient, getAllPdfForPerson } = require('../controllers/PatientController');
const Validate = require('../middlewares/Validate-middleware');
const { VerificationRegisterrationschema, VerificationLoginschemaPatient, VerificationOfAllPdfs } = require('../validator/PatientValidatorSchemas');
const { VerificationRegisterrationschemaDoctor, VerificationLoginschemaDoctor, VerificationAddAppointment, otpverificationZod, otpverificationAfterGenZod, uploadFileVerifcationToEnd } = require('../validator/DoctorValidationSchemas');
const Auth = require('../middlewares/Auth');
const { gfs, upload } = require('../models/UploadingFiles');
const sizeLimitation = require('../middlewares/CheckSizeFile');


router.get("/", temCotroller);
router.post("/pregister", Validate(VerificationRegisterrationschema), registrationpatient);
router.post("/dregister", Validate(VerificationRegisterrationschemaDoctor), Registrationdoctor);
router.post("/plogin", Validate(VerificationLoginschemaPatient), loginOfPatient);
router.post("/dlogin", Validate(VerificationLoginschemaDoctor), loginOfDoctor);
router.get("/user", Auth, temCotroller)
router.post("/duploadPdf", sizeLimitation, upload.single('file'), uploadingFile);
router.post("/dAddAppointment", Validate(VerificationAddAppointment), addAppointment);
// router.post("/dretriveApointment", getTheListOfData);
//otp verificationa and showing the pdfs

router.post("/gotp", Validate(otpverificationZod), genareteOtp);
router.post("/votp", Validate(otpverificationAfterGenZod), verifyOtp);

//end for sending the pdf of the user 
router.post("/userPdfAll", Validate(VerificationOfAllPdfs), getAllPdfForPerson);
module.exports = router;