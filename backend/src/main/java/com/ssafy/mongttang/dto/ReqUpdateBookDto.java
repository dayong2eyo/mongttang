package com.ssafy.mongttang.dto;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class ReqUpdateBookDto {
    @NotNull
    private int challengeId;
    @NotNull
    private int bookId;
    @NotNull(message = "제목은 필수 입력 값입니다.")
    private String bookTitle;
    private String bookSummary;
    private String bookContent;
    @NotNull
    private String isComplete;
}
