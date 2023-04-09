package com.ssafy.mongttang.repository;

import com.ssafy.mongttang.entity.Book;
import com.ssafy.mongttang.entity.BookReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface BookReportRepository  extends JpaRepository<BookReport, Integer> {
    BookReport findBookReportByBookreportBookIdAndBookreportReportUserId(Book book, int userId);
    int countDistinctByBookreportBookId_BookId(int bookId);
    ArrayList<BookReport> findByBookreportBookId(Book book);
}
