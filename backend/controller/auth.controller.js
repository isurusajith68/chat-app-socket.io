import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            await generateToken(user._id, res);
            res.status(200).json({
                userId: user._id,
                username: user.username,
                email: user.email,
                profilePic: user.profilePic,
                gender: user.gender,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            });
        } else {
            res.status(400).json({ error: "Invalid email or password" });
        }


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const registerUser = async (req, res) => {
    try {
        const { username, email, password, confirmPassword, gender } =
            req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const existingUserName = await User.findOne({ username });
        const existingUserEmail = await User.findOne({ email });

        if (existingUserName) {
            return res.status(400).json({ error: "Username already exists" });
        }

        if (existingUserEmail) {
            return res.status(400).json({ error: "Email already exists" });
        }


        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const generatedProfilePicBoy = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const generatedProfilePicGirl = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            username,
            email,
            password: passwordHash,
            profilePic: gender === "male" ? generatedProfilePicBoy : generatedProfilePicGirl,
            gender,
        });

        if (newUser) {

            await generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                userId: newUser._id,
                username: newUser.username,
                email: newUser.email,
                profilePic: newUser.profilePic,
                gender: newUser.gender,
                createdAt: newUser.createdAt,
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const logOut = (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ message: "Logged out" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
