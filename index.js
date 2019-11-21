'use strict'
require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3000;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

mongoose.connect(process.env.CONNECTION_STRING_MDB, { useUnifiedTopology: true })
    .then(() => {
        console.log('bd connected');
        app.listen(PORT, () => {
            console.log('server running');
        })
    })