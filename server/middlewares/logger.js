const logger = (req, res, next) => {
    console.log("request r")
    next()
}

module.exports = logger