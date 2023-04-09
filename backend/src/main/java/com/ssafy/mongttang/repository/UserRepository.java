package com.ssafy.mongttang.repository;

import com.ssafy.mongttang.dto.AuthProvider;
import com.ssafy.mongttang.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer>{
    User findByUserNickname(String userNickname);
    User findByUserId(int userId);

    Optional<User> findByUserProviderAndUserProviderId(AuthProvider provider, String email);
}

