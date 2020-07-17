// TODO run "npm init" and "npm install express"
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

const fs = require('fs');
const hosp_data = require('./data/hospitals1-2499_geocode.json');

const zip_data = require('./data/zips.json');


const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


function calcDist(lat1,lon1,lat2,lon2){

  const R = 6371e3; // metres
  const φ1 = lat1 * Math.PI/180; // φ, λ in radians
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  const d = R * c; // in metres

  return d*0.000621371;
}
// const mongoose = require('mongoose');
// const db = mongoose.connection;
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology' , true);
// mongoose.set('useFindAndModify', false);
//
// db.on('error', console.error); // log any errors that occur
//
// // bind a function to perform when the database has been opened
// db.once('open', function() {
//   // perform any queries here, more on this later
//   console.log("Connected to DB!");
// });

// process is a global object referring to the system process running this
// code, when you press CTRL-C to stop Node, this closes the connection
// process.on('SIGINT', function() {
//    mongoose.connection.close(function () {
//        console.log('DB connection closed by Node process ending');
//        process.exit(0);
//    });
// });

// const standingsSchema = new mongoose.Schema({
//     teamName: String,
//     week1Score: Number,
//     week2Score: Number,
//     week3Score: Number,
//     week4Score: Number,
//     week5Score: Number,
//     week6Score: Number,
//     week7Score: Number,
//     week8Score: Number,
//     week9Score: Number,
//     week10Score: Number,
//     week11Score: Number,
//     week12Score: Number
//
//
//
//
//
//   });
//
//
//   standingsSchema.index({'$**': 'text'});
//
//
//
//
// // you will replace this with your on url and fill in your password in the next step
// const url = 'mongodb+srv://cwong12:Wayland123!@cluster0-g7uzk.mongodb.net/test?retryWrites=true'
// mongoose.connect(url, {useArlParser: true});
//
//
//
// const Standings = mongoose.model('Standings', standingsSchema);
//
// const doc = new Standings();
//
//
//use to clear db

// Markers.deleteMany({}, function(err){
//   if (err) return console.error(err);
// })


//
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/results', async function(request,response){
  console.log("server Side success");
  var lookZip = request.body.zipCode;
  var radius = request.body.rad;
  var userLoc = zip_data[lookZip];

  var matches = {}
  for (let hosp in hosp_data){
    var curHosp = hosp_data[hosp]


    //TODO error handle wrong zip code
    if (userLoc !== undefined){

      var dist = calcDist(userLoc["latitude"], userLoc["longitude"],curHosp["Latitude"], curHosp["Longitude"]) ;
      if (dist <= radius){
        matches[hosp] = curHosp
      }
    }

  }
  console.log(radius);
  console.log(matches);


  response.json(matches);
});
//
//
// app.get('/standings', async function(request,response){
//     console.log("dbside");
//     markers = []
//     var results;
//
//     const doc = await Standings.find()
//       .then(products => results = products)
//       .catch(e => console.error(e));
//     response.json(results);
// });
//
// app.post('/newEntry', async function(request, response){
//   console.log(request.body.bodyJSON);
//     let newTeamName = request.body.bodyJSON.teamName;
//     let newWeekNum = request.body.bodyJSON.weekNum;
//     let newWeekScore = request.body.bodyJSON.score;
//
//     console.log(newTeamName);
//     console.log("exists");
//     const update = {};
//     update["week" + newWeekNum + "Score"] = newWeekScore;
//     const doc = await Standings.findOneAndUpdate({teamName: newTeamName}, update, {upsert: true});
//
//
//
// });



server.listen(8080, function(){
    console.log('- Server listening on port 8080');
});
