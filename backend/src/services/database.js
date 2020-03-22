const config = require('../config');
const mongoose = require('mongoose');

async function initDatabaseConn() {
    try {
        mongoose.set('bufferCommands', false); // debugging only
        mongoose.set('useCreateIndex', true);

        await mongoose.connect(config.databaseURI, 
            { 
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
    } catch (error) {
        console.log(error);
    }
};

module.exports = initDatabaseConn;