package com.ssafy.mongttang.dto;

import com.ssafy.mongttang.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Getter
@NoArgsConstructor
public class UserPrincipalDto implements UserDetails, OAuth2User{
    private static final long serialVersionUID = 1L;
    private User user;
    private Map<String, Object> attributes;
    private Collection<? extends GrantedAuthority> authorities;

    public UserPrincipalDto(User user) {
        this.authorities = Collections.singletonList(new SimpleGrantedAuthority(user.getUserRole()));
        this.user = user;
    }

    // OAuth2.0 로그인시 사용
    public UserPrincipalDto(User user, Map<String, Object> attributes) {
        this.authorities = Collections.singletonList(new SimpleGrantedAuthority(user.getUserRole()));
        this.user = user;
        this.attributes = attributes;
    }

    public User getUser() {
        return user;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getUsername() {
        return String.valueOf(user.getUserId());
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public String getName() {
        return String.valueOf(user.getUserId());
    }
}
