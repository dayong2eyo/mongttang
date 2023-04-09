package com.ssafy.mongttang.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Entity
@DynamicInsert
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "booklike")
public class BookLike extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int booklikeId;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booklike_book_id")
    private Book booklikeBookId;

    @NotNull
    private int booklikeUserId;

    @NotNull
    private int booklikeChallengId;

    public BookLike(Book booklikeBook, int booklikeUserId, int booklikeChallengId) {
        this.booklikeBookId = booklikeBook;
        this.booklikeUserId = booklikeUserId;
        this.booklikeChallengId = booklikeChallengId;
    }
}
