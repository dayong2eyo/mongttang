package com.ssafy.mongttang.dto;

import com.ssafy.mongttang.entity.Book;
import com.ssafy.mongttang.entity.Challenge;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;

@Getter
public class ResponseBookEditDto {
    @NotNull
    private int challengeId;
    @NotNull
    private String challengeTitle;
    @NotNull
    private String challengeSummary;
    @NotNull
    private String challengeContent;
    @NotNull
    private int artistId;

    public ResponseBookEditDto(int userId, Challenge challenge) {
        this.challengeId = challenge.getChallengeId();
        this.challengeTitle = challenge.getChallengeTitle();
        this.challengeSummary = challenge.getChallengeSummary();
        this.challengeContent = challenge.getChallengeContent();
        this.artistId = userId;
    }
}
