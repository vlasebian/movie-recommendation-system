const mongoose = require('mongoose');

MONGODB_URI = 'mongodb://user:pass@database:27017/recommendr'

async function initDatabaseConn() {
    try {
        mongoose.set('bufferCommands', false); // debugging only
        mongoose.set('useCreateIndex', true);

        await mongoose.connect(MONGODB_URI, 
            { 
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
    } catch (error) {
        console.log(error);
    }
};

module.exports = initDatabaseConn;
