// required packages
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var fs = require('fs');

// read the data file
function readData(fileName) {
  let dataRead = fs.readFileSync('./server/data/' + fileName + '.json');
  let infoRead = JSON.parse(dataRead);
  return infoRead;
}

// read the data file
function writeData(info, fileName) {
  const data = JSON.stringify(info);
  fs.writeFileSync('./server/data/' + fileName + '.json', data);
}

// update the data file, I use "name" to be equal to fruit, or animal or color
// to match with the file names
// I assume we always just add 1 to a single item
function combineCounts(name, value) {
  const info = readData(name);
  // will be useful for text entry, since the item typed in might not be in the list
  var found = 0;
  for (var i = 0; i < info.length; i++) {
    if (info[i][name] === value) {
      info[i].count = parseInt(info[i].count) + 1;
      found = 1;
    }
  }
  if (found === 0) {
    info.push({ [name]: value, count: 1 });
  }
  writeData(info, name);
}

// This is the controler per se, with the get/post
module.exports = function (app) {
  // when a user goes to localhost:3000/analysis
  // serve a template (ejs file) which will include the data from the data files
  app.get('/analysis', function (req, res) {
    var color = readData('color');
    var fruit = readData('fruit');
    var animal = readData('animal');
    var temperature = readData('temperature');
    var website = readData('website');
    var rating = readData('rating');
    res.json({ color, fruit, animal, temperature, website, rating });
  });

  // when a user types SUBMIT in localhost:3000/niceSurvey
  // the action.js code will POST, and what is sent in the POST
  // will be recuperated here, parsed and used to update the data files
  app.post('/survey', jsonParser, function (req, res) {
    console.log(req.body);
    var json = req.body;
    for (var key in json) {
      console.log(key + ': ' + json[key]);
      // in the case of checkboxes, the user might check more than one
      if (key === 'website') {
        for (var item in json[key]) {
          combineCounts(key, json[key][item]);
        }
      } else {
        combineCounts(key, json[key]);
      }
    }
    res.status(200).json({
      success: true,
    });
  });
};
