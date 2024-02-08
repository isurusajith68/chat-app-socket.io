import jwt from 'jsonwebtoken';

const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    res.cookie("jwt", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true, //prevent XSS attack cross site scripting attack
        sameSite: "strict",//csrf attack cross site request forgery attack
        secure: process.env.NODE_ENV === "production" ? true : false,
    });

}

export default generateToken;