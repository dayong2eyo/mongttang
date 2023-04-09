package com.ssafy.mongttang.dto;

import com.ssafy.mongttang.entity.Challenge;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ResponseChallengeInfoDto {
    private String challengeTitle;
    private String challengeContent;
    private String challengeSummary;
    private LocalDateTime challengeStartDate;
    private LocalDateTime challengeEndDate;

    private LocalDateTime createdTime;

    public ResponseChallengeInfoDto(Challenge challenge) {
        this.challengeTitle = challenge.getChallengeTitle();
        this.challengeContent = challenge.getChallengeContent();
        this.challengeSummary = challenge.getChallengeSummary();
        this.challengeStartDate = challenge.getChallengeStartDate();
        this.challengeEndDate = challenge.getChallengeEndDate();
        this.createdTime = challenge.getCreatedTime();
    }
}
