package com.ssafy.mongttang.repository;


import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.mongttang.entity.Book;
import com.ssafy.mongttang.entity.QBookLike;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.List;

public class BookLikeRepositoryCustomImpl implements BookLikeRepositoryCustom{
    private JPAQueryFactory queryFactory;
    QBookLike bookLike = QBookLike.bookLike;

    public BookLikeRepositoryCustomImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }
    @Override
    public List<Book> findTop3LikeBook(int challengeId) {
        return queryFactory.select(bookLike.booklikeBookId).from(bookLike)
                .where(bookLike.booklikeChallengId.eq(challengeId), bookLike.booklikeBookId.bookStatus.eq("complete"))
                .groupBy(bookLike.booklikeBookId)
                .orderBy(bookLike.booklikeBookId.count().desc(), bookLike.createdTime.asc())
                .limit(3).fetch();
    }
    @Override
    public List<Book> getLikeBook(int challengeId) {
        return queryFactory.select(bookLike.booklikeBookId).from(bookLike)
                .where(bookLike.booklikeChallengId.eq(challengeId), bookLike.booklikeBookId.bookStatus.eq("complete"))
                .groupBy(bookLike.booklikeBookId)
                .orderBy(bookLike.booklikeBookId.count().desc(), bookLike.createdTime.asc())
                .fetch();
    }

    @Override
    public List<Book> getCurrentLikedBook(int challengeId) {
        return queryFactory.select(bookLike.booklikeBookId).from(bookLike)
                .where(bookLike.booklikeChallengId.eq(challengeId), bookLike.booklikeBookId.bookStatus.eq("complete"), bookLike.createdTime.after(LocalDateTime.now().minusDays(3)))
                .groupBy(bookLike.booklikeBookId)
                .orderBy(bookLike.booklikeBookId.count().desc(), bookLike.createdTime.asc())
                .fetch();
    }
}
