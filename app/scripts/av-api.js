(function(global) {
    AV.initialize("sn2gm4yegzgd2rdbew8t5a6egvi7z4c94xi857952q23ty08", "sujpugku5trg2ikg0ms71ve6oe4t35h0fpj0qlj9269xb74r");
    
    var GameScore = AV.Object.extend("GameScore");
    
    global.avAddGameScore = function(score, p1Name, p2Name, callback) {
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

    global.avGetGameScores = function(callback) {
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

}(this));
