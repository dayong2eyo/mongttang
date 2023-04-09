package com.ssafy.mongttang.entity;

import com.ssafy.mongttang.dto.AuthProvider;
import lombok.AllArgsConstructor;
import lombok.Builder;
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
@Table(name = "user")
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    @Column(length = 11)
    @NotNull
    private String userRole;

    @Column(length = 50)
    private String userNickname;

    @Enumerated(EnumType.STRING)
    @Column(length = 6)
    @NotNull
    private AuthProvider userProvider;

    @Column
    @NotNull
    private String userProviderId;

    @Column
    private String userInfo;

    @Column
    private String userProfileImg;

    @Column
    private String userPrivateKey;

    @Builder
    public User(AuthProvider userProvider, String userProviderId ){
        this.userNickname = new StringBuilder().append(userProvider).append("_").append(System.nanoTime()).toString();
        this.userRole = "ROLE_READER";
        this.userPrivateKey = " ";
        this.userProvider = userProvider;
        this.userProviderId = userProviderId;
        this.userProfileImg = "defaultImg";
    }

    public void changeNickname(String nickname) {
        this.userNickname = nickname;
    }

    public void changeProfileImg(String userProfileImg) {
        this.userProfileImg = userProfileImg;
    }

    public void changeUserInfo(String userInfo) {
        this.userInfo = userInfo;
    }

    public void changeWallet(String wallet) {
        this.userPrivateKey = wallet;
    }

    public void deleteUser() {
        changeNickname("(알 수 없음)");
        this.userProviderId = "del";
    }
}
