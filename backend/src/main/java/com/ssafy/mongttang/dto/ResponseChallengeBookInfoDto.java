package com.ssafy.mongttang.dto;

import com.ssafy.mongttang.entity.Book;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ResponseChallengeBookInfoDto {
    private int bookId;
    private String bookTitle;
    private String bookSummary;
    private int artistId;
    private String artistNickname;
    private String bookImgUrl;
    private String profileImgURL;
    private int numOfComment;
    private double numOfViews;
    private int numOfLike;

    private boolean isLiked;
    public ResponseChallengeBookInfoDto(Book book, String coverImgURL, int numOfComment, int numOfLike, boolean isLiked) {
        this.bookId = book.getBookId();
        this.bookTitle = book.getBookTitle();
        this.bookSummary = book.getBookSummary();
        this.artistId = book.getBookUserId().getUserId();
        this.artistNickname = book.getBookUserId().getUserNickname();
        this.bookImgUrl = "http://dd93ub3tw0bvd.cloudfront.net/" + coverImgURL;
        this.profileImgURL = book.getBookUserId().getUserProfileImg();
        if(!book.getBookUserId().getUserProfileImg().equals("defaultImg")){
            this.profileImgURL = "http://dd93ub3tw0bvd.cloudfront.net/" + book.getBookUserId().getUserProfileImg();
        }
        this.numOfViews = book.getBookViews();
        this.numOfComment = numOfComment;
        this.numOfLike = numOfLike;
        this.isLiked = isLiked;
    }
}
