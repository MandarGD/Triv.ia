const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");

const createToken = (userID) => (
    jwt.sign(
        { userID, date: Date.now()},
        keys.key,
        {expiresIn: "1h"}
    )
)

const validate = (req, res, next) => {
    try {        
        if(!requires_auth(req)) return next();
    
        // Check for token
        const token = req.headers.token;
        if(!token) return res.status(400).json({
            message: "Missing token."
        })

        // Refresh token
        const decoded = jwt.verify(token, keys.key);
        const newToken = createToken(decoded.userID);

        req.userID = decoded.userID;
        res.append('token', newToken);
        next();        
    } catch(error) {
        return res.status(400).json({message: error.message})
    }
}

const requires_auth = (req) => {
    const query = req.url.toString()
    if(!query.includes('api')) return false
    return !(query.includes('login') || query.includes('signup'))
}

module.exports = {
    createToken,
    validate
}