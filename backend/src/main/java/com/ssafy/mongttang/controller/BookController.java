package com.ssafy.mongttang.controller;

import com.ssafy.mongttang.dto.*;
import com.ssafy.mongttang.entity.*;
import com.ssafy.mongttang.service.BookService;
import com.ssafy.mongttang.util.TokenUtils;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/book")
@RequiredArgsConstructor
public class BookController {
    private static final String MESSAGE = "message";
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private static final String ISLIKED = "isLiked";

    private static final String COMMENTS = "comments";
    private final BookService bookService;

    @ApiOperation(value = "동화 저장(작성 완료 + 임시저장)", notes = "그림 작가가 처음 작성한 그림을 저장한다.", response = Map.class)
    @PostMapping("/draw/{userId}")
    public ResponseEntity<Map<String,Object>> createBook(@ApiParam(value = "등록된 사진 리스트", required = true, example = "0")
                                                           @RequestPart(value = "imgList", required = false) List<MultipartFile> imgList,
                                                           @Valid @ApiParam(value = "챌린지 아이디, 동화 제목, 줄거리, 내용, 작가, 완료여부", required = true, example = "0")
                                                           @RequestPart(value = "BookContent", required = false) ReqCreateBookDto reqCreateBookDto,
                                                           @ApiParam(value = "작가 아이디", required = true, example = "0")
                                                           @PathVariable int userId, Principal principal){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        log.info("[createBook] 동화 저장 호출 Controller");

        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        try {
            int bookId = bookService.createBook(userId,reqCreateBookDto,imgList);
            if(bookId > 0){
                resultMap.put(MESSAGE,SUCCESS);
                resultMap.put("bookId",bookId);
                status = HttpStatus.OK;
            }else{
                resultMap.put(MESSAGE, FAIL);
                status = HttpStatus.BAD_REQUEST;
            }
        } catch (IOException e) {
            resultMap.put(MESSAGE, FAIL);
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "동화 수정(작성 완료 + 임시저장)", notes = "그림 작가가 임시저장한 그림을 저장한다.", response = Map.class)
    @PatchMapping("/draw/{userId}")
    public ResponseEntity<Map<String,Object>> updateBook(@ApiParam(value = "등록된 사진 리스트", required = true, example = "0")
                                                         @RequestPart(value = "imgList", required = false) List<MultipartFile> imgList,
                                                         @Valid @ApiParam(value = "챌린지 아이디, 동화 아이디, 동화 제목, 줄거리, 내용, 작가", required = true, example = "0")
                                                         @RequestPart(value = "BookContent", required = false) ReqUpdateBookDto reqUpdateBookDto,
                                                         @ApiParam(value = "작가 아이디", required = true, example = "0")
                                                         @PathVariable int userId, Principal principal){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        if(imgList != null){
            try {
                int bookId = bookService.updateBook(userId,reqUpdateBookDto,imgList);
                if(bookId > 0){
                    resultMap.put(MESSAGE,SUCCESS);
                    resultMap.put("bookId",bookId);
                    status = HttpStatus.OK;
                }else{
                    resultMap.put(MESSAGE, FAIL);
                    status = HttpStatus.BAD_REQUEST;
                }
            } catch (IOException e) {
                resultMap.put(MESSAGE, FAIL);
                status = HttpStatus.BAD_REQUEST;
            }
        }else{
            resultMap.put(MESSAGE, FAIL);
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "작가 동화 삭제", notes = "임시저장 한 동화를 삭제한다.", response = Map.class)
    @DeleteMapping("/draw/{userId}")
    public ResponseEntity<Map<String,Object>> deleteBook(@ApiParam(value = "작가 아이디", required = true, example = "0") @PathVariable int userId,
                                                                 @ApiParam(value = "동화 아이디", required = true, example = "0") @RequestParam int bookId, Principal principal){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        int isDeleted= bookService.deleteBook(userId,bookId);

        if(isDeleted > 0){
            resultMap.put(MESSAGE,SUCCESS);
            status = HttpStatus.OK;
        }else{
            resultMap.put(MESSAGE, FAIL);
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "동화 좋아요 등록", notes = "동화 좋아요를 등록한다.", response = Map.class)
    @PostMapping("/booklike")
    public ResponseEntity<Map<String,Object>> createBookLike(@ApiParam(value = "회원 아이디", required = true, example = "0") @RequestParam int userId,
                                                           @ApiParam(value = "동화 아이디", required = true, example = "0") @RequestParam int bookId, Principal principal){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        BookLike bookLike = bookService.createBookLike(userId,bookId);

        if(bookLike != null){
            resultMap.put(MESSAGE,SUCCESS);
            resultMap.put(ISLIKED,true);
            status = HttpStatus.OK;
        }else{
            resultMap.put(MESSAGE, FAIL);
            resultMap.put(ISLIKED,false);
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "동화 좋아요 취소", notes = "동화 좋아요를 취소한다.", response = Map.class)
    @DeleteMapping("/booklike")
    public ResponseEntity<Map<String,Object>> cancleBookLike(@ApiParam(value = "회원 아이디", required = true, example = "0") @RequestParam int userId,
                                                             @ApiParam(value = "동화 아이디", required = true, example = "0") @RequestParam int bookId, Principal principal){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        int isDeleted = bookService.cancleBookLike(userId,bookId);

        if(isDeleted > 0){
            resultMap.put(MESSAGE,SUCCESS);
            resultMap.put(ISLIKED,false);
            status = HttpStatus.OK;
        }else{
            resultMap.put(MESSAGE, FAIL);
            resultMap.put(ISLIKED,true);
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "댓글 등록", notes = "댓글을 등록한다.", response = Map.class)
    @PostMapping("/comment")
    public ResponseEntity<Map<String, Object>> createComment(@ApiParam(value = "회원 아이디, 동화 아이디, 댓글 내용 dto") @RequestBody ReqCreateCommentDto reqCreateCommentDto, Principal principal) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(TokenUtils.compareUserIdAndToken(reqCreateCommentDto.getCommentUserId(), principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        ArrayList<ResponseCommentDto> comments = bookService.createComment(reqCreateCommentDto);

        if(comments == null){
            resultMap.put(MESSAGE, FAIL);
            status = HttpStatus.BAD_REQUEST;
        }else{
            resultMap.put(MESSAGE,SUCCESS);
            resultMap.put(COMMENTS,comments);
            status = HttpStatus.OK;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "댓글 수정", notes = "댓글을 수정한다.", response = Map.class)
    @PatchMapping("/comment")
    public ResponseEntity<Map<String, Object>> updateComment(@ApiParam(value = "댓글 아이디, 회원 아이디, 동화 아이디, 댓글 내용 dto") @RequestBody ReqUpdateCommentDto reqUpdateCommentDto, Principal principal) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(TokenUtils.compareUserIdAndToken(reqUpdateCommentDto.getCommentUserId(), principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        ArrayList<ResponseCommentDto> comments = bookService.updateComment(reqUpdateCommentDto);

        if(comments == null){
            resultMap.put(MESSAGE, FAIL);
            status = HttpStatus.BAD_REQUEST;
        }else{
            resultMap.put(MESSAGE,SUCCESS);
            resultMap.put(COMMENTS,comments);
            status = HttpStatus.OK;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "댓글 삭제", notes = "댓글을 삭제한다.", response = Map.class)
    @DeleteMapping("/comment/{commentId}")
    public ResponseEntity<Map<String, Object>> deleteComment(@ApiParam(value = "댓글 아이디") @PathVariable int commentId,
                                                             @ApiParam(value = "회원 아이디") @RequestParam int commentUserId,Principal principal) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(TokenUtils.compareUserIdAndToken(commentUserId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        ArrayList<ResponseCommentDto> comments = bookService.deleteComment(commentId, commentUserId);

        if(comments == null){
            resultMap.put(MESSAGE, FAIL);
            status = HttpStatus.BAD_REQUEST;
        }else{
            resultMap.put(MESSAGE,SUCCESS);
            resultMap.put(COMMENTS,comments);
            status = HttpStatus.OK;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "댓글 좋아요 등록", notes = "댓글 좋아요를 등록한다.", response = Map.class)
    @PostMapping("/commentlike")
    public ResponseEntity<Map<String,Object>> createCommentLike(@ApiParam(value = "회원 아이디", required = true, example = "0") @RequestParam int userId,
                                                             @ApiParam(value = "댓글 아이디", required = true, example = "0") @RequestParam int commentId, Principal principal){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        CommentLike commentLike = bookService.createCommentLike(userId,commentId);

        if(commentLike != null){
            resultMap.put(MESSAGE,SUCCESS);
            resultMap.put(ISLIKED,true);
            status = HttpStatus.OK;
        }else{
            resultMap.put(MESSAGE, FAIL);
            resultMap.put(ISLIKED,false);
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "댓글 좋아요 취소", notes = "댓글 좋아요를 취소한다.", response = Map.class)
    @DeleteMapping("/commentlike")
    public ResponseEntity<Map<String,Object>> deleteCommentLike(@ApiParam(value = "회원 아이디", required = true, example = "0") @RequestParam int userId,
                                                                @ApiParam(value = "댓글 아이디", required = true, example = "0") @RequestParam int commentId, Principal principal){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        int isDeleted = bookService.deleteCommentLike(userId,commentId);

        if(isDeleted > 0){
            resultMap.put(MESSAGE,SUCCESS);
            resultMap.put(ISLIKED,false);
            status = HttpStatus.OK;
        }else{
            resultMap.put(MESSAGE, FAIL);
            resultMap.put(ISLIKED,true);
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<>(resultMap, status);
    }
    @ApiOperation(value = "동화 검색", notes = "제목으로 동화를 검색한다.", response = Map.class)
    @GetMapping("/search")
    public ResponseEntity<Map<String,Object>> searchBookByTitle(@ApiParam(value = "검색 내용", required = true) @RequestParam String bookTitle, Principal principal){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        int userId = -1;

        if(principal != null){
            userId = Integer.valueOf(principal.getName());
        }

        List<ResponseChallengeBookInfoDto> searchList = bookService.searchBookByTitle(bookTitle, userId);
        if(searchList != null){
            resultMap.put(MESSAGE,SUCCESS);
            resultMap.put("searchList", searchList);
            status = HttpStatus.OK;
        }else{
            resultMap.put(MESSAGE, FAIL);
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "동화 접근 가능 여부 조회", notes = "사용자의 해당 동화 접근 가능 여부를 조회한다.", response = Map.class)
    @GetMapping("/check/{userId}")
    public ResponseEntity<Map<String,Object>> getIsCanView(@ApiParam(value = "회원 아이디", required = true, example = "0") @PathVariable int userId,
                                                           @ApiParam(value = "동화 아이디", required = true, example = "0") @RequestParam int bookId,Principal principal){

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        boolean isCanView = bookService.getIsCanView(userId,bookId);

        if(isCanView){
            resultMap.put(MESSAGE,SUCCESS);
            resultMap.put("isCanView",true);
            status = HttpStatus.OK;
        }else{
            resultMap.put(MESSAGE, FAIL);
            resultMap.put("isCanView",false);
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "동화 구매내역 저장", notes = "동화 구매 내역을 저장한다.", response = Map.class)
    @PostMapping("/pay/{userId}")
    public ResponseEntity<Map<String,Object>> savePaidBook(@ApiParam(value = "회원 아이디", required = true, example = "0") @PathVariable int userId,
                                                           @ApiParam(value = "동화 아이디", required = true, example = "0") @RequestParam int bookId,Principal principal){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        PaidBook paidBook = bookService.savePaidBook(userId,bookId);

        if(paidBook == null){
            resultMap.put(MESSAGE, FAIL);
            status = HttpStatus.BAD_REQUEST;
        }else{
            resultMap.put(MESSAGE,SUCCESS);
            status = HttpStatus.OK;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "동화 뷰어 조회", notes = "동화 그림을 조회한다.", response = Map.class)
    @GetMapping("/viewer/{bookId}")
    public ResponseEntity<Map<String,Object>> getBookIllust(@ApiParam(value = "동화 아이디", required = true, example = "0") @PathVariable int bookId){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        log.info("[getBookIllust] 동화 뷰어 호출 Controller");
        ArrayList<IllustInfo> illustes = bookService.getBookIllust(bookId);

        if(illustes == null){
            resultMap.put(MESSAGE, FAIL);
            status = HttpStatus.BAD_REQUEST;
        }else{
            resultMap.put(MESSAGE,SUCCESS);
            resultMap.put("illustes",illustes);
            status = HttpStatus.OK;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "동화 상세 정보 조회", notes = "동화 상세정보를 조회한다.", response = Map.class)
    @GetMapping("/{userId}/{bookId}")
    public ResponseEntity<Map<String,Object>> getBookDetail(@ApiParam(value = "회원 아이디", required = true, example = "0") @PathVariable int userId,
                                                            @ApiParam(value = "동화 아이디", required = true, example = "0") @PathVariable int bookId,Principal principal){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        ResponseBookDetailDto responseBookDetailDto = bookService.getBookDetail(userId, bookId);

        if(responseBookDetailDto == null){
            resultMap.put(MESSAGE, FAIL);
            status = HttpStatus.BAD_REQUEST;
        }else{
            resultMap.put(MESSAGE,SUCCESS);
            resultMap.put("bookDetail",responseBookDetailDto);
            status = HttpStatus.OK;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "동화 상세 정보 조회 + 이미지", notes = "동화 상세정보 및 그림를 조회한다.", response = Map.class)
    @GetMapping("/edit/{userId}/{challengeId}")
    public ResponseEntity<Map<String,Object>> getBookEdit(@ApiParam(value = "회원 아이디", required = true, example = "0") @PathVariable int userId,
                                                            @ApiParam(value = "동화 아이디", required = true, example = "0") @PathVariable int challengeId,Principal principal){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        ResponseBookEditDto responseBookEditDto = bookService.getBookEdit(userId, challengeId);

        if(responseBookEditDto == null){
            resultMap.put(MESSAGE, FAIL);
            status = HttpStatus.BAD_REQUEST;
        }else{
            resultMap.put(MESSAGE,SUCCESS);
            resultMap.put("bookEdit",responseBookEditDto);
            status = HttpStatus.OK;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "nftId 저장", notes = "생성된 nft토큰 번호를 저장한다.", response = Map.class)
    @PostMapping("/token")
    public ResponseEntity<Map<String,Object>> saveNftId(@ApiParam(value = "동화 아이디", required = true, example = "0") @RequestBody ReqNftIdDto reqNftIdDto){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        log.info("[saveNftId] nftId 저장 호출 Controller : {}" , reqNftIdDto.getNftId());

        Book book = bookService.saveNftId(reqNftIdDto);

        if(book == null){
            resultMap.put(MESSAGE, FAIL);
            status = HttpStatus.BAD_REQUEST;

        }else{
            resultMap.put(MESSAGE,SUCCESS);
            status = HttpStatus.OK;
        }

        return new ResponseEntity<>(resultMap, status);
    }

}
