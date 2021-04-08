const sql = require("./db.js");

// constructor
const Video = function (video) {
    this.video = video.video;
    this.videoId = video.videoId;
    this.user = video.user;
    this.userId = video.userId;
    this.commentId = video.commentId;
    this.comment = video.comment;
    this.ratingId = video.ratingId;
    this.like = video.like;
    this.dislike = video.dislike;
};


// Query to select all videos from database
Video.getAll = result => {
    sql.query("SELECT * FROM videos", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("videos: ", res);
        result(null, res);
    });
}

// Query to select specfic video from database
Video.findVideoById = (videoId, result) => {
    sql.query('SELECT * FROM videos WHERE video_id = ?', [videoId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found video: ", res[0].title);
            result(null, res[0]);
            return;
        }

        // video not found
        result({ kind: "not_found" }, null);
    });
};

// Query to insert comment into database
Video.createComment = (video, result) => {
    var sqlProcedure = "INSERT INTO comments(video_id, user_id, user_comment) VALUES(?, ?, ?);";
    sql.query(sqlProcedure, [video.videoId, video.userId, video.comment], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created comment: ", { id: res.videoId, ...video });
        result(null, { id: res.videoId, ...video });
    });
};

// Query to update comment in database
Video.updateComment = (id, video, result) => {
    var sqlProcedure = "UPDATE comments SET user_comment = ? WHERE comment_id = ?";
    sql.query(sqlProcedure, [video.comment, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // comment not found
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated comment: ", { id: id, ...video });
            result(null, { id: id, ...video });
        });
};

// Query to like video
Video.likeVideo = (video, result) => {
    var sqlProcedure = "SET @RatingID = ?; SET @VideoID = ?; SET @UserID = ?; SET @Like = ?; SET @Dislike = ?; " +
        "CALL VideoRating(@RatingID, @VideoID, @UserID, @Like, @Dislike)";
    sql.query(sqlProcedure, [video.ratingId, video.videoId, video.userId, video.like, video.dislike],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                //no change
                result({ kind: "no_change" }, null);
                return;
            }

            console.log("updated like/dislike for video: ", { id: res.videoId, ...video });
            result(null, { id: res.videoId, ...video });
        });
};

// Query to dislike video
Video.dislikeVideo = (video, result) => {
    var sqlProcedure = "SET @RatingID = ?; SET @VideoID = ?; SET @UserID = ?; SET @Like = ? SET @Dislike = ?;" +
        "CALL VideoRating(@RatingID, @VideoID, @UserID, @Like, @Dislike)";
    sql.query(sqlProcedure, [video.ratingId, video.videoId, video.userId, video.like, video.dislike],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                //no change
                result({ kind: "no_change" }, null);
                return;
            }

            console.log("updated likes/dislikes total for video: ", { id: res.videoId, ...video });
            result(null, { id: res.videoId, ...video });
        }
    );
};

// Get likes and dislikes for video
Video.getLikesDislikes = (video, result) => {
    sql.query('SELECT likes, dislikes FROM videos WHERE video_id = ?', [videoId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found video: ", res[0].title);
            console.log("likes for video: ", res[0].like);
            console.log("dislikes for video: ", res[0].dislike);
            result(null, res[0]);
            return;
        }

        // video not found
        result({ kind: "not_found" }, null);
    });
};

module.exports = Video;