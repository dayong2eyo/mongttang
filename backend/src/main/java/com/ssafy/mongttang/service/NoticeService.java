package com.ssafy.mongttang.service;


import com.ssafy.mongttang.dto.ReqNoticeCreateFormDto;
import com.ssafy.mongttang.dto.ResponseNoticeDetailDto;
import com.ssafy.mongttang.dto.ReqNoticeUpdateFormDto;
import com.ssafy.mongttang.dto.ResponseNoticeInfoDto;
import com.ssafy.mongttang.entity.Notice;
import com.ssafy.mongttang.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoticeService {
    private final NoticeRepository noticeRepository;

    @Transactional
    public Notice createNotice(ReqNoticeCreateFormDto reqNoticeCreateFormDto) {
        return noticeRepository.save(reqNoticeCreateFormDto.toEntity());
    }

    public ResponseNoticeDetailDto getNotice(int noticeId) {
        Optional<Notice> notice = noticeRepository.findById(noticeId);
        if(notice.isPresent()) {
            return new ResponseNoticeDetailDto(notice.get());
        } else {
            return null;
        }
    }

    public Page<ResponseNoticeInfoDto> getNoticeList(int page, int limit) {
        Pageable paging = PageRequest.of(page, limit, Sort.Direction.DESC, "createdTime");
        Page<ResponseNoticeInfoDto> noticeList = noticeRepository.findAll(paging).map(notice-> new ResponseNoticeInfoDto(notice));
        return noticeList;
    }

    @Transactional
    public List<ResponseNoticeDetailDto> updateNotice(int noticeId, ReqNoticeUpdateFormDto reqNoticeUpdateFormDto) {
        Optional<Notice> notice = noticeRepository.findById(noticeId);
        if(!notice.isPresent()) return null;

        notice.get().update(reqNoticeUpdateFormDto);
        noticeRepository.save(notice.get());

        return getNotices();
    }

    @Transactional
    public List<ResponseNoticeDetailDto> deleteNotice(int noticeId) {
        Optional<Notice> notice = noticeRepository.findById(noticeId);
        if(notice.isPresent()) {
            noticeRepository.deleteById(noticeId);
            return getNotices();
        } else {
            return null;
        }
    }

    public List<ResponseNoticeDetailDto> getNotices() {
        List<ResponseNoticeDetailDto> responseNoticeDetailDtoList = noticeRepository.findAll().stream().map(notice -> new ResponseNoticeDetailDto(notice)).collect(Collectors.toList());
        return responseNoticeDetailDtoList;
    }
}
