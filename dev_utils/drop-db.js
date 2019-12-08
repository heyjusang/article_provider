const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

mongoose.connection.once('open', function() {
    mongoose.connection.db.dropDatabase(function() {
        console.log(`${mongoose.connection.db.databaseName} database dropped.`);
        mongoose.disconnect();
        });
});

mongoose.connect(process.env.MONGO_URI);