package com.ssafy.mongttang.dto;

import com.ssafy.mongttang.entity.Comment;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ResponseCommentDto {
    private int commentId;
    private int commentUserId;
    private String commentUserNickname;
    private String userProfileImg;
    private String commentContent;
    private int numOfLike;
    private boolean isLiked;
    private boolean isReported;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;

    public ResponseCommentDto(Comment comment, int numOfLike, boolean isLiked, boolean isReported) {
        this.commentId = comment.getCommentId();
        this.commentUserId = comment.getCommentUserId().getUserId();
        this.commentUserNickname = comment.getCommentUserId().getUserNickname();
        this.userProfileImg = comment.getCommentUserId().getUserProfileImg();
        if(!comment.getCommentUserId().getUserProfileImg().equals("defaultImg")){
            this.userProfileImg = "http://dd93ub3tw0bvd.cloudfront.net/" + comment.getCommentUserId().getUserProfileImg();
        }
        this.commentContent = comment.getCommentContent();
        this.numOfLike = numOfLike;
        this.isLiked = isLiked;
        this.isReported = isReported;
        this.createdTime = comment.getCreatedTime();
        this.updatedTime = comment.getUpdatedTime();
    }
}
