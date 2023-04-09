package com.ssafy.mongttang.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BookInfo {
    private String bookImgUrl;
    private int bookId;

    public BookInfo(String bookImgUrl, int bookId) {
        this.bookImgUrl = "http://dd93ub3tw0bvd.cloudfront.net/" + bookImgUrl;
        this.bookId = bookId;
    }
}
