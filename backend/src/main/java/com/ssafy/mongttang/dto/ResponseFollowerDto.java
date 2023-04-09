package com.ssafy.mongttang.dto;

import com.ssafy.mongttang.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseFollowerDto {
    private int userId;
    private String userNickname;
    private String profileImgURL;

    public ResponseFollowerDto(User user){
        this.userId = user.getUserId();
        this.userNickname = user.getUserNickname();
        this.profileImgURL = user.getUserProfileImg();
        if(!user.getUserProfileImg().equals("defaultImg")){
            this.profileImgURL = "http://dd93ub3tw0bvd.cloudfront.net/" + user.getUserProfileImg();
        }
    }
}
