package com.ssafy.mongttang.dto;

import com.ssafy.mongttang.entity.Book;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;

@Getter
public class ResponseBookDetailDto {
    @NotNull
    private int challengeId;
    @NotNull
    private int bookId;
    @NotNull
    private int nftId;
    @NotNull
    private String bookTitle;
    @NotNull
    private String bookSummary;
    @NotNull
    private int artistId;
    @NotNull
    private String artistNickname;
    @NotNull
    private String artistProfileImg;
    @NotNull
    private String illustPath;
    @NotNull
    private boolean isLiked;
    @NotNull
    private boolean isReported;
    @NotNull
    private boolean isInterested;
    @NotNull
    private int numOfLike;
    @NotNull
    private int price;
    private ArrayList<ResponseCommentDto> comments;

    public ResponseBookDetailDto(Book book, String illustPath,boolean isLiked, boolean isReported,boolean isInterested,int price, int numOfLike, ArrayList<ResponseCommentDto> comments) {
        this.challengeId = book.getBookChallengeId().getChallengeId();
        this.nftId = book.getNftId();
        this.bookId = book.getBookId();
        this.bookTitle = book.getBookTitle();
        this.bookSummary = book.getBookSummary();
        this.artistId = book.getBookUserId().getUserId();
        this.artistNickname = book.getBookUserId().getUserNickname();
        this.artistProfileImg = book.getBookUserId().getUserProfileImg();
        if(!book.getBookUserId().getUserProfileImg().equals("defaultImg")){
            this.artistProfileImg = "http://dd93ub3tw0bvd.cloudfront.net/" + book.getBookUserId().getUserProfileImg();
        }
        this.illustPath = "http://dd93ub3tw0bvd.cloudfront.net/" + illustPath;
        this.isLiked = isLiked;
        this.isReported = isReported;
        this.isInterested = isInterested;
        this.price = price;
        this.numOfLike = numOfLike;
        this.comments = comments;
    }
}
