require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
var path = require('path');
const router = require('./routers/index');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};
start();
