const mongoose = require('mongoose');

main()
  .then(() => {
    console.log('Connected to the database');
  }).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://anandmohanbabu1910:c7kWfc0DHXlUvG6s@cluster0.nc4n8.mongodb.net')

}
