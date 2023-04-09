package com.ssafy.mongttang.repository;

import com.ssafy.mongttang.entity.Book;

import java.util.List;

public interface BookLikeRepositoryCustom {
    List<Book> findTop3LikeBook(int challengeId);
    List<Book> getLikeBook(int challengeId);
    List<Book> getCurrentLikedBook(int challengeId);
}
