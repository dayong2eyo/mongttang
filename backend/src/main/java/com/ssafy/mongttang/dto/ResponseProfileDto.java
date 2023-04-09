package com.ssafy.mongttang.dto;

import com.ssafy.mongttang.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
public class ResponseProfileDto {

    private int userId;
    private String profileImgURL;
    private String userNickname;
    private String userInfo;
    private int numOfFollower;
    private int numOfFollowing;

    private boolean isFollow;
    private List<ResponseChallengeBookInfoDto> myBooks;
    private List<ResponseChallengeBookInfoDto> inCompleteBooks;
    private List<ResponseChallengeBookInfoDto> interestBooks;
    private List<ResponseChallengeBookInfoDto> paidBooks;

    public ResponseProfileDto(User user, int numOfFollower, int numOfFollowing) {
        this.userId = user.getUserId();
        this.profileImgURL = user.getUserProfileImg();
        if(!user.getUserProfileImg().equals("defaultImg")){
            this.profileImgURL = "http://dd93ub3tw0bvd.cloudfront.net/" + user.getUserProfileImg();
        }
        this.userNickname = user.getUserNickname();
        this.userInfo = user.getUserInfo();
        this.numOfFollower = numOfFollower;
        this.numOfFollowing = numOfFollowing;
    }

    public void addMyprofileInfo(ArrayList<ResponseChallengeBookInfoDto> inCompleteBooks, ArrayList<ResponseChallengeBookInfoDto> paidBooks) {
        this.inCompleteBooks = inCompleteBooks;
        this.paidBooks = paidBooks;
    }

    public void addIsFollow(boolean isFollow){
        this.isFollow = isFollow;
    }

    public void addMyBooksAndInterestBooks(ArrayList<ResponseChallengeBookInfoDto> myBookInfos, ArrayList<ResponseChallengeBookInfoDto> interestBookInfos) {
        this.myBooks = myBookInfos;
        this.interestBooks = interestBookInfos;
    }
}


