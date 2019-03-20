const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
// var textBody = require("body")

const app = express();

app.use(bodyParser.json());
app.use(express.static('client'));

app.listen(3000);

app.post('/', (req, res)=>{
  let csv = jsonCSV(JSON.stringify(req.body))
  fs.writeFile(__dirname + '/client/' + 'csv.csv', csv, (err, data) =>{
    res.send(csv);
  })
});

var jsonCSV = (string) =>{
  let jsonData = JSON.parse(string);
  let attributes = {};
  let records = [];
  var parseData = (obj) => {
    for(let key in obj){
      if(key !== 'children'){
        attributes[key] = true;
      }
    }
    records.push(obj)
    if(obj.children){
      for(let child of obj.children){
        parseData(child);
      }
    }
  }
  if(Array.isArray(jsonData)){
    for(let obj of jsonData) parseData(obj)
  } else{
    parseData(jsonData);
  }
  let increment = 0;
  attributes = Object.keys(attributes);
  csv = attributes.reduce((acc, attribute) => {
    return acc += `,${attribute}`;
  }, 'id') + '\r\n';
  records.forEach(record => {
    let str = String(increment++);
    attributes.forEach(attribute => {
      str += record[attribute] ? `,${record[attribute]}` : `,null`;
    })
    csv += `${str}\r\n`;
  })
  return csv;
}
