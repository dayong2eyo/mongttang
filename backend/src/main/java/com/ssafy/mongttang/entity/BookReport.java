package com.ssafy.mongttang.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "bookreport")
public class BookReport extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookreportId;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "bookreport_book_id")
    private Book bookreportBookId;

    @NotNull
    private int bookreportUserId;

    @NotNull
    private String bookreportBookTitle;

    @NotNull
    private String bookreportContent;

    @NotNull
    private int bookreportReportUserId;

    @NotNull
    private String bookreportCategory;

    @Builder
    public BookReport(Book bookreportBookId, int bootreportUserId, String bookreportBookTitle, String bookreportContent, int bookreportReportUserId, String bookreportCategory) {
        this.bookreportBookId = bookreportBookId;
        this.bookreportUserId = bootreportUserId;
        this.bookreportBookTitle = bookreportBookTitle;
        this.bookreportContent = bookreportContent;
        this.bookreportReportUserId = bookreportReportUserId;
        this.bookreportCategory = bookreportCategory;
    }
}
