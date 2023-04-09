package com.ssafy.mongttang.dto;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class ReqCreateCommentDto {
    @NotNull
    private int commentUserId;
    @NotNull
    private int commentBookId;
    @NotNull(message = "내용은 필수 입력값입니다.")
    private String commentContent;
}
