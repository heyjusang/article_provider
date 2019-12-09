const Article = require('../models/article');
const Ad = require('../models/ad');
const sessionController = require('./sessionController');

exports.getNext = function (req, res) {
    let session = req.session;

    if (isAdTime(session)) {
        getNextAd(session, res);
    }
    else {
        getNextArticle(session, res);
    }
}

function isAdTime(session) {
    let latest_ad_time = sessionController.getLatestAdTime(session);
    let read_count = sessionController.getReadCount(session);
    return Date.now() - latest_ad_time >= process.env.AD_INTERVAL_TIME || read_count >= process.env.AD_INTERVAL_COUNT;
}

function getNextAd(session, res) {
    let latest_ad_id = sessionController.getLatestAdId(session);

    Ad.findPrevById(latest_ad_id)
        .then((ads) => successOnGetNextAd(ads, session, res))
        .catch((err) => errorOnGetNext(err, res));
}

function getNextArticle(session, res) {
    let latest_article_id = sessionController.getLatestArticleId(session);

    Article.findPrevById(latest_article_id)
        .then((articles) => successOnGetNextArticle(articles, session, res))
        .catch((err) => errorOnGetNext(err, res));
}

function successOnGetNextAd(ads, session, res) {
    if (!ads || ads.length < 1) {
        sessionController.setLatestAdId(session, undefined);
        getNextAd(session, res);
    }
    else {
        sessionController.setLatestAdTime(session, Date.now());
        sessionController.setReadCount(session, 0);
        sessionController.setLatestAdId(session, ads[0]._id);
        successOnGetNext(ads[0], res);
    }
}

function successOnGetNextArticle(articles, session ,res) {
    if (!articles || articles.length < 1) {
        sessionController.setLatestArticleId(session, undefined);
        getNextArticle(session, res);
    }
    else {
        sessionController.setLatestArticleId(session, articles[0]._id);
        sessionController.setReadCount(session, sessionController.getReadCount(session) + 1);
        successOnGetNext(articles[0], res);
    }
}

function successOnGetNext(result, res) {
    res.json({article: result});
}

function errorOnGetNext(err, res) {
    res.status(500).json({err: err});
}