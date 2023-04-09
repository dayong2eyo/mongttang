package com.ssafy.mongttang.dto;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class ReqNftIdDto {
    @NotNull
    private int bookId;
    @NotNull
    private int nftId;
}
