package com.ssafy.mongttang.service;

import com.ssafy.mongttang.dto.ReqChallengeCreateFormDto;
import com.ssafy.mongttang.dto.ResponseBookInfoDto;
import com.ssafy.mongttang.dto.ResponseChallengeInfoDto;
import com.ssafy.mongttang.dto.ResponseChallengeUpdateDto;
import com.ssafy.mongttang.entity.Book;
import com.ssafy.mongttang.entity.Challenge;
import com.ssafy.mongttang.entity.Comment;
import com.ssafy.mongttang.repository.BookRepository;
import com.ssafy.mongttang.repository.ChallengRepository;
import com.ssafy.mongttang.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final ChallengRepository challengRepository;
    private final BookRepository bookRepository;
    private final CommentRepository commentRepository;

    private final RedisTemplate redisTemplate;

    @Transactional
    public ResponseChallengeInfoDto addNewChallenge(ReqChallengeCreateFormDto reqChallengeCreateFormDto) {
        return new ResponseChallengeInfoDto(challengRepository.save(reqChallengeCreateFormDto.toEntity()));
    }

    @Transactional
    public List<ResponseChallengeUpdateDto> updateChallenge(int challengeId, ReqChallengeCreateFormDto reqChallengeCreateFormDto) {
        Optional<Challenge> challenge = challengRepository.findById(challengeId);
        if(!challenge.isPresent()) return null;
        challenge.get().update(reqChallengeCreateFormDto);

        challengRepository.save(challenge.get());
        return getChallenges();
    }

    public List<ResponseChallengeUpdateDto> getChallenges() {
        return challengRepository.findAll().stream()
                .map(challenge -> new ResponseChallengeUpdateDto(challenge)).collect(Collectors.toList());
    }

    public List<ResponseChallengeUpdateDto>  deleteChallenge(int challengeId) {
        Optional<Challenge> challenge = challengRepository.findById(challengeId);
        if(!challenge.isPresent()) return null;
        challengRepository.deleteById(challengeId);

        return getChallenges();
    }

    public int deleteBook(int bookId) {
        Book book = bookRepository.findByBookId(bookId);
        if(book == null) return 0;
        bookRepository.delete(book);
        return 1;
    }

    public int deleteComment(int commentId) {
        Comment comment = commentRepository.findCommentByCommentId(commentId);
        if(comment == null) return 0;
        commentRepository.delete(comment);
        return 1;
    }

    public int discountBook(int bookId, LocalDateTime endDate) {
        Long curTime = Timestamp.valueOf(LocalDateTime.now()).getTime();
        Long endTime = Timestamp.valueOf(endDate).getTime();
        Book book = bookRepository.findByBookId(bookId);
        if(book == null) return 0;
        Long expiration = endTime - curTime;
        redisTemplate.opsForValue()
                .set("DC:" + bookId, String.valueOf(endTime), expiration, TimeUnit.MILLISECONDS);
        return 1;
    }

    public List<ResponseBookInfoDto> getBooks() {
        List<Book> bookList = bookRepository.findAllBooks();
        List<ResponseBookInfoDto> resultBooks = new ArrayList<>();
        for(Book book: bookList){
            if((redisTemplate.opsForValue().get("DC:" + book.getBookId())) != null) {
                resultBooks.add(new ResponseBookInfoDto(book, "discount"));
                continue;
            }
            if((redisTemplate.opsForValue().get("FREE:" + book.getBookId())) != null){
                resultBooks.add(new ResponseBookInfoDto(book, "free"));
                continue;
            }
            resultBooks.add(new ResponseBookInfoDto(book, "pay"));
        }
        return resultBooks;
    }

    public Book changeBookStatus(int bookId) {
        Book book = bookRepository.findByBookId(bookId);
        if(book == null) return null;
        book.changeStatus();
        return bookRepository.save(book);
    }

    public Comment changeCommentStatus(int commentId) {
        Comment comment = commentRepository.findCommentByCommentId(commentId);
        if(comment == null) return null;
        comment.changeStatus();
        return commentRepository.save(comment);
    }
}
