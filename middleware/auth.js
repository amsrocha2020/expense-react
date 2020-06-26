const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res
        .status(401)
        .json({ msg: "No authentication token, authorization denied!" });
    }
    
    // Comparasion token with token secret
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
        return res
            .status(401)
            .json({ msg: "Token verification failed, authorization denied!" });
    }

    // verified.id => { id: '5ef22e614a5ac0264334d4c1', iat: 1593160875 }
    req.user = verified.id;
    next();

  } catch (err) {
      res.status(500).json({msg: err.message});
  }
};

module.exports = auth;