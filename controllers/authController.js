const secret = require("../config/auth");
const User = require("../models/userModel");
const Role = require("../models/roleModel");

const { sign } = require("jsonwebtoken");
const { hashSync, compareSync } = require("bcryptjs");

const signUp = async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashSync(req.body.password, 8),
    });

    await user.save();

    if (req.body.roles) {
      const roles = await Role.find({ name: { $in: req.body.roles } });

      user.roles = roles.map((role) => role._id);
      await user.save();

      res.send({ message: "User was registered successfully!" });
    } else {
      const role = await Role.findOne({ name: "user" });

      user.roles = [role._id];
      await user.save();

      res.send({ message: "User was registered successfully!" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const signIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
      .populate("roles");

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    const token = sign({ id: user.id }, secret, {
      algorithm: 'HS256',
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

    const authorities = user.roles.map((role) => "ROLE_" + role.name.toUpperCase());

    req.session = { token }; // Fix: Assign the token to the session object

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
      token: token,
    });

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const signOut = (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { signUp, signIn, signOut };
