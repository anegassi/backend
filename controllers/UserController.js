const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
//const { JWT_SECRET } = require("../config.json");
const JWT_SECRET = "CS587";

exports.signup = async (req, res) => {
  //console.log(req.body);
  const plainPassword = req.body.password;
  const fullName = req.body.fullname.toLowerCase();
  const exist = await User.findOne({ email: req.body.email }).exec();
  //console.log(exist);

  if (exist) {
    return res.json({ success: false });
  } else {
    const HashPassword = await bcrypt.hash(plainPassword, 10);
    const result = await User.create({
      ...req.body,
      password: HashPassword,
      fullname: fullName,
    });
    res.json({ success: true, data: result });
  }
};

exports.login = async (req, res) => {
  //console.log(req.body);
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) {
    // const result = await User.updateOne(
    //   { email: req.body.email }
    //   //  { $set: { "location.0": req.body.long, "location.1": req.body.lat } }
    // );
    const user = await User.findOne({ email: req.body.email }).lean();
    console.log(user, " the user");
    const valid = await bcrypt.compare(req.body.password, user.password);
    console.log(valid, "  validthe user");
    if (valid) {
      const token = jwt.sign(
        {
          ...user,
          password: null,
        },
        JWT_SECRET
      );
      //console.log(token);
      return res.json({ success: true, data: token });
    }
    res.json({ success: false });
  }
  res.json({ success: false });
};

exports.updateUserById = async (req, res) => {
  //   const userId = req.params.user_id;
  //   console.log(req.body);
  //   console.log(userId);
  //   const result = await User.updateOne(
  //     { _id: userId },
  //     { $set: { adoptionRequest: req.body.adoptionRequest } }
  //   );
  //   res.json({ success: true, data: result });
};

exports.getUserById = async (req, res) => {
  //   const result = await User.findOne({ _id: req.params.user_id });
  //   res.json({ success: true, data: result });
};
