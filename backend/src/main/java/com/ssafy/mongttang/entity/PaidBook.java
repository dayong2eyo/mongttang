package com.ssafy.mongttang.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "paidbook")
public class PaidBook extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int paidbookId;
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "paidbook_user_id")
    private User paidbookUserId;
    @NotNull
    private int bookId;

    @Builder
    public PaidBook(User paidbookUserId, int bookId) {
        this.paidbookUserId = paidbookUserId;
        this.bookId = bookId;
    }
}
