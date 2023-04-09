package com.ssafy.mongttang.dto;


import com.ssafy.mongttang.entity.Book;
import com.ssafy.mongttang.entity.BookReport;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReqReportBookDto {
    @NotBlank(message = "신고 내용은 필수 입력 값입니다.")
    private String reportContent;
    @NotBlank(message = "신고분류는 필수 입력 값입니다.")
    private String reportCategory;

    public BookReport toEntity(Book book, int userId) {
        return BookReport.builder()
                .bookreportBookId(book)
                .bookreportBookTitle(book.getBookTitle())
                .bootreportUserId(book.getBookUserId().getUserId())
                .bookreportContent(reportContent)
                .bookreportCategory(reportCategory)
                .bookreportReportUserId(userId)
                .build();
    }
}
