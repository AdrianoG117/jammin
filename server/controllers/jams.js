const Jam = require('../Models/jams');

exports.getJams = async (req, res) => {
  console.log('getJams function running')
  try {
    const location = req.body.location;
    console.log(location);
    const result =  await Jam.find({location});
    console.log(result);
    res.json(result);
  } catch (e) {
    res.status(500)
  }
};

exports.postJam = async (req, res) => {
  try {
    console.log(req.body)
    const result = await Jam.create(req.body);
    res.status(201);
    res.json(result);
  } catch(e) {
    res.status(500)
  }
};

