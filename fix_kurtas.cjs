const fs = require('fs');
const path = 'c:/Users/Admin/Desktop/faishon/src/data/products.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Filter out the 5 kurtas I added previously
const filteredData = data.filter(p => !p.id.startsWith('kur-10'));

const images = [

];

const newKurtas = images.map((imgUrl, index) => {
  return {
    
  };
});

filteredData.push(...newKurtas);

fs.writeFileSync(path, JSON.stringify(filteredData, null, 2), 'utf8');
console.log("Fixed kurta products successfully.");
