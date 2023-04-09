package com.ssafy.mongttang.dto;

import com.ssafy.mongttang.repository.BookRepository;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ResponseChallengeBookInfoNativeDto {
    private int bookId;
    private String bookTitle;
    private String bookSummary;
    private int artistId;
    private String artistNickname;
    private String bookImgUrl;
    private String profileImgURL;
    private int numOfComment;
    private int numOfViews;

    private int numOfLike;

    private int total;

    private boolean isLiked;

    public ResponseChallengeBookInfoNativeDto(BookRepository.BookNativeDto book, String coverImgURL, boolean isLiked) {
        this.bookId = book.getBookId();
        this.bookTitle = book.getBookTitle();
        this.bookSummary = book.getBookSummary();
        this.artistId = book.getBookUserId();
        this.artistNickname = book.getUserNickname();
        this.bookImgUrl = "http://dd93ub3tw0bvd.cloudfront.net/" + coverImgURL;
        this.profileImgURL = book.getUserProfileImg();
        if(!book.getUserProfileImg().equals("defaultImg")){
            this.profileImgURL = "http://dd93ub3tw0bvd.cloudfront.net/" + book.getUserProfileImg();
        }
        this.numOfViews = book.getBookViews();
        this.numOfComment = book.getCommentCnt();
        this.numOfLike = book.getBlikeCnt();
        this.total = book.getTotal();
        this.isLiked = isLiked;
    }
}
