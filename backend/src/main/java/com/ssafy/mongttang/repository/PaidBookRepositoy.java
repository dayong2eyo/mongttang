package com.ssafy.mongttang.repository;

import com.ssafy.mongttang.entity.PaidBook;
import com.ssafy.mongttang.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface PaidBookRepositoy extends JpaRepository<PaidBook, Integer> {
    ArrayList<PaidBook> findByPaidbookUserId(User user);

    PaidBook findByPaidbookUserIdAndBookId(User user, int bookId);
}
