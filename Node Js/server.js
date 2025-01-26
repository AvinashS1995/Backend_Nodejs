const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path:'./config.env'})

const app = require('./index');

console.log(process.env);


//Constants Port
const port = process.env.PORT || 8000;

//start servers
app.listen(port, () => {
  console.log("Server is Runnings plz create api");
});