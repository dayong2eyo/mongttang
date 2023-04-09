package com.ssafy.mongttang.dto;

import com.ssafy.mongttang.entity.Notice;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ResponseNoticeDetailDto {
    private int noticeId;
    private String noticeTitle;
    private String noticeContent;
    private LocalDateTime createdTime;
    public ResponseNoticeDetailDto(Notice notice) {
        this.noticeId = notice.getNoticeId();
        this.noticeTitle = notice.getNoticeTitle();
        this.noticeContent = notice.getNoticeContent();
        this.createdTime = notice.getCreatedTime();
    }
}
