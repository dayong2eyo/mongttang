package com.ssafy.mongttang.dto;

import com.ssafy.mongttang.entity.CommentReport;
import com.ssafy.mongttang.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ResponseReportCommentInfoDto {
    private int commentId;
    private String commentContent;
    private String commentUserNickname;
    private String reportCategory;
    private String reportContent;
    private String reporterNickname;

    private String commentStatus;

    public ResponseReportCommentInfoDto(CommentReport commentReport, User user) {
        this.commentId = commentReport.getCommentreportCommentId().getCommentId();
        this.commentContent = commentReport.getCommentreportCommentId().getCommentContent();
        this.commentUserNickname = commentReport.getCommentreportCommentId().getCommentUserId().getUserNickname();
        this.reportCategory = commentReport.getCommentreportCategory();
        this.reportContent = commentReport.getCommentreportContent();
        this.reporterNickname = user.getUserNickname();
        this.commentStatus = String.valueOf(commentReport.getCommentreportCommentId().getCommentStatus());
    }
}
