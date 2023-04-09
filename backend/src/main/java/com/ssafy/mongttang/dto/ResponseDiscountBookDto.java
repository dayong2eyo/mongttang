package com.ssafy.mongttang.dto;

import com.ssafy.mongttang.entity.Book;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ResponseDiscountBookDto {
    private int bookId;
    private String bookTitle;
    private LocalDateTime endDate;

    private String coverImg;
    public ResponseDiscountBookDto(Book book, LocalDateTime endDate, String coverImg) {
        this.bookId = book.getBookId();
        this.bookTitle = book.getBookTitle();
        this.endDate = endDate;
        this.coverImg = "http://dd93ub3tw0bvd.cloudfront.net/" + coverImg;
    }
}
