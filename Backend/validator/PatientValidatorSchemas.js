const { z } = require("zod");



const VerificationRegisterrationschema = z.object({
    firstname: z.string({ required_error: "First name is required" }).trim().min(3, "Length of the name must be minimum of length 3").max(20, "The length of the name is can not be grater than 20"),
    middelname: z.string({ required_error: "Middle name is required" }).trim().min(3, "Length of the middle name must be mininmun of lenght 3").max(20, "The length of the name is can not be grater than 20"),
    lastname: z.string({ required_error: "Middle name is required" }).trim().min(3, "Length of the middle name must be mininmun of lenght 3").max(20, "The length of the name is can not be grater than 20"),
    email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email address" }),
    aadharcardnumber: z.string({ required_error: "Aadharcard number is required" }).trim().min(12, "Aadhaar number can not have lenght less than 12 digit").max(12, "Aadhaar number can not have lenght grater than 12 digit"),
    phonenumber: z.string({ required_error: "Phone number is required" }).trim().min(10, "Length of the phone number must be mininmun of lenght 10").max(15, "Length of the phone number must be mininmun of lenght 15"),
    password: z.string({ required_error: "Password is required" }).trim().min(4, "Length of the password  must be mininmun of 4 charater"),
    cpassword: z.string({ required_error: "Password is required" }).trim().min(4, "Length of the password name must be mininmun of lenght 4"),


});

const VerificationLoginschemaPatient = z.object({
    aadharcardnumber: z.string({ required_error: "Aadharcard number is required" }).trim().min(12, "Aadhaar number can not have lenght less than 12 digit").max(12, "Aadhaar number can not have lenght grater than 12 digit"),
    password: z.string().trim().min(4, "Length of the password must be mininmun of 4 charater"),


})

const VerificationOfAllPdfs = z.object({
    aadharcardnumber: z.string({ required_error: "Aadharcard number is required" }).trim().min(12, "Aadhaar number can not have lenght less than 12 digit").max(12, "Aadhaar number can not have lenght grater than 12 digit"),
})

module.exports = { VerificationRegisterrationschema, VerificationLoginschemaPatient, VerificationOfAllPdfs };