const Video = require("../models/video.model.js");

exports.getAll = (req, res) => {
    Video.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving video"
            });
        else res.send(data);
    });
};

exports.findVideoById = (req, res) => {
    Video.findVideoById(req.params.videoId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Could not find Video with id ${req.params.videoId}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving Video with id " + req.params.videoId
                });
            }
        }
        else 
        res.send(data);
    });
};

exports.createComment = (req, res) => {
    // Validation
    if (res.body) {
        return res.status(400).send({
            message: "Content can not be empty."
        });
    }

    // Create a Video comment
    const video = new Video({
        videoId: req.body.videoId,
        userId: req.body.userId,
        comment: req.body.comment,
    });

    // Save comment in the database
    Video.createComment(video, (err, data) => {
        if (err)
            return res.status(500).send({
                message: err.message || "Some error occurred while creating comment."
            });
        else return res.send(data);
    });
};

exports.updateComment = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Video.updateComment(
    req.params.commentId,
    new Video(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          return res.status(404).send({
            message: `Not found Customer with id ${req.params.commentId}.`
          });
        } else {
          return res.status(500).send({
            message: "Error updating Customer with id " + req.params.commentId
          });
        }
      } else return res.send(data);
    }
  );
};

exports.likeVideo = (req, res) => {
    // Validation
    if (res.body) {
        return res.status(400).send({
            message: "Content can not be empty."
        });
    }

    // Create a Video like
    const video = new Video({
        ratingId: req.body.ratingId,
        videoId: req.body.videoId,
        userId: req.body.userId,
        like: req.body.like,
        dislike: req.body.dislike
    });

    // Save like in the database
    Video.likeVideo(video, (err, data) => {
        if (err)
            return res.status(500).send({
                message: err.message || "Some error occurred while liking comment."
            });
        else return res.send(data);
    });
};

exports.dislikeVideo = (req, res) => {
    // Validation
    if (res.body) {
        return res.status(400).send({
            message: "Content can not be empty."
        });
    }

    // Create a Video dislike
    const video = new Video({
        ratingId: req.body.ratingId,
        videoId: req.body.videoId,
        userId: req.body.userId,
        like: req.body.like,
        dislike: req.body.dislike
    });

    // Save comment in the database
    Video.dislikeVideo(video, (err, data) => {
        if (err)
            return res.status(500).send({
                message: err.message || "Some error occurred while creating comment."
            });
        else return res.send(data);
    });
};

exports.getLikesDislikes = (req, res) => {
    Video.getLikesDislikes(req.params.videoId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Could not find Video with id ${req.params.videoId}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving Video with id " + req.params.videoId
                });
            }
        }
        else 
        res.send(data);
    });
};