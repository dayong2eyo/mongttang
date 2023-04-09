package com.ssafy.mongttang.entity;


import com.ssafy.mongttang.dto.ReqChallengeCreateFormDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Getter
@DynamicInsert
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "challenge")
public class Challenge extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int challengeId;

    @NotNull
    private String challengeTitle;

    @NotNull
    @Column(columnDefinition = "TEXT")
    private String challengeContent;

    @NotNull
    @Column(columnDefinition = "VARCHAR(2000)")
    private String challengeSummary;

    @NotNull
    private LocalDateTime challengeStartDate;

    @NotNull
    private LocalDateTime challengeEndDate;

    @Builder
    public Challenge(String challengeTitle, String challengeContent, String challengeSummary, LocalDateTime challengeStartDate, LocalDateTime challengeEndDate) {
        this.challengeTitle = challengeTitle;
        this.challengeContent = challengeContent;
        this.challengeSummary = challengeSummary;
        this.challengeStartDate = challengeStartDate;
        this.challengeEndDate = challengeEndDate;
    }

    public void update(ReqChallengeCreateFormDto reqChallengeCreateFormDto){
        this.challengeTitle = reqChallengeCreateFormDto.getChallengeTitle();
        this.challengeContent = reqChallengeCreateFormDto.getChallengeContent();
        this.challengeSummary = reqChallengeCreateFormDto.getChallengeSummary();
        this.challengeStartDate = reqChallengeCreateFormDto.getChallengeStartDate();
        this.challengeEndDate = reqChallengeCreateFormDto.getChallengeEndDate();
    }
}
