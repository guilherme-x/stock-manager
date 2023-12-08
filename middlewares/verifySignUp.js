const Role = require("../models/roleModel");
const User = require("../models/userModel");

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Username
    const user = await User.findOne({ email: req.body.email }).exec();
    if (user) {
      return res.status(400).send({ message: "Failed! Username is already in use!" });
    }

    // Email
    const userEmail = await User.findOne({ email: req.body.email }).exec();
    if (userEmail) {
      return res.status(400).send({ message: "Failed! Email is already in use!" });
    }

    next();
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!Role.includes(req.body.roles[i])) {
        return res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;