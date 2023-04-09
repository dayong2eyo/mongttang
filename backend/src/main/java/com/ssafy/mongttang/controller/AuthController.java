package com.ssafy.mongttang.controller;


import com.ssafy.mongttang.dto.ReqIssueDto;
import com.ssafy.mongttang.entity.User;
import com.ssafy.mongttang.service.TokenProviderService;
import com.ssafy.mongttang.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private static final String MESSAGE = "message";
    private static final String RESULT = "result";
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private final RedisTemplate redisTemplate;
    private final UserService userService;
    private final TokenProviderService tokenProviderService;

    @PostMapping("/reissue")
    public ResponseEntity<Map<String,Object>> reissue(@RequestBody ReqIssueDto reqIssueDto) {

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if (!tokenProviderService.validateToken(reqIssueDto.getRefreshToken())) {
            resultMap.put(MESSAGE, FAIL);
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        User user = userService.getUser(reqIssueDto.getUserId());

        String refreshToken = (String) redisTemplate.opsForValue().get("RT:" + reqIssueDto.getUserId());

        if(ObjectUtils.isEmpty(refreshToken) || !refreshToken.equals(reqIssueDto.getRefreshToken())) {
            resultMap.put(MESSAGE, FAIL);
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        String token = tokenProviderService.createAccessToken(user.getUserId(), user.getUserRole());
        resultMap.put(MESSAGE, SUCCESS);
        resultMap.put("accessToken", token);
        status = HttpStatus.ACCEPTED;
        return new ResponseEntity<>(resultMap, status);
    }
}
