module.exports = function (req, res, next) {
  // 401 unothourized
  // 403 forbidden
  if (!req.user.isAdmin) return req.status(403).send("Access Denied");
  next();
};
