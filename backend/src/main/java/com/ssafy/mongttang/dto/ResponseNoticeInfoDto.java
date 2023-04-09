package com.ssafy.mongttang.dto;

import com.ssafy.mongttang.entity.Notice;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ResponseNoticeInfoDto {
    private int noticeId;
    private String noticeTitle;
    private LocalDateTime createdTime;
    public ResponseNoticeInfoDto(Notice notice) {
        this.noticeId = notice.getNoticeId();
        this.noticeTitle = notice.getNoticeTitle();
        this.createdTime = notice.getCreatedTime();
    }
}
