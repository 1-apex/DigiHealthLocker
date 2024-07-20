const mongoose = require('mongoose');


const db = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("The database is connected successfully");
    } catch (err) {
        console.log(err);
        process.exit(0);
    }
}


module.exports = db;