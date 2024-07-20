const jwt = require("jsonwebtoken");
const DoctoerModel = require('../models/Doctorschem');
const PatientModel = require('../models/PatientSchema');



const authmiddleware = async (req, res, next) => {
    try {
        let token = req.header('Authorization');
        // console.log("First token:", token)
        // console.log(token);


        token = token.replace("Barere", "").trim();
        // console.log("token is what we want " + token);
        if (token == "") {
            return res.status(401).send({ result: false, message: "Unothrized HTTP token is not provided" });
        }


        // Verify token and handle errors
        const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decodedToken) {
            return res.status(405).send({ result: false, message: "Token is not valid" });
        }
        console.log("The data we are getting at the token value is:", decodedToken);
        console.log("The adharcard number:", decodedToken.aadharcardnumber);
        // Determine user type based on payload content
        let userModel; // Declare variable to hold the appropriate model
        let searchQuery = {}; //query to search on the database 
        if (await decodedToken.registrationnumber) {
            userModel = DoctoerModel; // Doctor data retrieval
            searchQuery = { registrationnumber: decodedToken.registrationnumber };
        } else if (await decodedToken.aadharcardnumber) {
            userModel = PatientModel; // Patient data retrieval
            searchQuery = { aadharcardnumber: decodedToken.aadharcardnumber };

        } else {
            // Handle unexpected payload scenario (optional)
            return res.status(400).send({ result: false, message: "Invalid user type in token" });

        }

        console.log("The query of the final to find at the point:", searchQuery);

        // Fetch user data based on identified model
        const userData = await userModel.findOne(searchQuery);

        if (!userData) {
            return res.status(404).send({ result: false, message: "User not found" });
        }

        // Attach relevant user data to request object (modify as needed)
        console.log("THe user info after the decoding is:", userData);
        req.userData = userData

        next();
    } catch (error) {
        console.error(error); // Log the error for debugging
        next({ status: 405, message: "Server-side error: Authentication failed" });
    }
}

module.exports = authmiddleware;