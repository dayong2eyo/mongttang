package com.ssafy.mongttang.controller;

import com.ssafy.mongttang.dto.ReqUserInfoDto;
import com.ssafy.mongttang.dto.ReqWalletInfoDto;
import com.ssafy.mongttang.entity.User;
import com.ssafy.mongttang.service.TokenProviderService;
import com.ssafy.mongttang.service.UserService;
import com.ssafy.mongttang.util.TokenUtils;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.URLEncoder;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private static final String MESSAGE = "message";
    private static final String RESULT = "result";
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final RedisTemplate redisTemplate;
    private final UserService userService;
    private final TokenProviderService tokenProviderService;

    @ApiOperation(value = "닉네임 중복 검사", notes = "회원의 닉네임의 중복 여부를 검사합나다.", response = Map.class)
    @GetMapping("/{userNickname}")
    public ResponseEntity<Map<String,Object>> nicknameDpcn(@ApiParam(value = "닉네임", required = true, example = "홍길동")
                                                               @PathVariable String userNickname){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        User user = userService.nicknameDpcn(userNickname);

        if(user == null){
            resultMap.put(MESSAGE , SUCCESS);
            status = HttpStatus.OK;
        } else {
            resultMap.put(MESSAGE, FAIL);
            status = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "닉네임 수정", notes = "회원의 닉네임을 수정한다.", response = Map.class)
    @PatchMapping("/{userId}")
    public ResponseEntity<Map<String,Object>> nicknameModify(@ApiParam(value = "수정할 회원정보(아이디)", required = true, example = "1") @PathVariable int userId,
                                                             @ApiParam(value = "수정할 회원정보(변경할 닉네임)", required = true, example  = "홍동길") @RequestParam String userNickname, Principal principal){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        String nickname = userService.nicknameModify(userId, userNickname);

        if(userNickname == null){
            resultMap.put(MESSAGE, FAIL);
            status = HttpStatus.BAD_REQUEST;
        } else {
            resultMap.put(MESSAGE, SUCCESS);
            resultMap.put("userNickname", nickname);
            status = HttpStatus.OK;
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "회원 소개 수정", notes = "회원의 소개를 수정한다.", response = Map.class)
    @PatchMapping("/info/{userId}")
    public ResponseEntity<Map<String,Object>> infoModify(@ApiParam(value = "수정할 회원정보(아이디)", required = true, example = "1") @PathVariable int userId,
                                                         @ApiParam(value = "수정할 회원 소개", required = true) @RequestBody ReqUserInfoDto reqUserInfoDto, Principal principal){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        String userInfo = userService.infoModify(userId, reqUserInfoDto);

        if(userInfo == null){
            resultMap.put(MESSAGE, FAIL);
            status = HttpStatus.BAD_REQUEST;
        } else {
            resultMap.put(MESSAGE, SUCCESS);
            resultMap.put("userInfo", userInfo);
            status = HttpStatus.OK;
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "프로필 사진 수정", notes = "회원의 프로필 사진을 수정한다.", response = Map.class)
    @PatchMapping("/image/{userId}")
    public ResponseEntity<Map<String,Object>> profileImgModify(@ApiParam(value = "프로필 사진을 수정할 회원의 아이디", required = true, example = "1") @PathVariable int userId,
                                                             @ApiParam(value = "변경할 프로필 사진", required = true) @RequestParam MultipartFile userImg, Principal principal, HttpServletRequest request){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        try {
            String profileImgURL = userService.profileImgModify(userId, userImg);
            if(profileImgURL == null){
                resultMap.put(MESSAGE, FAIL);
                status = HttpStatus.BAD_REQUEST;
            } else {
                resultMap.put(MESSAGE, SUCCESS);
                resultMap.put("profileImgURL", profileImgURL);
                status = HttpStatus.OK;
            }
        } catch (IOException e) {
            resultMap.put(MESSAGE, FAIL);
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "회원 탈퇴", notes = "회원을 탈퇴시킨다.", response = Map.class)
    @DeleteMapping("/{userId}")
    public ResponseEntity<Map<String,Object>> userDelete(@ApiParam(value = "탈퇴시킬 회원 아이디", required = true, example = "1") @PathVariable int userId
            , Principal principal, HttpServletRequest request){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        User user = userService.userDelete(userId);

        if(user == null){
            resultMap.put(MESSAGE, FAIL);
            status = HttpStatus.BAD_REQUEST;
        } else {
            return logout(userId, principal, request);
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "로그아웃", notes = "로그아웃 시킨다.", response = Map.class)
    @GetMapping("/logout/{userId}")
    public ResponseEntity<Map<String,Object>> logout(@ApiParam(value = "로그아웃 시킬 회원 아이디", required = true, example = "1") @PathVariable int userId, Principal principal, HttpServletRequest request) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        if (redisTemplate.opsForValue().get("RT:" + principal.getName()) != null) {
            redisTemplate.delete("RT:" + principal.getName());
        }

        String accessToken = TokenUtils.getJwtFromRequest(request);

        Long expiration = tokenProviderService.getExpiration(accessToken);
        redisTemplate.opsForValue()
                .set(accessToken, "logout", expiration, TimeUnit.MILLISECONDS);

        resultMap.put(MESSAGE, SUCCESS);
        status = HttpStatus.OK;

        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "지갑 키 저장", notes = "지갑의 키를 저장한다.", response = Map.class)
    @PostMapping("/wallet/{userId}")
    public ResponseEntity<Map<String,Object>> storeWalletAddress(@ApiParam(value = "지갑 생성을 할 회원 아이디", required = true, example = "1") @PathVariable int userId, @RequestBody ReqWalletInfoDto reqWalletInfoDto, Principal principal) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }
        try {
            User user = userService.storeWalletAddress(userId, reqWalletInfoDto);

            if(user == null){
                resultMap.put(MESSAGE, FAIL);
                status = HttpStatus.BAD_REQUEST;
            } else {
                String userWallet = URLEncoder.encode(user.getUserPrivateKey(), "UTF-8").replaceAll("\\+", "%20");
                resultMap.put(MESSAGE, SUCCESS);
                resultMap.put("userWallet", userWallet);
                status = HttpStatus.OK;
            }
        } catch (Exception e) {
            resultMap.put(MESSAGE, FAIL);
            status = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<>(resultMap, status);
    }
}