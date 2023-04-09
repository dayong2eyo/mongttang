package com.ssafy.mongttang.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class ReqWalletInfoDto {
    @NotBlank
    private String wallet;
}
