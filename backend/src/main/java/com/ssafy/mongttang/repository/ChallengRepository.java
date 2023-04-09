package com.ssafy.mongttang.repository;

import com.ssafy.mongttang.entity.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface ChallengRepository extends JpaRepository<Challenge, Integer> {
    Challenge findByChallengeId(int challengeId);

    @Query(value = "select c from Challenge c where :curTime between c.challengeStartDate and c.challengeEndDate")
    List<Challenge> findThisWeekChallenge(LocalDateTime curTime);

    @Query(value = "select c from Challenge c where :curTime > c.challengeEndDate")
    List<Challenge> findBeforeChallenge(LocalDateTime curTime);
}
