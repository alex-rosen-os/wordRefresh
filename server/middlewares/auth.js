import jwt from "jsonwebtoken";
const secretKey = "secret";


function authenticateToken(req, res, next) {
    const token = req.header("authorization");
    console.log(token);
    if (!token) {
      return res
        .status(401)
        .json({ message: "unaauthorized: no token provided" });
    }
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "forbidden: invalid token" });
      }
      req.user = user;
      next();
    });
  }

  export default authenticateToken;