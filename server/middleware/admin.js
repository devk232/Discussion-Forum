const { User } = require("../models/user");

module.exports = async function (req, res, next) {
  // 401 unothourized
  // 403 forbidden
  //console.log(req.user);
  if (!req.user.isAdmin) return res.status(403).send("Access Denied");
  next();
};
