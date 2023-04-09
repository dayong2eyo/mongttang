package com.ssafy.mongttang.repository;

import com.ssafy.mongttang.entity.Comment;
import com.ssafy.mongttang.entity.CommentLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Integer> {

    CommentLike findByCommentlikeCommentIdAndCommentlikeUserId(Comment comment, int userId);

    int countByCommentlikeCommentId(Comment commentId);
}
