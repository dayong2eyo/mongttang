package com.ssafy.mongttang.dto;

import com.ssafy.mongttang.entity.Challenge;
import lombok.Getter;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
public class ReqChallengeCreateFormDto{
    @NotNull(message = "제목은 필수 입력 값입니다.")
    private String challengeTitle;
    @NotNull(message = "내용은 필수 입력 값입니다.")
    private String challengeContent;
    @NotNull(message = "줄거리는 필수 입력 값입니다.")
    private String challengeSummary;
    private LocalDateTime challengeStartDate;
    private LocalDateTime challengeEndDate;

    public Challenge toEntity() {
        return Challenge.builder()
                .challengeTitle(challengeTitle)
                .challengeContent(challengeContent)
                .challengeSummary(challengeSummary)
                .challengeStartDate(challengeStartDate)
                .challengeEndDate(challengeEndDate)
                .build();
    }
}
