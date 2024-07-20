const nodemailer = require("nodemailer");

let sendOtpWithMail = async (email, otp) => {
    try {
        console.log("Sending the otp to the mail");
        console.log("The email and otp is", email, otp);
        // console.log(userfirstname, useremail);



        let transporter = nodemailer.createTransport({
            host: 'smtp.zoho.in',
            port: 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            }
        });
        let info = await transporter.sendMail({
            from: '"DigiHealthLocker" <roadster.com@zohomail.in>',
            to: email,
            subject: `Otp from DigiHealthLocker for verification`,
            html: `<html>
                            <head>
                                
                                <style>
                                    body {
                                        font-family: Arial, sans-serif;
                                    }
                                    .container {
                                        padding: 20px;
                                        border: 1px solid #ccc;
                                        border-radius: 5px;
                                        max-width: 600px;
                                        margin: auto;
                                    }
                                    h2 {
                                        color: #333;
                                    }
                                    p {
                                        line-height: 1.6;
                                    }
                                    .otp {
                                        font-size: 24px;
                                        font-weight: bold;
                                        color: #007BFF;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class="container">
                                    <h2>OTP Verification</h2>
                                    <p>Dear user,</p>
                                    <p>Your One-Time Password (OTP) for DigiHealthLocker is:</p>

                                    <p class="otp"><b>${otp}</b></p>
                                    <p>This OTP is valid for 10 minutes.</p>
                                    <p>Thank you,</p>
                                    <p>The DigiHealthLocker Team</p>
                                </div>
                            </body>
                    </html>`
        });
        console.log(info);
        return info;
    } catch (err) {
        console.log(err);
        res.status(400).send({
            success: "false",
            message: "SMTP server side error",
        })
    }
}

module.exports = sendOtpWithMail;