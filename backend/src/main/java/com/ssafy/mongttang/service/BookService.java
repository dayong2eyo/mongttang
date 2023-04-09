package com.ssafy.mongttang.service;

import com.ssafy.mongttang.dto.*;
import com.ssafy.mongttang.entity.*;
import com.ssafy.mongttang.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.Charsets;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Timestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class BookService {
    private final UserRepository userRepository;
    private final ChallengRepository challengeRepository;
    private final BookRepository bookRepository;
    private final IllustRepository illustRepository;
    private final BookLikeRepository bookLikeRepository;
    private final CommentRepository commentRepository;
    private final CommentLikeRepository commentLikeRepository;
    private final CommentReportRepository commentReportRepository;
    private final BookReportRepository bookReportRepository;
    private final PaidBookRepositoy paidBookRepositoy;
    private final InterestBookRepository interestBookRepository;
    private final S3Service s3Service;
    private final RedisTemplate redisTemplate;

    public int createBook(int userId, ReqCreateBookDto reqCreateBookDto, List<MultipartFile> imgList) throws IOException {
        User user = userRepository.findByUserId(userId);
        Challenge challenge = challengeRepository.findByChallengeId(reqCreateBookDto.getChallengeId());
        log.info("[createBook] 동화 저장 호출 : {}",imgList.size());

        if (user == null || challenge == null) return 0;

        Book book = bookRepository.save(new Book(challenge, user, reqCreateBookDto));


        if (book == null) return 0;
        else {
            ArrayList<String> imgPathList = s3Service.uploadBook(imgList, book.getBookChallengeId().getChallengeId(), book.getBookId());
            if (imgPathList == null || imgPathList.isEmpty()) return 0;

            ArrayList<Illust> illustList = savePhoto(book, imgList, imgPathList);
            if (illustList.size() == imgList.size()){
                if(book.getBookStatus().equals("complete")){
                    registFree(book.getBookId(),book.getBookChallengeId().getChallengeEndDate());
                    bookLikeRepository.save(new BookLike(book, 0, reqCreateBookDto.getChallengeId()));
                }

                return book.getBookId();
            }
            else {
                bookRepository.delete(book);
                s3Service.deleteFolder("books/" + reqCreateBookDto.getChallengeId() + "/" + book.getBookId());

                return 0;
            }
        }
    }

    public int updateBook(int userId, ReqUpdateBookDto reqUpdateBookDto, List<MultipartFile> imgList) throws IOException {
        User user = userRepository.findByUserId(userId);
        Challenge challenge = challengeRepository.findByChallengeId(reqUpdateBookDto.getChallengeId());
        Book book = bookRepository.findByBookId(reqUpdateBookDto.getBookId());
        if (user == null || challenge == null || book == null || book.getBookStatus().equals("complete")
                || user.getUserId() != book.getBookUserId().getUserId()) return 0;

        book.changeContent(reqUpdateBookDto);

        bookRepository.save(book);
        ArrayList<String> imgPathList = s3Service.uploadBook(imgList, book.getBookChallengeId().getChallengeId(), book.getBookId());
        if (imgPathList == null || imgPathList.isEmpty()) return 0;

        ArrayList<Illust> illustList = updatePhoto(book, imgList, imgPathList);
        if (illustList.size() == imgList.size()){
            if(book.getBookStatus().equals("complete")){
                registFree(book.getBookId(),book.getBookChallengeId().getChallengeEndDate());
                bookLikeRepository.save(new BookLike(book, 0, book.getBookChallengeId().getChallengeId()));
            }

            return book.getBookId();
        }
        else {
            bookRepository.delete(book);
            s3Service.deleteFolder("books/" + reqUpdateBookDto.getChallengeId() + "/" + book.getBookId());

            return 0;
        }
    }

    public int deleteBook(int userId, int bookId) {
        Book book = bookRepository.findByBookId(bookId);
        if (book != null && book.getBookStatus().equals("temporary") && userId == book.getBookUserId().getUserId()) {
            s3Service.deleteFolder("books/" + book.getBookChallengeId().getChallengeId() + "/" + book.getBookId());
            bookRepository.delete(book);
            return 1;
        }
        return 0;
    }

    public ArrayList<Illust> savePhoto(Book book, List<MultipartFile> imgList, ArrayList<String> imgPathList) {

        ArrayList<Illust> illustList = new ArrayList<>();

        for (int i = 0; i < imgList.size(); i++) {
            String illustOriginalFilename = imgList.get(i).getOriginalFilename();
            String illustFilePath = imgPathList.get(i);
            illustList.add(illustRepository.save(new Illust(book, illustOriginalFilename, illustFilePath, i)));
        }
        return illustList;
    }

    public ArrayList<Illust> updatePhoto(Book book, List<MultipartFile> imgList, ArrayList<String> imgPathList) {
        illustRepository.deleteByIllustBookId(book);

        ArrayList<Illust> illustList = new ArrayList<>();

        for (int i = 0; i < imgList.size(); i++) {
            String illustOriginalFilename = imgList.get(i).getOriginalFilename();
            String illustFilePath = imgPathList.get(i);
            illustList.add(illustRepository.save(new Illust(book, illustOriginalFilename, illustFilePath, i)));
        }
        return illustList;
    }

    public BookLike createBookLike(int userId, int bookId) {
        User user = userRepository.findByUserId(userId);
        Book book = bookRepository.findByBookId(bookId);

        if (user == null || book == null) return null;
        else {
            BookLike bookLike = bookLikeRepository.findByBooklikeBookIdAndBooklikeUserId(book, userId);
            if (bookLike == null) {
                return bookLikeRepository.save(new BookLike(book, userId, book.getBookChallengeId().getChallengeId()));
            }
            return bookLike;
        }
    }

    public int cancleBookLike(int userId, int bookId) {
        User user = userRepository.findByUserId(userId);
        Book book = bookRepository.findByBookId(bookId);

        if (user == null || book == null) return 0;
        else {
            BookLike bookLike = bookLikeRepository.findByBooklikeBookIdAndBooklikeUserId(book, userId);
            if (bookLike == null) return 0;
            else {
                bookLikeRepository.delete(bookLike);
                return 1;
            }
        }
    }

    public ArrayList<ResponseCommentDto> createComment(ReqCreateCommentDto reqCreateCommentDto) {
        User user = userRepository.findByUserId(reqCreateCommentDto.getCommentUserId());
        Book book = bookRepository.findByBookId(reqCreateCommentDto.getCommentBookId());
        commentRepository.save(new Comment(book, user, reqCreateCommentDto.getCommentContent()));

        ArrayList<Comment> commentList = commentRepository.findByCommentBookId(book);
        ArrayList<ResponseCommentDto> comments = new ArrayList<>();

        for (Comment comment : commentList) {
            int numOfLike = commentLikeRepository.countByCommentlikeCommentId(comment);
            CommentLike commentLike = commentLikeRepository.findByCommentlikeCommentIdAndCommentlikeUserId(comment, reqCreateCommentDto.getCommentUserId());
            boolean isLiked = true;
            if (commentLike == null) isLiked = false;

            CommentReport commentReport = commentReportRepository.findCommentReportByCommentreportCommentId_CommentIdAndCommentreportReportUserId(comment.getCommentId(), reqCreateCommentDto.getCommentUserId());
            boolean isReported = true;
            if (commentReport == null) isReported = false;

            comments.add(new ResponseCommentDto(comment, numOfLike, isLiked, isReported));
        }

        return comments;
    }

    public ArrayList<ResponseCommentDto> updateComment(ReqUpdateCommentDto reqUpdateCommentDto) {
        User user = userRepository.findByUserId(reqUpdateCommentDto.getCommentUserId());
        Book book = bookRepository.findByBookId(reqUpdateCommentDto.getCommentBookId());
        Comment comment = commentRepository.findCommentByCommentId(reqUpdateCommentDto.getCommentId());

        if (comment != null && comment.getCommentUserId() == user && comment.getCommentBookId() == book) {
            comment.changeContent(reqUpdateCommentDto.getCommentContent());
            commentRepository.save(comment);

            ArrayList<Comment> commentList = commentRepository.findByCommentBookId(book);
            ArrayList<ResponseCommentDto> comments = new ArrayList<>();

            for (Comment ment : commentList) {
                int numOfLike = commentLikeRepository.countByCommentlikeCommentId(ment);
                CommentLike commentLike = commentLikeRepository.findByCommentlikeCommentIdAndCommentlikeUserId(ment, reqUpdateCommentDto.getCommentUserId());
                boolean isLiked = true;
                if (commentLike == null) isLiked = false;

                CommentReport commentReport = commentReportRepository.findCommentReportByCommentreportCommentId_CommentIdAndCommentreportReportUserId(ment.getCommentId(), reqUpdateCommentDto.getCommentUserId());
                boolean isReported = true;
                if (commentReport == null) isReported = false;

                comments.add(new ResponseCommentDto(ment, numOfLike, isLiked, isReported));
            }
            return comments;
        }
        return null;
    }

    public ArrayList<ResponseCommentDto> deleteComment(int commentId, int commentUserId) {
        User user = userRepository.findByUserId(commentUserId);
        Comment comment = commentRepository.findCommentByCommentId(commentId);

        if (comment != null && comment.getCommentUserId() == user) {
            commentRepository.delete(comment);

            ArrayList<Comment> commentList = commentRepository.findByCommentBookId(comment.getCommentBookId());
            ArrayList<ResponseCommentDto> comments = new ArrayList<>();

            for (Comment ment : commentList) {
                int numOfLike = commentLikeRepository.countByCommentlikeCommentId(ment);
                CommentLike commentLike = commentLikeRepository.findByCommentlikeCommentIdAndCommentlikeUserId(ment, commentUserId);
                boolean isLiked = true;
                if (commentLike == null) isLiked = false;

                CommentReport commentReport = commentReportRepository.findCommentReportByCommentreportCommentId_CommentIdAndCommentreportReportUserId(ment.getCommentId(), commentUserId);
                boolean isReported = true;
                if (commentReport == null) isReported = false;

                comments.add(new ResponseCommentDto(ment, numOfLike, isLiked, isReported));
            }
            return comments;
        }
        return null;
    }

    public CommentLike createCommentLike(int userId, int commentId) {

        User user = userRepository.findByUserId(userId);
        Comment comment = commentRepository.findCommentByCommentId(commentId);

        if (user == null || comment == null) return null;
        else {
            CommentLike commentLike = commentLikeRepository.findByCommentlikeCommentIdAndCommentlikeUserId(comment, userId);
            if (commentLike == null) {
                return commentLikeRepository.save(new CommentLike(comment, userId));
            }
            return commentLike;
        }
    }

    public int deleteCommentLike(int userId, int commentId) {
        Comment comment = commentRepository.findCommentByCommentId(commentId);

        CommentLike commentLike = commentLikeRepository.findByCommentlikeCommentIdAndCommentlikeUserId(comment, userId);
        if (commentLike == null) return 0;
        commentLikeRepository.delete(commentLike);
        return 1;
    }


    public List<ResponseDiscountBookDto> getDiscountBooks() {
        RedisConnectionFactory connectionFactory = redisTemplate.getConnectionFactory();
        RedisConnection connection = connectionFactory.getConnection();
        ScanOptions options = ScanOptions.scanOptions().match("DC*").build();

        Cursor<byte[]> cursor = connection.scan(options);
        ArrayList<Integer> bookIdList = new ArrayList<>();
        while (cursor.hasNext()) {
            byte[] next = cursor.next();
            String matchedKey = (new String(next, Charsets.UTF_8)).substring(3);
            bookIdList.add(Integer.parseInt(matchedKey));
        }

        return bookRepository.findDiscountBooks(bookIdList).stream()
                .map(book ->
                        new ResponseDiscountBookDto(book, (new Timestamp(Long.valueOf((String) redisTemplate.opsForValue().get("DC:" + book.getBookId())))).toLocalDateTime(), illustRepository.findCoverIllust(book.getBookId())))
                .collect(Collectors.toList());
    }

    public List<ResponseChallengeBookInfoDto> searchBookByTitle(String bookTitle, int userId) {
        List<Book> bookList = bookRepository.searchBooks(bookTitle);
        if (bookList == null) return null;

        List<ResponseChallengeBookInfoDto> bookResult = new ArrayList<>();
        toChallengeBookInfoList(userId, bookList, bookResult);

        return bookResult;
    }

    private void toChallengeBookInfoList(int userId, List<Book> bookList, List<ResponseChallengeBookInfoDto> bookResult) {
        for (Book book : bookList) {
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

    public boolean getIsCanView(int userId, int bookId) {
        User user = userRepository.findByUserId(userId);
        Book book = bookRepository.findByBookId(bookId);
        if (book.getBookChallengeId().getChallengeEndDate().isAfter(LocalDateTime.now())) return true;

        if (paidBookRepositoy.findByPaidbookUserIdAndBookId(user, bookId) == null) {
            return false;
        }
        return true;
    }

    public PaidBook savePaidBook(int userId, int bookId) {
        User user = userRepository.findByUserId(userId);

        PaidBook paidBook = new PaidBook(user, bookId);

        if (paidBookRepositoy.findByPaidbookUserIdAndBookId(user, bookId) == null) {
            return paidBookRepositoy.save(paidBook);
        }
        return null;

    }

    public ArrayList<IllustInfo> getBookIllust(int bookId) {
        Book book = bookRepository.findByBookId(bookId);
        if(book == null) return null;

        book.addViews();
        log.info("[getBookIllust] 동화 뷰어 호출 완료 : {}", book.getBookViews());
        bookRepository.save(book);

        ArrayList<IllustInfo> illustInfos = new ArrayList<>();
        ArrayList<Illust> illusts = illustRepository.findByIllustBookId(book);

        for (Illust illust : illusts) {
            illustInfos.add(new IllustInfo(illust));
        }

        return illustInfos;
    }

    public ResponseBookDetailDto getBookDetail(int userId, int bookId) {

        //동화 기본 정보
        Book book = bookRepository.findByBookId(bookId);
        if(book == null) return null;
        //동화 표지
        String illustPath = illustRepository.findCoverIllust(bookId);
        if(illustPath == null) return null;

        //신고 여부
        boolean isReported = false;
        if(bookReportRepository.findBookReportByBookreportBookIdAndBookreportReportUserId(book,userId) != null)isReported = true;

        //좋아요 여부
        boolean isLiked = false;
        if(bookLikeRepository.findByBooklikeBookIdAndBooklikeUserId(book, userId) != null) isLiked = true;

        //관심동화 여부
        boolean isInterested = false;
        if(interestBookRepository.findByInterestbookUserId_UserIdAndInterestbookBookId(userId, book) != null) isInterested = true;

        //가격
        int price = 200;
        if(((String) redisTemplate.opsForValue().get("DC:" + book.getBookId())) != null) price = 100;
        if(((String) redisTemplate.opsForValue().get("FREE:" + book.getBookId())) != null) price = 0;

        //좋아요 개수
        int numOfLike = bookLikeRepository.countByBooklikeBookId_BookId(book.getBookId()) - 1;

        //댓글 목록
        ArrayList<Comment> commentList = commentRepository.findByCommentBookId(book);
        ArrayList<ResponseCommentDto> comments = new ArrayList<>();

        for (Comment comment : commentList) {
            int numOfCommentLike = commentLikeRepository.countByCommentlikeCommentId(comment);
            CommentLike commentLike = commentLikeRepository.findByCommentlikeCommentIdAndCommentlikeUserId(comment, userId);
            boolean isCommentLiked = true;
            if (commentLike == null) isCommentLiked = false;

            CommentReport commentReport = commentReportRepository.findCommentReportByCommentreportCommentId_CommentIdAndCommentreportReportUserId(comment.getCommentId(), userId);
            boolean isCommentReported = true;
            if (commentReport == null) isCommentReported = false;

            comments.add(new ResponseCommentDto(comment, numOfCommentLike, isCommentLiked, isCommentReported));
        }

        ResponseBookDetailDto responseBookDetailDto = new ResponseBookDetailDto(book, illustPath,isLiked, isReported, isInterested, price,numOfLike, comments);

        return responseBookDetailDto;
    }

    public void registFree(int bookId, LocalDateTime endDate) {
        Long curTime = Timestamp.valueOf(LocalDateTime.now()).getTime();
        Long endTime = Timestamp.valueOf(endDate).getTime();

        Long expiration = endTime - curTime;
        redisTemplate.opsForValue()
                .set("FREE:" + bookId, String.valueOf(endTime), expiration, TimeUnit.MILLISECONDS);

    }

    public ResponseBookEditDto getBookEdit(int userId, int challengeId) {
        //동화 기본 정보
        Challenge challenge = challengeRepository.findByChallengeId(challengeId);
        if(challenge == null) return null;


        return new ResponseBookEditDto(userId,challenge);
    }

    public Book saveNftId(ReqNftIdDto reqNftIdDto) {
        Book book = bookRepository.findByBookId(reqNftIdDto.getBookId());
        if(book == null) return null;

        book.addToken(reqNftIdDto.getNftId());

        log.info("[saveNftId] nftId 저장 호출 Service : {}" , reqNftIdDto.getNftId());
        return bookRepository.save(book);
    }
}
