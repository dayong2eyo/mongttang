package com.ssafy.mongttang.service;

import com.ssafy.mongttang.dto.ReqUserInfoDto;
import com.ssafy.mongttang.dto.ReqWalletInfoDto;
import com.ssafy.mongttang.entity.User;
import com.ssafy.mongttang.repository.UserRepository;
import com.ssafy.mongttang.util.AES256Util;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final S3Service s3Service;

    private final AES256Util aes256Util;

    public User nicknameDpcn(String userNickname) {
        return userRepository.findByUserNickname(userNickname);
    }

    public String nicknameModify(int userId, String userNickname) {
        User user = userRepository.findByUserId(userId);
        if(user == null) return null;
        else {
            user.changeNickname(userNickname);
            return userRepository.save(user).getUserNickname();
        }
    }

    public User getUser(int userId) {
        return userRepository.findByUserId(userId);
    }

    public User userDelete(int userId) {
        User user = userRepository.findByUserId(userId);
        if(user == null) return null;
        else {
            user.deleteUser();
            return userRepository.save(user);
        }
    }

    public String profileImgModify(int userId, MultipartFile userImg) throws IOException {
        User user = userRepository.findByUserId(userId);
        if(user != null){
            String profilePath = s3Service.uploadProfile(userImg, userId);
            if(profilePath == null) return null;
            user.changeProfileImg(profilePath);
            return "http://dd93ub3tw0bvd.cloudfront.net/" + userRepository.save(user).getUserProfileImg();
        }
        return null;
    }

    public String infoModify(int userId, ReqUserInfoDto reqUserInfoDto) {
        User user = userRepository.findByUserId(userId);
        if(user == null) return null;
        user.changeUserInfo(reqUserInfoDto.getUserInfo());
        return userRepository.save(user).getUserInfo();
    }

    public User storeWalletAddress(int userId, ReqWalletInfoDto reqWalletInfoDto) throws Exception {
        User user = userRepository.findByUserId(userId);
        if(user == null) return null;
        if(!(" ".equals(user.getUserPrivateKey()))) return null;
        user.changeWallet(aes256Util.encrypt(reqWalletInfoDto.getWallet()));

        return userRepository.save(user);
    }
}
