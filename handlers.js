const db = require("./db.js")
const shortid = require('shortid');

const errorMessageUser = {error: "User name already in use, please pick another."}

// create user only if unique - post
function createUser(req, res){
  console.log(req.body.username);
  let options = {upsert: true, new: true, rawResult: true, setDefaultsOnInsert: true}
  db.User.findOneAndUpdate({name: req.body.username},{name: req.body.username}, options, function(err, user){
    if (err) {
      console.log(err);
      res.json(err)
    } else {
      console.log(user.value);
      const errorMessage = 
      !user.lastErrorObject.updatedExisting ? res.json(user.value) : res.json(errorMessageUser)
    }
  })
}

// find all users - get
function getUsers(req, res){
  db.User.find({}, '-__v', function(err, data){
    if (err) {
      console.log(err);
      res.json(err);
    } else{ 
      res.json(data);
    }
  })
}

// create exercise - post
function createExercise(req, res){
  if (req.body.date == "") delete req.body.date;
  console.log(req.body)
  let exercise = new db.Exercise(req.body);
  exercise.save(function(err, newExercise){
    if (err) {
      console.log(err)
      err.message ? res.json(err.message): res.json(err);
    } else {
      res.json(newExercise);
    }
  })
}

// find exercises - get
function getExercise(req, res){
  console.log(req.query)
  let query = db.Exercise.find({userId: req.query.userId })
  .sort({Date: 'asc'})
  .select('-__v')
  if (req.query.limit) query.limit(req.query.limit);
  if (req.query.from) query.gte({date: req.query.from});
  if (req.query.to) query.lte({date: req.query.to});
  query.exec(function(err, exerciseList){
    if (err) return console.log(err);
    res.json(exerciseList)
  })
}

exports.createUser = createUser
exports.getUsers = getUsers
exports.createExercise = createExercise
exports.getExercise = getExercise