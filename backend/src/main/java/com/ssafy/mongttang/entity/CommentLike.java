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
@Table(name = "commentlike")
public class CommentLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int commentlikeId;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "commentlike_comment_id")
    private Comment commentlikeCommentId;

    @NotNull
    private int commentlikeUserId;

    public CommentLike(Comment commentlikeComment, int commentlikeUserId) {
        this.commentlikeCommentId = commentlikeComment;
        this.commentlikeUserId = commentlikeUserId;
    }
}
