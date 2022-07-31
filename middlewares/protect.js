const jwt = require("jsonwebtoken");
const JWT_SECRET = "CS587";

module.exports.protect = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    console.log(authorization, "this is inside !authoziration ");
    return res
      .status(401)
      .json({ success: false, message: "Invalid Authorization" });
  } else {
    const token = authorization.split(" ")[1];

    console.log(token, "token value");
    const decoded = jwt.verify(token, JWT_SECRET);
    req.token = decoded;
    console.log(req.token, "this is req.token");
    console.log(req.authorization, "this is req.authorization");
    return next();
  }
};
