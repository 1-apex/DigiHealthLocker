const bcrypt = require("bcrypt");


const CompnaeringPassword = async (password, hasedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hasedPassword);

        return isMatch;
    } catch (e) {
        console.log(e);
        next({ status: 400, message: "There is problem server side while comparing the passwords" })
    }
}

module.exports = CompnaeringPassword;