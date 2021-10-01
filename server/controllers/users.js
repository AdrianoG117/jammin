const Jam = require('../Models/jams');
const User = require('../models/users');
const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let result = await User.findOne({ email: email });
    res.status(200);
    res.json(result);
  } catch (error) {
    res.status(500);
  }
};

exports.register = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201);
    res.json(newUser);
  } catch (error) {
    res.status(500);
  }
};
//camel case name
exports.addjam = async (req, res) => {
  try {
    const { id, jamId } = req.body;
    const jam = await Jam.findOne({ _id: jamId });
    await User.findOneAndUpdate({ _id: id }, { $push: { comingEvents: jam } });
    res.status(201);
    res.end();
  } catch (error) {
    res.status(500);
  }
};
// not functional no method of removing a jam
exports.removejam = async (req, res) => {
  try {
    const { id, jamId } = req.body;
    const objJamId = mongoose.Types.ObjectId(jamId);
    //updated variable is not used
    const updated = await User.findOneAndUpdate(
      { _id: id },
      {
        $pull: {
          comingEvents: {
            _id: objJamId,
          },
        },
      },
      { new: true }
    );
    res.status(201);
    res.end();
  } catch (error) {
    res.status(500);
  }
};
