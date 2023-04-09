package com.ssafy.mongttang.service;

import com.ssafy.mongttang.dto.*;
import com.ssafy.mongttang.entity.*;
import com.ssafy.mongttang.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ProfileService {

    private final FollowRepository followRepository;
    private final UserRepository userRepository;
    private final InterestBookRepository interestBookRepository;
    private final BookRepository bookRepository;
    private final IllustRepository illustRepository;
    private final PaidBookRepositoy paidBookRepositoy;
    private final BookLikeRepository bookLikeRepository;
    private final CommentRepository commentRepository;

    public Follow createFollow(int followFromId, int followToId) {
        User followFrom = userRepository.findByUserId(followFromId);
        User followTo = userRepository.findByUserId(followToId);
        if(followFrom == null || followTo == null) return null;
        else{
            Follow follow = followRepository.findByFollowFromAndFollowTo(followFrom,followTo);
            if(follow == null){
                return followRepository.save(new Follow(followFrom,followTo));
            }
            return null;
        }
    }

    public int cancleFollow(int followFromId, int followToId) {
        User followFrom = userRepository.findByUserId(followFromId);
        User followTo = userRepository.findByUserId(followToId);
        if(followFrom == null || followTo == null) return 0;
        else{
            Follow follow = followRepository.findByFollowFromAndFollowTo(followFrom,followTo);
            if(follow == null) return 0;
            else{
                followRepository.delete(follow);
                return 1;
            }
        }
    }

    public List<ResponseFollowingDto> getFollowing(int userId) {
        User user = userRepository.findByUserId(userId);
        if(user == null) return null;
        else {
            List<Follow> followList = followRepository.findByFollowFrom(user);
            List<ResponseFollowingDto> followings = new ArrayList<>();
            for (Follow follow : followList) {
                ResponseFollowingDto responseFollowingDto = new ResponseFollowingDto(follow.getFollowTo());
                followings.add(responseFollowingDto);
            }
            return followings;
        }
    }

    public List<ResponseFollowerDto> getFollower(int userId) {
        User user = userRepository.findByUserId(userId);
        if(user == null) return null;
        else {
            List<Follow> followList = followRepository.findByFollowTo(user);
            List<ResponseFollowerDto> followers = new ArrayList<>();
            for (Follow follow : followList) {
                ResponseFollowerDto responseFollowerDto = new ResponseFollowerDto(follow.getFollowFrom());
                followers.add(responseFollowerDto);
            }
            return followers;
        }
    }


    public InterestBook createInterest(int userId, int bookId) {
        User user = userRepository.findByUserId(userId);
        //동화 있는지 확인
        Book book = bookRepository.findByBookId(bookId);

        if(user == null || book == null) return null;
        else{
            InterestBook interestBook = interestBookRepository.findByInterestbookUserIdAndInterestbookBookId(user,book);
            if(interestBook == null){
                return interestBookRepository.save(new InterestBook(user, book));
            }
            return null;
        }
    }

    public int cancleInterest(int userId, int bookId) {
        User user = userRepository.findByUserId(userId);
        //동화 있는지 확인
        Book book = bookRepository.findByBookId(bookId);

        if(user == null || book == null) return 0;
        else{
            InterestBook interestBook = interestBookRepository.findByInterestbookUserIdAndInterestbookBookId(user, book);
            if(interestBook == null) return 0;
            else{
                interestBookRepository.delete(interestBook);
                return 1;
            }
        }
    }

    public ResponseProfileDto getProfile(int userId, int lookUserId) {
        //보고자 하는 사용자의 정보
        User user = userRepository.findByUserId(userId);
        ResponseProfileDto responseProfileDto = new ResponseProfileDto(user, followRepository.findByFollowTo(user).size(),followRepository.findByFollowFrom(user).size());

        //내 프로필일 경우
        if(userId == lookUserId){
            //완료된 책목록
            ArrayList<ResponseChallengeBookInfoDto> inCompleteBookInfos = new ArrayList<>();
            ArrayList<Book> inCompleteBooks = bookRepository.findByBookUserIdAndBookStatus(user,"temporary");
            toBookInfoList(lookUserId, inCompleteBooks, inCompleteBookInfos);

            //구매한 책목록
            ArrayList<ResponseChallengeBookInfoDto> paidBookInfos = new ArrayList<>();
            ArrayList<PaidBook> paidBooks = paidBookRepositoy.findByPaidbookUserId(user);
            toPaidBookInfoList(lookUserId, paidBooks, paidBookInfos);

            responseProfileDto.addMyprofileInfo(inCompleteBookInfos,paidBookInfos);
        }

        //다른 사람의 프로필일 경우
        else {
            User lookUser = userRepository.findByUserId(lookUserId);

            boolean isFollow = true;
            if(followRepository.findByFollowFromAndFollowTo(lookUser,user) == null) isFollow = false;

            responseProfileDto.addIsFollow(isFollow);
        }

        //해당 프로필 회원의 동화
        ArrayList<ResponseChallengeBookInfoDto> myBookInfos = new ArrayList<>();
        ArrayList<Book> myBooks = bookRepository.findByBookUserIdAndBookStatus(user,"complete");
        toBookInfoList(lookUserId, myBooks, myBookInfos);

        //해당 프로필 회원의 관심 동화
        ArrayList<ResponseChallengeBookInfoDto> interestBookInfos = new ArrayList<>();
        ArrayList<InterestBook> interestBooks = interestBookRepository.findByInterestbookUserId(user);
        toInterestBookInfoList(lookUserId, interestBooks, interestBookInfos);

        responseProfileDto.addMyBooksAndInterestBooks(myBookInfos,interestBookInfos);

        return responseProfileDto;
    }



    private void toBookInfoList(int userId, ArrayList<Book> bookList, List<ResponseChallengeBookInfoDto> bookResult) {
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
    private void toPaidBookInfoList(int userId, ArrayList<PaidBook> paidBookList, List<ResponseChallengeBookInfoDto> bookResult) {
        for(PaidBook paidBook: paidBookList) {
            Book book = bookRepository.findByBookId(paidBook.getBookId());
            //동화 표지 가져요기
            String coverImgPath = illustRepository.findCoverIllust(book.getBookId());
            //댓글 개수 가져오기
            int numOfComment = commentRepository.countByCommentBookId_BookId(book.getBookId());
            //좋아요 개수 가져오기
            int numOfLike = bookLikeRepository.countByBooklikeBookId_BookId(book.getBookId()) - 1;
            //좋아요 여부 가져오기
            BookLike bookLike = bookLikeRepository.findByBooklikeBookId_BookIdAndBooklikeUserId(book.getBookId(), userId);
            bookResult.add(new ResponseChallengeBookInfoDto(book, coverImgPath, numOfComment, numOfLike, (bookLike == null) ? false : true));
        }
    }
    private void toInterestBookInfoList(int userId, ArrayList<InterestBook> interestBookList, ArrayList<ResponseChallengeBookInfoDto> bookResult) {
        for(InterestBook interestBook: interestBookList) {
            //동화 표지 가져요기
            String coverImgPath = illustRepository.findCoverIllust(interestBook.getInterestbookBookId().getBookId());
            //댓글 개수 가져오기
            int numOfComment = commentRepository.countByCommentBookId_BookId(interestBook.getInterestbookBookId().getBookId());
            //좋아요 개수 가져오기
            int numOfLike = bookLikeRepository.countByBooklikeBookId_BookId(interestBook.getInterestbookBookId().getBookId()) - 1;
            //좋아요 여부 가져오기
            BookLike bookLike = bookLikeRepository.findByBooklikeBookIdAndBooklikeUserId(interestBook.getInterestbookBookId(), userId);
            bookResult.add(new ResponseChallengeBookInfoDto(interestBook.getInterestbookBookId(), coverImgPath, numOfComment, numOfLike, (bookLike == null) ? false : true));
        }
    }
}
