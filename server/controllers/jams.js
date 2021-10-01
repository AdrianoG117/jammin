const Jam = require('../Models/jams');

exports.getJams = async (req, res) => {
  try {
    const city = req.body.city;
    const result = await Jam.find({ city }); //retruns array of jams models
    //sort array by jams date
    let sortedResult = result.sort(function (a, b) {
      return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
    });
    res.status(200);
    //return sorted jams array
    res.json(sortedResult);
  } catch (e) {
    res.status(500);
  }
};

exports.postJam = async (req, res) => {
  try {
    const result = await Jam.create(req.body);
    res.status(201);
    res.json(result);
  } catch (e) {
    res.status(500);
  }
};

exports.postMsg = async (req, res) => {
  try {
    const newMsg = req.body;
    const { id } = req.params;
    let result = await Jam.findOneAndUpdate(
      { _id: id },
      { $push: { messages: newMsg } }
    );
    result = await Jam.find({ _id: id });
    res.json(result[0].messages);
    res.status(201);
  } catch (e) {
    res.status(500);
  }
};

exports.getEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Jam.find({ _id: id });
    res.json(result);
    res.status(200);
  } catch (error) {
    res.status(500);
  }
};

exports.addParticipant = async (req, res) => {
  try {
    const { id } = req.body;
    let result = await Jam.findOneAndUpdate(
      { _id: id },
      { $inc: { numOfParticipants: 1 } },
      { new: true }
    );
    res.status(201);
    res.json(result);
  } catch (error) {
    res.status(500);
  }
};

exports.removeParticipant = async (req, res) => {
  try {
    const { id } = req.body;
    let result = await Jam.findOneAndUpdate(
      { _id: id },
      { $inc: { numOfParticipants: -1 } },
      { new: true }
    );
    res.status(201);
    res.json(result);
  } catch (error) {
    res.status(500);
  }
};
