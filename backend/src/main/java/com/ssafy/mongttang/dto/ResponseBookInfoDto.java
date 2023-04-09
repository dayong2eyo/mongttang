package com.ssafy.mongttang.dto;

import com.ssafy.mongttang.entity.Book;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ResponseBookInfoDto {
    private int bookId;
    private String bookTitle;
    private int artistId;
    private String artistNickname;
    private String discountStatus;

    public ResponseBookInfoDto(Book book, String status) {
        this.bookId = book.getBookId();
        this.bookTitle = book.getBookTitle();
        this.artistId = book.getBookUserId().getUserId();
        this.artistNickname = book.getBookUserId().getUserNickname();
        this.discountStatus = status;
    }
}
