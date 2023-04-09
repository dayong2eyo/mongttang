package com.ssafy.mongttang.entity;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "commentreport")
public class CommentReport extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int commentreportId;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "commentreport_comment_id")
    private Comment commentreportCommentId;

    @NotNull
    private String commentreportContent;

    @NotNull
    private int commentreportReportUserId;

    @NotNull
    private String commentreportCategory;

    @Builder
    public CommentReport(Comment commentreportCommentId, String commentreportContent, int commentreportReportUserId, String commentreportCategory) {
        this.commentreportCommentId = commentreportCommentId;
        this.commentreportContent = commentreportContent;
        this.commentreportReportUserId = commentreportReportUserId;
        this.commentreportCategory = commentreportCategory;
    }
}
