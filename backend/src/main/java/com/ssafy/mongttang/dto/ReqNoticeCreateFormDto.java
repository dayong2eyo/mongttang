package com.ssafy.mongttang.dto;

import com.ssafy.mongttang.entity.Notice;
import lombok.*;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReqNoticeCreateFormDto {
    @NotBlank(message = "제목은 필수 입력 값입니다.")
    private String noticeTitle;
    @NotBlank(message = "내용은 필수 입력 값입니다.")
    private String noticeContent;

    public Notice toEntity() {
        return Notice.builder()
                .noticeTitle(noticeTitle)
                .noticeContent(noticeContent)
                .build();
    }
}
