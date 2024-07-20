const nodemailer = require("nodemailer");

let sendReminderWithMail = async ({ email, appointmentDate, timeSlot, patientname, doctorname, address, phonenumber }) => {
    try {

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
            subject: `Appointment Reminder - ${appointmentDate} at ${timeSlot}`,
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
                                </style>
                            </head>
                            <body>
                                <div class="container">
                                    <h2>Appointment Reminder</h2>
                                    <p>Dear ${patientname},</p>
                                    <p>This is a reminder for your appointment with Dr. ${doctorname}.</p>
                                    <p><strong>Date:</strong> ${appointmentDate}</p>
                                    <p><strong>Time:</strong> ${timeSlot}</p>
                                    <p><strong>Location:</strong> ${address}</p>
                                    <p>If you have any questions or need to reschedule, please contact hospital at ${phonenumber}.</p>
                                    <p>Thank you,</p>
                                    <p>The DigiHealthLocker Team</p>
                                </div>
                            </body>
                    </html>
           `
        });
        console.log(info);
        return info;
    } catch (err) {
        console.log(err);
        // res.status(400).send({
        //     success: "false",
        //     message: "SMTP server side error",
        // })
    }
}

module.exports = sendReminderWithMail;