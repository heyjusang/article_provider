const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Article = require('../models/article');
const Ad = require('../models/ad');

dotenv.config();

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

mongoose.connection.once('open', function() {
    for (let i = 0; i < 100; i++) {
        Article.collection.insertOne({
            title: "Article Title " + i,
            content: "Article Content " + i
        });
    }

    for (let i = 0; i < 10; i++) {
        Ad.collection.insertOne({
            title: "Ad Title " + i,
            content: "Ad Content " + i
        });
    }

    mongoose.disconnect();
});

mongoose.connect(process.env.MONGO_URI);