package com.ssafy.mongttang.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Component
public class S3Service {
    private final AmazonS3Client amazonS3Client;

    //application.yml에 설정
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    //이미지 업로딩. users/{userId}/profile 이름으로 파일이 생성된다. 반환값은 경로값이다.
    public String uploadProfile(MultipartFile multipartFile, int userId) throws IOException {
        log.info("[uploadProfile] 프로필 이미지 업로드 시작.");
        String fileName = "users/" + userId + "/profile" + System.nanoTime();

        deleteFile(fileName);

        ObjectMetadata objectMetaData = new ObjectMetadata();
        objectMetaData.setContentType(multipartFile.getContentType());
        objectMetaData.setContentLength(multipartFile.getSize());

        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, multipartFile.getInputStream(), objectMetaData));
        log.info("[uploadProfile] 프로필 이미지 업로드 완료. 저장된 경로 : {}", fileName);
        return fileName;
    }

    //동화 이미지 리스트 업로드. books/{challengeId}/{storyId}/page{idx}이름으로 파일이 생성된다. 반환값은 모든 경로값이다.
    public ArrayList<String> uploadBook(List<MultipartFile> book, int challengeId, int storyId) throws IOException {
        log.info("[uploadBook] 동화 업로드 시작." );
        String folderName = "books/" + challengeId + "/" + storyId + "/";

        deleteFolder(folderName);

        ArrayList<String> fileNames = new ArrayList<>();
        int idx = 0;
        for (MultipartFile page : book) {
            ObjectMetadata objectMetaData = new ObjectMetadata();
            objectMetaData.setContentType(page.getContentType());
            objectMetaData.setContentLength(page.getSize());

            String fileName = folderName + "page" + (idx++) + System.nanoTime();
            fileNames.add(fileName);
            amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, page.getInputStream(), objectMetaData));
        }
        log.info("[uploadBook] 동화 업로드 완료. 저장된 경로들 : {}", fileNames.toString());
        return fileNames;
    }

    //폴더명을 포함한 파일 이름(경로)를 받아 삭제한다.
    public void deleteFile(String fileName) {
        log.info("[deleteImage] 이미지 삭제 시작. 대상 파일 : {}", fileName);
        try {
            amazonS3Client.deleteObject(new DeleteObjectRequest(bucket, fileName));
        } catch (AmazonServiceException e){
            log.info("[deleteImage] 이미지 삭제 실패. 상태코드 : {}, 에러코드 : {} , 에러메시지 : {}", e.getStatusCode(), e.getErrorCode(), e.getErrorMessage());
        }
        log.info("[deleteImage] 이미지 삭제 종료." );
    }

    //반복문을 통해 folderName 하위의 모든 파일을 삭제한다.
    public void deleteFolder(String folderName) {
        log.info("[deleteFolder] 폴더 삭제 시작. 대상 폴더 : {}", folderName);
        //folderName에 해당하는 Objects의 리스트를 받은 후, objectSummaries를 추출하여 반복문으로 deleteObject를 작동시킨다.
        amazonS3Client.listObjects(bucket, folderName).getObjectSummaries().forEach(objectSummary -> {
            amazonS3Client.deleteObject(new DeleteObjectRequest(bucket, objectSummary.getKey()));
        });
        log.info("[deleteFolder] 폴더 삭제 완료.");
    }
}
