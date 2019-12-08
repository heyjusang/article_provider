exports.getLatestArticleId = function(session) {
    return session.latest_article_id;
};

exports.setLatestArticleId = function(session, latest_article_id) {
    session.latest_article_id = latest_article_id;
}

exports.getLatestAdId = function(session) {
    return session.latest_ad_id;
}

exports.setLatestAdId = function(session, latest_ad_id) {
    session.latest_ad_id = latest_ad_id;
}

exports.getLatestAdTime = function(session) {
    if (!session.latest_ad_time) {
        session.latest_ad_time = Date.now();
    }

    return session.latest_ad_time;
}

exports.setLatestAdTime = function(session, latest_ad_time) {
    session.latest_ad_time = latest_ad_time;
}

exports.getReadCount = function(session) {
    if (!session.read_count) {
        session.read_count = 0;
    }

    return session.read_count;
}

exports.setReadCount = function(session, read_count) {
    session.read_count = read_count;
}