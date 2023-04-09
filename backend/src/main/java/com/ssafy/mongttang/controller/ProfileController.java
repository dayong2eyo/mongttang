package com.ssafy.mongttang.controller;

import com.ssafy.mongttang.dto.ResponseFollowerDto;
import com.ssafy.mongttang.dto.ResponseFollowingDto;
import com.ssafy.mongttang.dto.ResponseProfileDto;
import com.ssafy.mongttang.entity.Follow;
import com.ssafy.mongttang.entity.InterestBook;
import com.ssafy.mongttang.service.ProfileService;
import com.ssafy.mongttang.util.TokenUtils;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
public class ProfileController{
    private static final String MESSAGE = "message";
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final ProfileService profileService;

    @ApiOperation(value = "팔로우", notes = "팔로우 한다.", response = Map.class)
    @PostMapping("/follow/{followFromId}")
    public ResponseEntity<Map<String,Object>> createFollow(@ApiParam(value = "팔로우 하는 사용자 아이디", required = true, example = "0") @PathVariable int followFromId,
                                                           @ApiParam(value = "팔로우 당하는 사용자 아이디", required = true, example = "0") @RequestParam int followToId, Principal principal){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(TokenUtils.compareUserIdAndToken(followFromId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        Follow follow = profileService.createFollow(followFromId,followToId);

        if(follow != null){
            resultMap.put(MESSAGE,SUCCESS);
            resultMap.put("isFollow",true);
            status = HttpStatus.OK;
        }else{
            resultMap.put(MESSAGE, FAIL);
            resultMap.put("isFollow",false);
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "팔로우 취소", notes = "팔로잉을 취소한다.", response = Map.class)
    @DeleteMapping("/follow/{followFromId}")
    public ResponseEntity<Map<String,Object>> cancleFollow(@ApiParam(value = "팔로우 하는 사용자 아이디", required = true, example = "0") @PathVariable int followFromId,
                                                                 @ApiParam(value = "팔로우 당하는 사용자 아이디", required = true, example = "0") @RequestParam int followToId, Principal principal){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(TokenUtils.compareUserIdAndToken(followFromId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        int isDeleted= profileService.cancleFollow(followFromId,followToId);

        if(isDeleted > 0){
            resultMap.put(MESSAGE,SUCCESS);
            resultMap.put("isFollow",false);
            status = HttpStatus.OK;
        }else{
            resultMap.put(MESSAGE, FAIL);
            resultMap.put("isFollow",true);
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "팔로잉 목록 조회", notes = "자신이 팔로우한 사용자의 목록을 조회한다.", response = Map.class)
    @GetMapping("/following/{userId}")
    public ResponseEntity<Map<String,Object>> getFollowing(@ApiParam(value = "회원 아이디", required = true, example = "0") @PathVariable int userId){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        List<ResponseFollowingDto> followings = profileService.getFollowing(userId);

        if(followings == null){
            resultMap.put(MESSAGE, FAIL);
            status = HttpStatus.BAD_REQUEST;
        }else{
            resultMap.put(MESSAGE,SUCCESS);
            resultMap.put("followings",followings);
            status = HttpStatus.OK;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "팔로워 목록 조회", notes = "자신을 팔로우한 사용자의 목록을 조회한다.", response = Map.class)
    @GetMapping("/follower/{userId}")
    public ResponseEntity<Map<String,Object>> getFollower(@ApiParam(value = "회원 아이디", required = true, example = "0") @PathVariable int userId){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        List<ResponseFollowerDto> followers = profileService.getFollower(userId);

        if(followers == null){
            resultMap.put(MESSAGE, FAIL);
            status = HttpStatus.BAD_REQUEST;
        }else{
            resultMap.put(MESSAGE,SUCCESS);
            resultMap.put("followers",followers);
            status = HttpStatus.OK;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "관심 목록 추가", notes = "관심있는 동화를 내 관심목록에 추가한다.", response = Map.class)
    @PostMapping("/interest/{userId}")
    public ResponseEntity<Map<String,Object>> createInterest(@ApiParam(value = "회원 아이디", required = true, example = "0") @PathVariable int userId,
                                                             @ApiParam(value = "동화 아이디", required = true, example = "0") @RequestParam int bookId, Principal principal){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        InterestBook interestBokk = profileService.createInterest(userId, bookId);

        if(interestBokk == null){
            resultMap.put(MESSAGE, FAIL);
            resultMap.put("isInterest",false);
            status = HttpStatus.BAD_REQUEST;
        }else{
            resultMap.put(MESSAGE,SUCCESS);
            resultMap.put("isInterest",true);
            status = HttpStatus.OK;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "관심 목록 삭제", notes = "관심있는 동화를 내 관심목록에 추가한다.", response = Map.class)
    @DeleteMapping("/interest/{userId}")
    public ResponseEntity<Map<String,Object>> cancleInterest(@ApiParam(value = "회원 아이디", required = true, example = "0") @PathVariable int userId,
                                                             @ApiParam(value = "동화 아이디", required = true, example = "0") @RequestParam int bookId, Principal principal){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        int isDeleted = profileService.cancleInterest(userId, bookId);

        if(isDeleted > 0){
            resultMap.put(MESSAGE,SUCCESS);
            resultMap.put("isInterest",true);
            status = HttpStatus.OK;
        }else{
            resultMap.put(MESSAGE, FAIL);
            resultMap.put("isInterest",false);
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "프로필 조회", notes = "사용자의 프로필을 조회한다.", response = Map.class)
    @GetMapping("/{userId}")
    public ResponseEntity<Map<String,Object>> getProfile(@ApiParam(value = "해당 프로필 회원 아이디", required = true, example = "0") @PathVariable int userId, Principal principal){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        int lookUserId = Integer.parseInt(principal.getName());
        ResponseProfileDto profile = profileService.getProfile(userId,lookUserId);

        if(profile == null){
            resultMap.put(MESSAGE, FAIL);
            status = HttpStatus.BAD_REQUEST;
        }else{
            resultMap.put(MESSAGE,SUCCESS);
            resultMap.put("profile",profile);
            status = HttpStatus.OK;
        }

        return new ResponseEntity<>(resultMap, status);
    }

}