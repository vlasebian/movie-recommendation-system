const mongoose = require('mongoose');

async function initDatabaseConn() {
    try {
        mongoose.set('bufferCommands', false); // debugging only
        mongoose.set('useCreateIndex', true);

        await mongoose.connect(process.env.MONGODB_URI, 
            { 
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
    } catch (error) {
        console.log(error);
    }
};

module.exports = initDatabaseConn;
