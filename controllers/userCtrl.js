const Users = require("../models/userModel");
const bcrypt = require("bcrypt");

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await Users.findOne({ email });

      if (user)
        return res
          .status(400)
          .json({ msg: "typed email already exist, use another one" });
      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "passoword must be atleast 6 digit long" });

      // Password encryption
      const passwordHash = await bcrypt.hash(password, 10);

      //create newuser
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
      });

      // save in mongodb
      await newUser.save();

      res.json({ msg: "user registered" });
    } catch (err) {
      return res.status(500).json({ mgs: err.message });
    }
  },
};

module.exports = userCtrl;
