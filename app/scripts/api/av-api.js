(function(global) {
    AV.initialize("54m07k0qjf66t4wdcnsgpcm20zmm2i4wg5n9e6j0hw4krmwy", "8oxlwuuwgrf9pq7iyuv6ncitm53hfxkprtn6cnh43l38gszg");

    var GameScore = AV.Object.extend("GameScore");

    api = global.api || {}

    api.addGameScore = function(score, p1Name, p2Name, callback) {
        var gameScore = new GameScore();
        gameScore.set("score", score);
        gameScore.set("p1Name", p1Name);
        gameScore.set("p2Name", p2Name);

        gameScore.save(null, {
            success: function(gameScore) {
                callback(null, gameScore);
            },
            error: function(gameScore, err) {
                console.warn('Failed to create new object, with error code: ' + error.description);
                callback(err, gameScore)
            }
        });
    };

    api.getGameScores = function(callback) {
        var query = new AV.Query(GameScore);
        query.descending("score");
        query.limit(10);
        query.find({
            success: function(results) {
                callback(null, results);
            },
            error: function(error) {
                callback(error);
            }
        });
    };
    global.av = api
}(this));
