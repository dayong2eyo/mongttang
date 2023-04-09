package com.ssafy.mongttang.controller;


import com.ssafy.mongttang.dto.ReqNoticeCreateFormDto;
import com.ssafy.mongttang.dto.ResponseNoticeDetailDto;
import com.ssafy.mongttang.dto.ReqNoticeUpdateFormDto;
import com.ssafy.mongttang.dto.ResponseNoticeInfoDto;
import com.ssafy.mongttang.entity.Notice;
import com.ssafy.mongttang.service.NoticeService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/notice")
public class NoticeController {
    private NoticeService noticeService;

    public NoticeController(NoticeService noticeService) {
        this.noticeService = noticeService;
    }

    private static final String MESSAGE = "message";
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private static final String NOTICES = "notices";

    //공지사항 목록
    @ApiOperation(value = "공지사항 목록 조회(페이징)", notes = "공지사항 목록 페이징", response = Page.class)
    @GetMapping("/page")
    public ResponseEntity<Map<String, Object>> getNoticeList(@RequestParam(value = "page", defaultValue = "0") int page,
                                                      @RequestParam(value = "limit", defaultValue = "10") int limit) {
        Map<String, Object> map = new HashMap<>();

        Page<ResponseNoticeInfoDto> noticeList = noticeService.getNoticeList(page, limit);
        if(noticeList != null){
            map.put(MESSAGE, SUCCESS);
            map.put(NOTICES, noticeList);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.put(MESSAGE, FAIL);
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "공지사항 목록 조회", notes = "공지사항 목록", response = Page.class)
    @GetMapping()
    public ResponseEntity<Map<String, Object>> getNotices() {
        Map<String, Object> map = new HashMap<>();

        List<ResponseNoticeDetailDto> noticeList = noticeService.getNotices();
        if (noticeList != null) {
            map.put(MESSAGE, SUCCESS);
            map.put(NOTICES, noticeList);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.put(MESSAGE, FAIL);
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
    }

    //공지사항 등록
    @ApiOperation(value = "공지사항 등록", notes = "새로운 공지사항 등록, DB입력 성공여부에 따라 'success' 또는 'fail' 반환")
    @PostMapping()
    public ResponseEntity<Map<String, Object>> writeNotice(@Valid @RequestBody @ApiParam (value = "새 공지사항 정보 담은 dto") ReqNoticeCreateFormDto reqNoticeCreateFormDto) {
        Map<String, Object> map = new HashMap<>();
        Notice notice = noticeService.createNotice(reqNoticeCreateFormDto);
        if( notice != null) {
            map.put(MESSAGE, SUCCESS);
            map.put("noticeId", notice.getNoticeId());
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.put(MESSAGE, FAIL);
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
    }

    //공지사항 조회
    @ApiOperation(value = "공지사항 상세 조회", notes = "공지사항 번호에 해당하는 공지사항 정보 반환")
    @GetMapping("/{noticeId}")
    public ResponseEntity<Map<String, Object>> getNotice(@PathVariable @ApiParam(value = "조회할 공지사항 번호", example = "0") int noticeId) {
        Map<String, Object> map = new HashMap<>();
        ResponseNoticeDetailDto notice = noticeService.getNotice(noticeId);
        if(notice != null) {
            map.put(MESSAGE, SUCCESS);
            map.put("notice", notice);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.put(MESSAGE, FAIL);
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
    }

    //공지사항 수정
    @ApiOperation(value = "공지사항 글 수정", notes = "수정할 공지사항 정보 입력")
    @PatchMapping("/{noticeId}")
    public ResponseEntity<Map<String, Object>> updateNotice(@PathVariable int noticeId,
                                                            @Valid @RequestBody @ApiParam(value = "수정 글 정보 담은 dto") ReqNoticeUpdateFormDto reqNoticeUpdateFormDto) {
        Map<String, Object> map = new HashMap<>();

        List<ResponseNoticeDetailDto> afterUpdatedNotices = noticeService.updateNotice(noticeId, reqNoticeUpdateFormDto);
        if(afterUpdatedNotices != null) {
            map.put(MESSAGE, SUCCESS);
            map.put(NOTICES, afterUpdatedNotices);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.put(MESSAGE, FAIL);
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }

    }

    //공지사항 삭제
    @ApiOperation(value = "공지사항 삭제", notes = "공지사항 번호에 해당하는 공지사항 정보 삭제, DB에서 삭제 여부에 따라 'success' 또는 'fail' 반환")
    @DeleteMapping("/{noticeId}")
    public ResponseEntity<Map<String, Object>> deleteNotice(@PathVariable @ApiParam(value = "삭제할 공지사항 번호", example = "0") int noticeId) {
        Map<String, Object> map = new HashMap<>();
        List<ResponseNoticeDetailDto> afterDeletedNotices = noticeService.deleteNotice(noticeId);
        if(afterDeletedNotices != null) {
            map.put(MESSAGE, SUCCESS);
            map.put(NOTICES, afterDeletedNotices);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.put(MESSAGE, FAIL);
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
    }
}
