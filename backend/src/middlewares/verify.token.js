import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) return res.status(401).json({ message: "You are not authenticated" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" })
    }
};



export default verifyToken;