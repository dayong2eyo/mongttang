package com.ssafy.mongttang.dto;

import com.ssafy.mongttang.entity.Comment;
import com.ssafy.mongttang.entity.CommentReport;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReqReportCommentDto {
    @NotBlank(message = "신고 내용은 필수 입력 값입니다.")
    private String reportContent;
    @NotBlank(message = "신고분류는 필수 입력 값입니다.")
    private String reportCategory;

    public CommentReport toEntity(Comment comment, int userId) {
        return CommentReport.builder()
                .commentreportCommentId(comment)
                .commentreportContent(reportContent)
                .commentreportReportUserId(userId)
                .commentreportCategory(reportCategory)
                .build();
    }
}
