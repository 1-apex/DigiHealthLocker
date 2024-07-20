const notSendingMailUntilOneMinute = async (otpTimeStamp, expireTimeTocheck) => {
    try {
        // console.log(otpTimeStamp);

        const currentTimeStamp = new Date();

        let DiffrenceInTheOtpTime = (otpTimeStamp - currentTimeStamp.getTime()) / 1000;
        DiffrenceInTheOtpTime /= 60;
        // console.log(Math.abs(DiffrenceInTheOtpTime));
        if (Math.abs(DiffrenceInTheOtpTime) > expireTimeTocheck) {
            return true;
        }
        return false;
    } catch (e) {
        console.log(e);
    }
}
module.exports = notSendingMailUntilOneMinute;