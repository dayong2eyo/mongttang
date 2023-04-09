package com.ssafy.mongttang.service;


import com.ssafy.mongttang.dto.ResponseChallengeBookInfoDto;
import com.ssafy.mongttang.dto.ResponseChallengeBookInfoNativeDto;
import com.ssafy.mongttang.dto.ResponseThisWeekChallengeDto;
import com.ssafy.mongttang.dto.ResponseThisWeekChallengeNativeDto;
import com.ssafy.mongttang.entity.Book;
import com.ssafy.mongttang.entity.BookLike;
import com.ssafy.mongttang.entity.Challenge;
import com.ssafy.mongttang.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChallengeService {
    private final ChallengRepository challengRepository;
    private final IllustRepository illustRepository;
    private final CommentRepository commentRepository;
    private final BookLikeRepository bookLikeRepository;
    private final BookRepository bookRepository;

    public List<ResponseChallengeBookInfoDto> getBestBooks(int challengeId, int userId) {
        List<Book> bookList = bookLikeRepository.getLikeBook(challengeId);
        if(bookList == null) return null;
        List<ResponseChallengeBookInfoDto> bookResult = new ArrayList<>();
        toChallengeBookInfoList(userId, bookList, bookResult);

        return bookResult;
    }

    public List<ResponseChallengeBookInfoDto> getLatesBooks(int challengeId, int userId) {
        List<Book> bookList = bookRepository.findLatesBooks(challengeId);
        if(bookList == null) return null;
        List<ResponseChallengeBookInfoDto> bookResult = new ArrayList<>();
        toChallengeBookInfoList(userId, bookList, bookResult);

        return bookResult;
    }

    public List<ResponseChallengeBookInfoDto> getLikeBooks(int challengeId, int userId) {
        List<Book> bookList = bookLikeRepository.getCurrentLikedBook(challengeId);
        if(bookList == null) return null;
        List<ResponseChallengeBookInfoDto> bookResult = new ArrayList<>();
        if(!bookList.isEmpty()){
            toChallengeBookInfoList(userId, bookList, bookResult);
        }
        else{
            bookList = bookLikeRepository.findLatesLikedBook(challengeId);
            if(bookList == null) return null;
            toChallengeBookInfoList(userId, bookList, bookResult);
        }

        return bookResult;
    }

    public List<ResponseThisWeekChallengeNativeDto> getBeforeChallenge(int userId) {
        LocalDateTime currentDateTime = LocalDateTime.now();
        List<Challenge> challengeList = challengRepository.findBeforeChallenge(currentDateTime);
        List<ResponseThisWeekChallengeNativeDto> result = new ArrayList<>();
        if(challengeList == null) return null;
        for(Challenge challenge : challengeList){
            // 좋아요 Top3만 가져오기
            // 좋아요 테이블에서 top3의 bookId 조회
            List<BookRepository.BookNativeDto> bookList = bookRepository.findBestBook(challenge.getChallengeId());
            if(bookList == null) return null;
            List<ResponseChallengeBookInfoNativeDto> bookResult = new ArrayList<>();
            toNativeChallengeBookInfoList(userId, bookList, bookResult);
            result.add(new ResponseThisWeekChallengeNativeDto(challenge, bookResult));
        }
        return result;
    }

    public List<ResponseThisWeekChallengeNativeDto> getThisWeekChallenge(int userId) {
        LocalDateTime currentDateTime = LocalDateTime.now();
        List<Challenge> challengeList = challengRepository.findThisWeekChallenge(currentDateTime);
        List<ResponseThisWeekChallengeNativeDto> result = new ArrayList<>();
        if(challengeList == null) return null;
        for(Challenge challenge : challengeList){
            // (좋아요 * 5 + 댓글 * 2 + 조회수) 총합 top3 가져오기
            List<BookRepository.BookNativeDto> bookList = bookRepository.findBestBook(challenge.getChallengeId());
            if(bookList == null) return null;
            List<ResponseChallengeBookInfoNativeDto> bookResult = new ArrayList<>();
            toNativeChallengeBookInfoList(userId, bookList, bookResult);
            result.add(new ResponseThisWeekChallengeNativeDto(challenge, bookResult));
        }
        return result;
    }

    public List<ResponseChallengeBookInfoDto> getBooksByOrder(int challengeId, int userId, String order) {
        List<Book> bookList = null;


        log.info("[getBooksByOrder] 동화 정렬 호출 완료 : {}", order);
        if("lates".equals(order)){
            bookList = bookRepository.findLatesBooks(challengeId);
        } else if("view".equals(order)){
            bookList = bookRepository.findViewsBooks(challengeId);
        } else if("like".equals(order)){
            bookList = bookLikeRepository.getLikeBook(challengeId);
        }

        if(bookList == null) return null;
        List<ResponseChallengeBookInfoDto> bookResult = new ArrayList<>();
        toChallengeBookInfoList(userId, bookList, bookResult);

        return bookResult;
    }

    public ResponseThisWeekChallengeNativeDto getChallengeDetail(int challengeId, int userId) {
        Challenge challenge = challengRepository.findByChallengeId(challengeId);
        if(challenge == null) return null;

        List<BookRepository.BookNativeDto> bookList = bookRepository.findBestBook(challengeId);
        if(bookList == null) return null;

        List<ResponseChallengeBookInfoNativeDto> bookResult = new ArrayList<>();
        toNativeChallengeBookInfoList(userId, bookList, bookResult);

        return new ResponseThisWeekChallengeNativeDto(challenge, bookResult);
    }

    private void toChallengeBookInfoList(int userId, List<Book> bookList, List<ResponseChallengeBookInfoDto> bookResult) {
        for(Book book: bookList) {
            //동화 표지 가져요기
            String coverImgPath = illustRepository.findCoverIllust(book.getBookId());
            //댓글 개수 가져오기
            int numOfComment = commentRepository.countByCommentBookId_BookId(book.getBookId());
            //좋아요 개수 가져오기
            int numOfLike = bookLikeRepository.countByBooklikeBookId_BookId(book.getBookId()) - 1;
            //좋아요 여부 가져오기
            BookLike bookLike = bookLikeRepository.findByBooklikeBookIdAndBooklikeUserId(book, userId);
            bookResult.add(new ResponseChallengeBookInfoDto(book, coverImgPath, numOfComment, numOfLike, (bookLike == null) ? false : true));
        }
    }


    private void toNativeChallengeBookInfoList(int userId, List<BookRepository.BookNativeDto> bookList, List<ResponseChallengeBookInfoNativeDto> bookResult) {
        for(BookRepository.BookNativeDto book: bookList) {
            //동화 표지 가져요기
            String coverImgPath = illustRepository.findCoverIllust(book.getBookId());
            //좋아요 여부 가져오기
            BookLike bookLike = bookLikeRepository.findByBooklikeBookId_BookIdAndBooklikeUserId(book.getBookId(), userId);
            bookResult.add(new ResponseChallengeBookInfoNativeDto(book, coverImgPath, (bookLike == null) ? false : true));
        }
    }


}
