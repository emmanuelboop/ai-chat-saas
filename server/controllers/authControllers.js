const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../config/models/User");

async function signup(req, res) {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    console.log("User created: " + user);
    const token = jwt.sign(
        {
            id: user._id,
            email,
        },
        "my-secret-key",
        {
            expiresIn: "7d",
        }
    );
    console.log("data" + JSON.stringify({ email, hashedPassword }));
    console.log("token: " + token);
    res.json({
        message: "User created",
        token,
    });

}

async function login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ message: "invalid credentials" });
    }
    const token = jwt.sign(
        {
            id: user._id,
            email,

        },
        "my-secret-key",
        {
            expiresIn: "7d",
        }
    );
    res.json({
        token,
    });
}

module.exports = {
    signup,
    login
};
