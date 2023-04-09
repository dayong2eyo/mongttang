package com.ssafy.mongttang.entity;

import com.ssafy.mongttang.dto.ReqNoticeUpdateFormDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "notice")
public class Notice extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int noticeId;
    @NotNull
    private String noticeTitle;

    @NotNull
    @Column(columnDefinition = "TEXT")
    private String noticeContent;

    @Builder
    public Notice(String noticeTitle, String noticeContent) {
        this.noticeTitle = noticeTitle;
        this.noticeContent = noticeContent;
    }

    public void update(ReqNoticeUpdateFormDto reqNoticeUpdateFormDto){
        this.noticeTitle = reqNoticeUpdateFormDto.getNoticeTitle();
        this.noticeContent = reqNoticeUpdateFormDto.getNoticeContent();
    }
}
