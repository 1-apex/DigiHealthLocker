
const ErrorMiddleWare = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Backe end error!";
    const moreDetails = err.details || "This is error form backend check the logs!";

    return res.status(status).json({ message, moreDetails });
}

module.exports = ErrorMiddleWare;