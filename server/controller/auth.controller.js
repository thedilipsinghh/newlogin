const User = require("../modal/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    try {
        const { password, email } = req.body
        const data = await User.findOne({ email })
        if (data) {
            return res.status(409).json({ message: "email already exist", success: false })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        await User.create({ ...req.body, password: hashPassword })
        res.status(201).json({ message: "user register success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, success: false })

    }
}
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        // 1  check if email exist in our databse
        const data = await User.findOne({ email }) // if found will return object wtih all fileds
        // 2  if not present send error
        if (!data) {
            return res.status(401).json({ message: "email not found", success: false })
        }
        // 3  compare password
        const isValid = await bcrypt.compare(password, data.password)
        // 4  if password do not match send errro
        if (!isValid) {
            return res.status(401).json({
                message: "inValid password", success: false
            })
        }
        // 5 if isActive false send error
        if (!data.isActive) {
            return res.status(401).json({ message: "account blocked by admin", success: false })
        }
        // 6  if password match login success

        // jwt token
        const token = jwt.sign({ _id: data._id, name: data.name }, process.env.JWT_KEY, { expiresIn: "1d" })

        // send secure cookie
        res.cookie("ADMIN", token, {
            maxAge: 1000 * 60,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        })

        res.status(200).json({ message: "user login success", data: { name: data.name, email: data.email } })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, success: false })

    }
}
exports.logout = async (req, res) => {
    try {
        res.clearCookie("ADMIN")
        res.status(200).json({ message: "user logout success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, success: false })

    }
}

//  next topic
// JWT token
// access token and refresh token  