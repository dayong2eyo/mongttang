package com.ssafy.mongttang.repository;

import com.ssafy.mongttang.entity.Book;
import com.ssafy.mongttang.entity.Illust;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

public interface IllustRepository extends JpaRepository<Illust, Integer> {

    // JPQL 일반 파라미터 쿼리, @Param 사용 X
    @Modifying
    @Transactional
    @Query(value = "delete from Illust illust where illust.illustBookId = :book")
    void deleteByIllustBookId(@Param("book") Book book);

    @Query("select i.illustFilePath from Illust i where i.illustPageNumber = 0 and i.illustBookId.bookId = :bookId")
    String findCoverIllust(int bookId);

    Illust findByIllustBookIdAndIllustPageNumber(Book book, int illustPageNumber);

    Illust findByIllustBookId_BookIdAndIllustPageNumber(int bookId, int illustPageNumber);

    ArrayList<Illust> findByIllustBookId(Book book);
}
