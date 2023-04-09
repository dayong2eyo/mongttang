package com.ssafy.mongttang.repository;

import com.ssafy.mongttang.entity.Book;

import com.ssafy.mongttang.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.ArrayList;
import java.util.List;

public interface BookRepository extends JpaRepository<Book,Integer> {

    Book findByBookId(int bookId);

    @Query("select b from Book b where b.bookStatus = 'complete'")
    List<Book> findAllBooks();

    @Query("select b from Book b where b.bookId in (:bookIdList)")
    List<Book> findDiscountBooks(ArrayList<Integer> bookIdList);

    @Query("select b from Book b where b.bookChallengeId.challengeId = :challengeId and b.bookStatus = 'complete' order by b.createdTime desc")
    List<Book> findLatesBooks(int challengeId);

    @Query("select b from Book b where b.bookChallengeId.challengeId = :challengeId and b.bookStatus = 'complete' order by b.bookViews desc, b.createdTime asc")
    List<Book> findViewsBooks(int challengeId);

    @Query("select b from Book b where b.bookTitle like concat('%', :bookTitle, '%') and b.bookStatus = 'complete'")
    List<Book> searchBooks(String bookTitle);

    ArrayList<Book> findByBookUserIdAndBookStatus(User user, String complete);

    @Query(value = "select (t.book_views + t.comment_cnt * 2 + t.blike_cnt * 5) as total,  u.user_nickname as userNickname, u.user_profile_img as userProfileImg, t.book_views as bookViews, t.comment_cnt as commentCnt, t.blike_cnt as blikeCnt, t.book_title as bookTitle, t.book_user_id as bookUserId, t.book_content as bookContent, t.book_summary as bookSummary, t.book_id as bookId \n" +
                     "from (select * from (select count(comment_book_id) as comment_cnt, blike.booklike_book_id as v_book_id, blike.blike_cnt\n" +
                     "from comment as c right join (select count(booklike_book_id) - 1 as blike_cnt, booklike_book_id \n" +
                     "from booklike where booklike_challeng_id = :challengeId group by booklike_book_id) as blike on c.comment_book_id = blike.booklike_book_id group by blike.booklike_book_id) as v inner join book as b on b.book_id = v.v_book_id where b.book_status = 'complete') as t inner join user as u on u.user_id = t.book_user_id order by total desc, t.created_time asc limit 4", nativeQuery = true)
    List<BookNativeDto> findBestBook(int challengeId);

    public interface BookNativeDto{
        int getBookViews();
        int getTotal();
        String getUserNickname();
        int getBookUserId();
        String getUserProfileImg();
        int getCommentCnt();
        int getBlikeCnt();
        String getBookTitle();
        String getBookContent();
        String getBookSummary();
        int getBookId();
    }
}

