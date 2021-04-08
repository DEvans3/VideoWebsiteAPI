module.exports = app => {
    const video = require("../controllers/video.controller.js");

    // Get all videos 
    app.get("/videos", video.getAll);

    // Get single video
    app.get("/videos/:videoId", video.findVideoById);

    // Get likes/dislikes for video
    app.get("/videos/likes-dislikes/:videoId", video.getLikesDislikes);

    // Create comment
    app.post("/videos/comment", video.createComment);

    // Update comment
    app.put("/videos/comment/:commentId", video.updateComment);

    // Like video
    app.post("/videos/like", video.likeVideo);

    // Dislike video
    app.post("/videos/dislike", video.dislikeVideo);
};


