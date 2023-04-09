package com.ssafy.mongttang.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Entity
@DynamicInsert
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "follow")
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT UNSIGNED")
    private int followId;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "follow_from")
    private User followFrom;            //팔로우 하는 사람

    @NotNull
    @ManyToOne
    @JoinColumn(name = "follow_to")
    private User followTo;           //팔로우 당한 사람

    public Follow(User followFrom, User followTo) {
        this.followFrom = followFrom;
        this.followTo = followTo;
    }
}
