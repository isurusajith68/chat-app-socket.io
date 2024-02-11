import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
 res.cookie("jwt", token, {
   path: "/", // Change the path if needed
   maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
   httpOnly: true, // Or false if you want to allow access via JavaScript
   sameSite: "lax", // Or "none" or true if you want different behavior
   secure: false, // Or true if you want to restrict to HTTPS
 });
};

export default generateToken;
