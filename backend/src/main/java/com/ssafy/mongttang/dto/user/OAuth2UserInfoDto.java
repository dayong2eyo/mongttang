package com.ssafy.mongttang.dto.user;

import com.ssafy.mongttang.entity.User;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;

public interface OAuth2UserInfoDto {
    String getProvider();
    String getProviderId();
    User toEntity(OAuth2UserRequest oAuth2UserRequest);
}
