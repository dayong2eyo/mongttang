package com.ssafy.mongttang.repository;

import com.ssafy.mongttang.entity.Book;
import com.ssafy.mongttang.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    Comment findCommentByCommentId(int commentId);

    ArrayList<Comment> findByCommentBookId(Book book);

    int countByCommentBookId_BookId(int bookId);
}
