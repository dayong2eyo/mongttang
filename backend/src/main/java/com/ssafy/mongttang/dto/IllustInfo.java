package com.ssafy.mongttang.dto;

import com.ssafy.mongttang.entity.Illust;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class IllustInfo {
    private int pageNo;
    private String illustePath;

    public IllustInfo(Illust illust) {
        this.pageNo = illust.getIllustPageNumber();
        this.illustePath = "http://dd93ub3tw0bvd.cloudfront.net/" + illust.getIllustFilePath();
    }
}
