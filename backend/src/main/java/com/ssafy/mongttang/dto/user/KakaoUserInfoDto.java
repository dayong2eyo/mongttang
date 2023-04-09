package com.ssafy.mongttang.dto.user;

import com.ssafy.mongttang.dto.AuthProvider;
import com.ssafy.mongttang.entity.User;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import java.util.Map;

public class KakaoUserInfoDto implements OAuth2UserInfoDto {

    private Map<String, Object> attributes;
    private Map<String, Object> kakaoAccount;
    private Map<String, Object> kakaoProfile ;

    public KakaoUserInfoDto(Map<String, Object> attributes) {
        this.attributes = attributes;
        this.kakaoAccount = (Map) attributes.get("kakao_account");
        this.kakaoProfile = (Map) kakaoAccount.get("profile");
    }

    @Override
    public String getProvider() {
        return "kakao";
    }

    @Override
    public String getProviderId() {
        return attributes.get("id").toString();
    }

    public User toEntity(OAuth2UserRequest oAuth2UserRequest){
        return User.builder()
                .userProvider(AuthProvider.valueOf(getProvider()))
                .userProviderId(getProviderId())
                .build();
    }
}
