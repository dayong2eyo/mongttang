package com.ssafy.mongttang.repository;

import com.ssafy.mongttang.entity.Book;
import com.ssafy.mongttang.entity.InterestBook;
import com.ssafy.mongttang.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;


public interface InterestBookRepository extends JpaRepository<InterestBook, Integer> {


    InterestBook findByInterestbookUserIdAndInterestbookBookId(User user, Book book);

    ArrayList<InterestBook> findByInterestbookUserId(User user);

    InterestBook findByInterestbookUserId_UserIdAndInterestbookBookId(int user, Book book);
}
