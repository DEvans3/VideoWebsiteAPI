CREATE DEFINER=`root`@`localhost` PROCEDURE `VideoRating`(
IN _RatingID INT,
IN _VideoID INT,
IN _UserID INT,
IN _Like INT,
IN _Dislike INT
)
BEGIN
	IF _RatingID = 0 THEN
		IF _Like = 1 THEN
		INSERT INTO likes_dislikes(video_id, user_id, likes, dislikes)
        VALUES (_VideoID, _UserID, _Like, _Dislike);
        END IF;
        
        IF _Dislike = 1 THEN
		INSERT INTO likes_dislikes(video_id, user_id, likes, dislikes)
        VALUES (_VideoID, _UserID, _Likes, _Dislike);
        END IF;
        SET _RatingID = LAST_INSERT_ID();
	ELSE
		UPDATE likes_dislikes
        SET likes = likes + _Like, dislikes = dislikes + _Dislike
        WHERE rating_id = _RatingID;
	END IF;
    
	UPDATE videos
    INNER JOIN likes_dislikes ON videos.video_id = likes_dislikes.video_id
	SET videos.likes = likes_dislikes.likes, videos.dislikes = likes_dislikes.dislikes
    WHERE videos.video_id = _VideoID;
    
END