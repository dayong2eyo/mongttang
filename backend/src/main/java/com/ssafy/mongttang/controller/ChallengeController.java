package com.ssafy.mongttang.controller;

import com.ssafy.mongttang.dto.ResponseChallengeBookInfoDto;
import com.ssafy.mongttang.dto.ResponseDiscountBookDto;
import com.ssafy.mongttang.dto.ResponseThisWeekChallengeNativeDto;
import com.ssafy.mongttang.service.BookService;
import com.ssafy.mongttang.service.ChallengeService;
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
@RequestMapping("/challenge")
@RequiredArgsConstructor
public class ChallengeController {
    private static final String MESSAGE = "message";
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private final ChallengeService challengeService;
    private final BookService bookService;

    @ApiOperation(value = "이번주 챌린지 조회", notes = "이번주 챌린지를 조회한다.", response = Map.class)
    @GetMapping
    public ResponseEntity<Map<String, Object>> getThisWeekChallenge(Principal principal) {
        Map<String, Object> map = new HashMap<>();
        int userId = -1;
        if(principal != null){
            userId = Integer.valueOf(principal.getName());
        }
        List<ResponseThisWeekChallengeNativeDto> thisWeekChallenge = challengeService.getThisWeekChallenge(userId);
        List<ResponseDiscountBookDto> discountBooks = bookService.getDiscountBooks();
        if(discountBooks != null && thisWeekChallenge != null){
            map.put(MESSAGE, SUCCESS);
            map.put("thisWeekChallenge", thisWeekChallenge);
            map.put("discountBooks", discountBooks);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.put(MESSAGE, FAIL);
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "챌린지 상세 조회", notes = "챌린지를 상세 조회한다.", response = Map.class)
    @GetMapping("/{challengeId}")
    public ResponseEntity<Map<String, Object>> getChallengeDetail(@PathVariable @ApiParam(value = "상세 조회할 챌린지 아이디", example = "1") int challengeId
                                                                  ,Principal principal) {
        Map<String, Object> map = new HashMap<>();
        int userId = -1;

        if(principal != null){
            userId = Integer.valueOf(principal.getName());
        }
        ResponseThisWeekChallengeNativeDto detailChallenge = challengeService.getChallengeDetail(challengeId, userId);
        List<ResponseChallengeBookInfoDto> recent = challengeService.getLatesBooks(challengeId, userId);
        if(detailChallenge != null && recent != null){
            map.put(MESSAGE, SUCCESS);
            map.put("detailChallenge", detailChallenge);
            map.put("recent", recent);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.put(MESSAGE, FAIL);
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "챌린지 정렬 상세조회", notes = "챌린지를 정렬하여 상세 조회한다.", response = Map.class)
    @GetMapping("/order/{challengeId}")
    public ResponseEntity<Map<String, Object>> getChallengeDetailByOrder(@PathVariable @ApiParam(value = "상세 조회할 챌린지 아이디", example = "1") int challengeId
            ,@RequestParam @ApiParam(value = "정렬방법(lates, like, views)", example = "1") String order
            ,Principal principal) {
        Map<String, Object> map = new HashMap<>();
        int userId = -1;

        if(principal != null){
            userId = Integer.valueOf(principal.getName());
        }

        List<ResponseChallengeBookInfoDto> detailChallenges = challengeService.getBooksByOrder(challengeId, userId, order);
        if(detailChallenges != null){
            map.put(MESSAGE, SUCCESS);
            map.put("detailChallenges", detailChallenges);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.put(MESSAGE, FAIL);
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "이전 챌린지 조회", notes = "이전 챌린지를 조회한다.", response = Map.class)
    @GetMapping("/before")
    public ResponseEntity<Map<String, Object>> getBeforeChallenge(Principal principal) {
        Map<String, Object> map = new HashMap<>();
        int userId = -1;
        if(principal != null){
            userId = Integer.valueOf(principal.getName());
        }
        List<ResponseThisWeekChallengeNativeDto> beforeChallenges = challengeService.getBeforeChallenge(userId);
        if(beforeChallenges != null){
            map.put(MESSAGE, SUCCESS);
            map.put("totalChallenges", beforeChallenges);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.put(MESSAGE, FAIL);
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
    }
}
