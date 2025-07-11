require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require('path');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
  next();
});

app.use(express.json());


const userRoutes = require('./server/routes/user');
const subRoutes = require('./server/routes/subscription');
const paymentRoutes = require('./server/routes/payment');

mongoose.connect(process.env.MONGO_URI)
  .then(console.log("DB Connected!!"))
  .catch(error => console.log(error));


app.use(express.static(__dirname + "/public"));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public', 'index.html')));

app.use('/user', userRoutes);
app.use('/subscription', subRoutes); 
app.use('/payment', paymentRoutes);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));