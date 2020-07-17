const json_data = require('./data/us-zip-code-latitude-and-longitude.json');
const fs = require('fs');

console.log(json_data);
console.log("success");

jsonData = {}
for (let i in json_data){
  curData = json_data[i]
  zip = curData['fields']['zip']
  lat = curData['fields']['latitude']
  long = curData['fields']['longitude']
  city = curData['fields']['city']


  // console.log(curData);
  newData = {"zip":zip, "latitude":lat, "longitude":long, "city": city}
  otherData = {"latitude":lat, "longitude":long, "city": city}
  console.log(newData);
  jsonData[zip] = otherData
  // console.log(curCity);
}
console.log(jsonData);

var jsonDataString = JSON.stringify(jsonData);
fs.writeFile("zips.json", jsonDataString, function(err) {
    if (err) {
        console.log(err);
    }
});
