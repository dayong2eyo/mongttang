package com.ssafy.mongttang.repository;


import com.ssafy.mongttang.entity.CommentReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentReportRepository extends JpaRepository<CommentReport, Integer> {
    CommentReport findCommentReportByCommentreportCommentId_CommentIdAndCommentreportReportUserId(int commentId, int userId);
    int countDistinctByCommentreportCommentId_CommentId(int commentId);

}
