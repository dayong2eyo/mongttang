package com.ssafy.mongttang.dto.user;



import com.ssafy.mongttang.dto.AuthProvider;
import com.ssafy.mongttang.entity.User;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import java.util.Map;

public class GoogleUserInfoDto implements OAuth2UserInfoDto {

    private Map<String, Object> attributes;

    public GoogleUserInfoDto(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    @Override
    public String getProvider() {
        return "google";
    }

    @Override
    public String getProviderId() {
        return (String) attributes.get("sub");
    }

    public User toEntity(OAuth2UserRequest oAuth2UserRequest){
        return User.builder()
                .userProvider(AuthProvider.valueOf(getProvider()))
                .userProviderId(getProviderId())
                .build();
    }
}
