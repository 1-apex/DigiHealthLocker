const schedule = require("node-schedule");
const SendingReminderToPatientAppoinment = require("./SendingReminderToPatientAppoinment")

const sendMessageToUserOnDateAppointment = (infoTosend) => {
    const { email, appointmentDate, timeSlot, patientname, doctorname, address, phonenumber } = infoTosend;
    console.log("All the data we need is ", email, appointmentDate, timeSlot, patientname, doctorname, address, phonenumber);


    const dateTimeString = `${appointmentDate}T${timeSlot}:00`;

    const appointMentDate = new Date(dateTimeString);
    console.log("The date which is decided correctly", appointMentDate);

    // Calculate one day before the appointment
    const oneDayBefore = new Date(appointMentDate);
    oneDayBefore.setDate(oneDayBefore.getDate() - 1);
    console.log("THe day before and all the details:", oneDayBefore);


    // Calculate 5 hours before the appointment
    const fiveHoursBefore = new Date(appointMentDate);
    fiveHoursBefore.setHours(fiveHoursBefore.getHours() - 5);
    console.log("THe day before and all the details:", fiveHoursBefore);


    // Schedule email one day before the appointment
    schedule.scheduleJob(oneDayBefore, async function () {
        const info = await SendingReminderToPatientAppoinment({ email, appointmentDate, timeSlot, patientname, doctorname, address, phonenumber });
        if (info) {
            console.log("The mail is sent one day before the date", new Date());
        }
    });

    // Schedule email 5 hours before the appointment
    schedule.scheduleJob(fiveHoursBefore, async function () {
        const info = await SendingReminderToPatientAppoinment({ email, appointmentDate, timeSlot, patientname, doctorname, address, phonenumber });
        if (info) {
            console.log("The mail is sent 5 hours before the date", new Date());
        }
    });

}
module.exports = sendMessageToUserOnDateAppointment;