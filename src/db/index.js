const mongoose = require('mongoose');
const environment = require('../config/environment');

mongoose.connect(environment.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;
