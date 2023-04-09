package com.ssafy.mongttang.service;


import com.ssafy.mongttang.dto.ReqReportBookDto;
import com.ssafy.mongttang.dto.ReqReportCommentDto;
import com.ssafy.mongttang.dto.ResponseReportBookInfoDto;
import com.ssafy.mongttang.dto.ResponseReportCommentInfoDto;
import com.ssafy.mongttang.entity.Book;
import com.ssafy.mongttang.entity.BookReport;
import com.ssafy.mongttang.entity.Comment;
import com.ssafy.mongttang.entity.CommentReport;
import com.ssafy.mongttang.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final CommentRepository commentRepository;
    private final BookRepository bookRepository;
    private final CommentReportRepository commentReportRepository;
    private final BookReportRepository bookReportRepository;
    private final UserRepository userRepository;

    public int reportComment(int commentId, int userId, ReqReportCommentDto reqReportCommentDto) {
        Comment comment = commentRepository.findCommentByCommentId(commentId);
        if(comment == null) return 0;

        CommentReport commentReport = commentReportRepository.findCommentReportByCommentreportCommentId_CommentIdAndCommentreportReportUserId(comment.getCommentId(), userId);
        if(commentReport != null) return - 1;

        if(comment.getCommentUserId().getUserId() == userId) return 0;
        commentReportRepository.save(reqReportCommentDto.toEntity(comment, userId));

        int cnt = commentReportRepository.countDistinctByCommentreportCommentId_CommentId(commentId);
        if(cnt % 5 == 0){
            comment.changeToDisabled();
            commentRepository.save(comment);
        }
        return 1;
    }

    public List<ResponseReportCommentInfoDto> getReportComments() {
        return commentReportRepository.findAll().stream().map(commentReport
                -> new ResponseReportCommentInfoDto(commentReport, userRepository.findByUserId(commentReport.getCommentreportReportUserId()))).collect(Collectors.toList());
    }

    @Transactional
    public int reportBook(int bookId, int userId, ReqReportBookDto reqReportBookDto) {
        Book book = bookRepository.findByBookId(bookId);
        if(book == null) return 0;

        BookReport bookReport = bookReportRepository.findBookReportByBookreportBookIdAndBookreportReportUserId(book, userId);
        if(bookReport != null) return - 1;

        if(book.getBookUserId().getUserId() == userId) return 0;

        bookReportRepository.save(reqReportBookDto.toEntity(book, userId));

        int cnt = bookReportRepository.countDistinctByBookreportBookId_BookId(bookId);
        if(cnt % 5 == 0){
            book.changeToDisabled();
            bookRepository.save(book);
        }
        return 1;
    }

    public List<ResponseReportBookInfoDto> getReportBooks() {
        return bookReportRepository.findAll().stream().map(bookReport
                -> new ResponseReportBookInfoDto(bookReport, userRepository.findByUserId(bookReport.getBookreportReportUserId()))).collect(Collectors.toList());
    }
}
