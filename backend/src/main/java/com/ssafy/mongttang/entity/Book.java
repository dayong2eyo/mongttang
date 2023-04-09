package com.ssafy.mongttang.entity;

import com.ssafy.mongttang.dto.ReqCreateBookDto;
import com.ssafy.mongttang.dto.ReqUpdateBookDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "book")
public class Book extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookId;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "book_challenge_id")
    private Challenge bookChallengeId;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_user_id")
    private User bookUserId;

    @Column(columnDefinition = "TEXT")
    private String bookContent;

    @NotNull
    private String bookTitle;

    @NotNull
    @Column(columnDefinition = "VARCHAR(2000)")
    private String bookSummary;

    @NotNull
    private String bookStatus;

    @ColumnDefault("0")
    private double bookViews;

    private int nftId;

    @Builder
    public Book(Challenge challenge, User user, ReqCreateBookDto dto){
        this.bookChallengeId = challenge;
        this.bookUserId = user;
        this.bookTitle = dto.getBookTitle();
        this.bookSummary = dto.getBookSummary();
        this.bookContent = dto.getBookContent();
        this.bookStatus = dto.getIsComplete();
    }
    public void changeContent(ReqUpdateBookDto dto) {
        this.bookTitle = dto.getBookTitle();
        this.bookSummary = dto.getBookSummary();
        this.bookContent = dto.getBookContent();
        this.bookStatus = dto.getIsComplete();
    }

    public void changeStatus(){
        if(this.bookStatus.equals("delete")) {
            this.bookStatus = "complete";
        } else {
            this.bookStatus = "delete";
        }
    }

    public void changeToDisabled(){
        this.bookStatus = "delete";
    }

    public void addViews() {
        this.bookViews++;    }

    public void addToken(int nftId){
        this.nftId = nftId;
    }
}
