package com.ssafy.mongttang.controller;

import com.ssafy.mongttang.dto.ReqReportBookDto;
import com.ssafy.mongttang.dto.ReqReportCommentDto;
import com.ssafy.mongttang.dto.ResponseReportBookInfoDto;
import com.ssafy.mongttang.dto.ResponseReportCommentInfoDto;
import com.ssafy.mongttang.service.ReportService;
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
@RequestMapping("/report")
@RequiredArgsConstructor
public class ReportController {
    private final ReportService reportService;
    private static final String MESSAGE = "message";
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @ApiOperation(value = "댓글신고", notes = "댓글을 신고한다.")
    @PostMapping("/comment/{commentId}")
    public ResponseEntity<Map<String, Object>> reportComment (@PathVariable @ApiParam(value = "신고할 댓글 아이디", example = "1") int commentId,
                                                              @RequestParam @ApiParam(value = "신고자 아이디", example = "1") int userId,
                                                              @RequestBody @ApiParam(value = "신고내용") ReqReportCommentDto reqReportCommentDto, Principal principal) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        int cnt = reportService.reportComment(commentId, userId, reqReportCommentDto);
        if(cnt == 1){
            resultMap.put(MESSAGE, SUCCESS);
            resultMap.put("isReported", true);
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        } else if(cnt == 0) {
            resultMap.put(MESSAGE, FAIL);
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        } else {
            resultMap.put(MESSAGE, "이미 신고한 회원입니다");
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "신고된 댓글 조회", notes = "신고된 댓글을 조회한다.")
    @GetMapping("/comment")
    public ResponseEntity<Map<String, Object>> getReportComments () {
        Map<String, Object> resultMap = new HashMap<>();

        List<ResponseReportCommentInfoDto> result = reportService.getReportComments();
        if(result != null){
            resultMap.put(MESSAGE, SUCCESS);
            resultMap.put("commentreports", result);
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        }
        resultMap.put(MESSAGE, FAIL);
        return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
    }

    @ApiOperation(value = "동화신고", notes = "동화를 신고한다.")
    @PostMapping("/book/{bookId}")
    public ResponseEntity<Map<String, Object>> reportBook (@PathVariable @ApiParam(value = "신고할 동화아이디", example = "1") int bookId,
                                                           @RequestParam @ApiParam(value = "신고자 아이디", example = "1") int userId,
                                                           @RequestBody @ApiParam(value = "신고내용") ReqReportBookDto reqReportBookDto, Principal principal) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        int cnt = reportService.reportBook(bookId, userId, reqReportBookDto);
        if(cnt == 1){
            resultMap.put(MESSAGE, SUCCESS);
            resultMap.put("isReported", true);
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        } else if(cnt == 0) {
            resultMap.put(MESSAGE, FAIL);
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        } else {
            resultMap.put(MESSAGE, "이미 신고한 회원입니다");
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "신고된 동화 조회", notes = "신고된 동화를 조회한다.")
    @GetMapping("/book")
    public ResponseEntity<Map<String, Object>> getReportBooks () {
        Map<String, Object> resultMap = new HashMap<>();

        List<ResponseReportBookInfoDto> result = reportService.getReportBooks();
        if(result != null){
            resultMap.put(MESSAGE, SUCCESS);
            resultMap.put("bookreports", result);
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        }
        resultMap.put(MESSAGE, FAIL);
        return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
    }
}
