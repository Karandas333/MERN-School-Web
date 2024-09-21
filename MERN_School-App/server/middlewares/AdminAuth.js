const jwt = require('jsonwebtoken');

module.exports.AdminAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_KEY);
      req.adminId = userData.admin_id;
      return next();
    } catch (error) {
      // Token is invalid
      return res.status(401).json({ status: false, message: 'Invalid token' });
    }
  }

  // No token provided
  return next()
}
