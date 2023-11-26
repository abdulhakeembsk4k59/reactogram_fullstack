const express = require('express');
const PORT = 4001;
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const { MONGOBD_URL } = require('./config')

global.__basedir = __dirname;
mongoose.connect(MONGOBD_URL);

mongoose.connection.on('connected', () => {
    console.log("DB connected");
})
mongoose.connection.on('error', (error) => {
    console.log("Some error while connecting to DB");
})

require('./models/user_model');
require('./models/post_model');

app.use(cors());
app.use(express.json());

app.use(require('./routes/user_route'));
app.use(require('./routes/post_route'));
app.use(require('./routes/file_route'));

app.listen(PORT, () => {
    console.log("Server started");
});