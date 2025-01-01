import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
    try {
        const { id, firstName, lastName, imageUrl } = req.body;

        // check if user already exists
        if (!id) {
            return res.status(400).json({ success: false, message: "ClerkId is required" });
        }
        const user = await User.findOne({ clerkId: id });

        if (!user) {
            try {
                await User.create({
                    clerkId: id,
                    fullName: `${firstName || ""} ${lastName || ""}`.trim(),
                    imageUrl,
                });
                console.log("User created successfully");
            } catch (err) {
                console.error("Error creating user:", err);
            }
        }


        res.status(200).json({ success: true });
    } catch (error) {
        console.log("Error in auth callback", error);
        next(error);
    }
};