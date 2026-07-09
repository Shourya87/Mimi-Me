const jwt = require("jsonwebtoken");


const generateToken = (id, role) => {
    return jwt.sign(
        { 
            id, 
            role,
         },                     // Payload
        process.env.JWT_SECRET, // Secret Key
        { 
            expiresIn: "1d"
        },                      // Expiry Time
    );
};

module.exports = generateToken;