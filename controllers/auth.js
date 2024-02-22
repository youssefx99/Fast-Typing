const jwt = require("jsonwebtoken");
const User = require("./../models/user");

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    token = req.headers.authorization.split(" ")[1];

  // if not token, Error

  const decodedObject = jwt.verify(token, process.env.SECRET);
  const id = decodedObject.id;

  const user = await User.findById(id);
  // if not found user, Error

  req.user = { id: user._id, name: user.name, email: user.email };

  next();
};

// In header
// Bearer 7362487236879387267632178
