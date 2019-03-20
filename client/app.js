document.getElementById('textSubmit').addEventListener('click', function(e){
  let json = document.getElementById('jsonData').value;
  fetch('/',{
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: json
  }).then(resp =>resp.text())
  .then(csv => renderCSV(csv));
  document.getElementById('jsonData').value = '';
});

document.getElementById('fileSubmit').addEventListener('click',function(e){
  let file = document.getElementById('jsonFile').files;
  if(file.length !== 0){
    file = file[0];
    fetch('/',{
      method: 'POST',
      body: file,
    }).then(res => res.text())
    .then(csv => renderCSV(csv));
  } else{
    alert('No file selected');
  }
})
//formats CSV file into html table 
var renderCSV = (csv) => {
  csv = csv.split('\r\n').map(record=>record.split(','));
  csv = csv.slice(0,csv.length-1);
  let table = document.getElementById('csvTable');
  table.innerHTML = '';
  csv.forEach(record=>{
    let row = document.createElement('tr');
    record.forEach(column=>{
      let col = document.createElement('th');
      col.innerHTML = column;
      row.appendChild(col);
    });
    table.appendChild(row);
  });
}