const sizeLimitation = async (req, res, next) => {

    if (req.headers['content-length'] > 50 * 1024 * 1024) {
        return res.send({ message: "The file is grater expcted compress the file" })
    }
    next();

}

module.exports = sizeLimitation;