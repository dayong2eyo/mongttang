/**
 * API 받기 전 사용할 더미데이터 모음
 */
import igu from '../assets/images/iguanadon.png';
import par from '../assets/images/para.png';
import rap from '../assets/images/raptor.png';
import tri from '../assets/images/triceratops.png';
import tyr from '../assets/images/tyrano.png';

export const comments = {
  comments: [
    {
      commentId: 1,
      userId: 13,
      userNickname: '홍길동',
      numOfLike: 13,
      isLiked: true,
      isReported: false,
      commentContent: '동화가 너무 재미있네요',
      commentCreateDate: '2023-02-01T10:27:14.153045',
    },
    {
      commentId: 3,
      userId: 13,
      userNickname: '홍길동',
      numOfLike: 12,
      isLiked: true,
      isReported: false,
      commentContent: '동화가 너무 재미있네요',
      commentCreateDate: '2023-02-01T10:27:14.153045',
    },
    {
      commentId: 4,
      userId: 13,
      userNickname: '홍길동',
      numOfLike: 12,
      isLiked: false,
      isReported: false,
      commentContent: '동화가 너무 재미있네요',
      commentCreateDate: '2023-02-01T10:27:14.153045',
    },
  ],
};
export const challenges = {
  challenges: [
    {
      challengeId: 13,
      challengeTitle: '토끼와 거북이',
      challengeSummary:
        '옛날 옛적에, 토끼와 거북이가 살고 있었다. 토끼는 매우 빨랐고, 거북이는 매우 느렸다. 어느날..ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
      challengeParticipants: 22,
      challengeImgUrl:
        'https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/item/e57fdfa1-804e-43c4-98c5-9d98b91f090d.png',
    },
    {
      challengeId: 12,
      challengeTitle: '선녀와 나무꾼',
      challengeSummary:
        '어느 날, 나무꾼은 사냥꾼에게 쫓기는 사슴을 숨겨주었다. 사슴은 목숨을 구해준 은혜에 보답하...',
      challengeParticipants: 14,
      challengeImgUrl:
        'https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/item/e57fdfa1-804e-43c4-98c5-9d98b91f090d.png',
    },
  ],
  startDate: '2023-02-01T10:27:14.153045',
  endDate: '2023-02-01T10:27:14.153045',
};

export const prevChallenges = {
  totalChallenges: [
    {
      challenges: [
        {
          challengeId: 13,
          challengeTitle: '토끼와 거북이',
          challengeSummary:
            '옛날 옛적에, 토끼와 거북이가 살고 있었다. 토끼는 매우 빨랐고, 거북이는 매우 느렸다. 어느날..ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
          challengeParticipants: 22,
          challengeImgUrl:
            'https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/item/e57fdfa1-804e-43c4-98c5-9d98b91f090d.png',
        },
        {
          challengeId: 12,
          challengeTitle: '선녀와 나무꾼',
          challengeSummary:
            '어느 날, 나무꾼은 사냥꾼에게 쫓기는 사슴을 숨겨주었다. 사슴은 목숨을 구해준 은혜에 보답하...',
          challengeParticipants: 14,
          challengeImgUrl:
            'https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/item/e57fdfa1-804e-43c4-98c5-9d98b91f090d.png',
        },
      ],
      startDate: '2023-02-01T10:27:14.153045',
      endDate: '2023-02-01T10:27:14.153045',
    },
    {
      challenges: [
        {
          challengeId: 13,
          challengeTitle: '토끼와 거북이',
          challengeSummary:
            '옛날 옛적에, 토끼와 거북이가 살고 있었다. 토끼는 매우 빨랐고, 거북이는 매우 느렸다. 어느날..ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
          challengeParticipants: 22,
          challengeImgUrl:
            'https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/item/e57fdfa1-804e-43c4-98c5-9d98b91f090d.png',
        },
        {
          challengeId: 12,
          challengeTitle: '선녀와 나무꾼',
          challengeSummary:
            '어느 날, 나무꾼은 사냥꾼에게 쫓기는 사슴을 숨겨주었다. 사슴은 목숨을 구해준 은혜에 보답하...',
          challengeParticipants: 14,
          challengeImgUrl:
            'https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/item/e57fdfa1-804e-43c4-98c5-9d98b91f090d.png',
        },
      ],
      startDate: '2023-02-01T10:27:14.153045',
      endDate: '2023-02-01T10:27:14.153045',
    },
  ],
};

export const books = [
  {
    bookId: 13,
    bookImgUrl: 'https://tecdn.b-cdn.net/img/new/fluid/city/113.webp',
    artistId: 12,
    artistNickname: 'Charlie Puth',
    bookTitle: `I don't think that I like her`,
    bookSummary: `Get her name and get her number
    Find out all of the things that we have in common
    Never all the differences, oh, yeah
    Meet her parents, meet her brother
    Then she starts sleeping over the crib on weekends
    Like a real relationship, oh, no
    
    For me, the stars are aligning
    But for her, it's bad timing
    So she just can't be mine
    
    I don't think that I like her anymore
    Girls are all the same
    All they wanna do is break my heart, my heart, oh-oh
    I don't think that I like her anymore
    Girls are all the same
    They just wanna see me fall apart, apart, oh-oh
    
    So I woke up on a rebound
    And I say that I'm gonna be single for life
    But she's so pretty and nice (pretty and nice)
    So I make just one exception
    But I find out eventually I'm not her type
    Baby, that's the reason why, that
    
    For me, the stars are aligning
    But for her, it's bad timing
    So she just can't be mine
    `,
    numOfLike: 13,
    latesLikeDate: '2023-02-01T10:27:14.153045',
    numOfComment: 14,
  },
  {
    bookId: 12,
    bookImgUrl: 'https://tecdn.b-cdn.net/img/new/fluid/city/113.webp',
    artistId: 12,
    artistNickname: 'string type value',
    bookTitle: 'string type value',
    bookSummary: 'string type value',
    numOfLike: 13,
    latesLikeDate: '2023-02-01T10:27:14.153045',
    numOfComment: 14,
  },
  {
    bookId: 11,
    bookImgUrl: 'https://tecdn.b-cdn.net/img/new/fluid/city/113.webp',
    artistId: 12,
    artistNickname: 'string type value',
    bookTitle: 'string type value',
    bookSummary: 'string type value',
    numOfLike: 13,
    latesLikeDate: '2023-02-01T10:27:14.153045',
    numOfComment: 14,
  },
];

export const challengeDetails = {
  challenge: {
    challengeId: 13,
    challengeTitle: '토끼와 거북이',
    challengeSummary:
      '옛날 옛적에, 토끼와 거북이가 살고 있었다. 토끼는 매우 빨랐고, 거북이는 매우 느렸다. 어느날..ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
    challengeParticipants: 22,
    challengeImgUrl:
      'https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/item/e57fdfa1-804e-43c4-98c5-9d98b91f090d.png',
  },
  best: [
    {
      bookId: 13,
      bookImgUrl:
        'https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/item/e57fdfa1-804e-43c4-98c5-9d98b91f090d.png',
      artistId: 12,
      artistNickname: 'string type value',
      bookTitle: 'string type value',
      bookSummary: 'string type value',
      numOfLike: 13,
      isLiked: true,
      latesLikeDate: '2023-02-01T10:27:14.153045',
      numOfComment: 14,
    },
    {
      bookId: 13,
      bookImgUrl:
        'https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/item/e57fdfa1-804e-43c4-98c5-9d98b91f090d.png',
      artistId: 12,
      artistNickname: 'string type value',
      bookTitle: 'string type value',
      bookSummary: 'string type value',
      numOfLike: 13,
      isLiked: true,
      latesLikeDate: '2023-02-01T10:27:14.153045',
      numOfComment: 14,
    },
    {
      bookId: 13,
      bookImgUrl:
        'https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/item/e57fdfa1-804e-43c4-98c5-9d98b91f090d.png',
      artistId: 12,
      artistNickname: 'string type value',
      bookTitle: 'string type value',
      bookSummary: 'string type value',
      numOfLike: 13,
      isLiked: true,
      latesLikeDate: '2023-02-01T10:27:14.153045',
      numOfComment: 14,
    },
    {
      bookId: 13,
      bookImgUrl:
        'https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/item/e57fdfa1-804e-43c4-98c5-9d98b91f090d.png',
      artistId: 12,
      artistNickname: 'string type value',
      bookTitle: 'string type value',
      bookSummary: 'string type value',
      numOfLike: 13,
      isLiked: true,
      latesLikeDate: '2023-02-01T10:27:14.153045',
      numOfComment: 14,
    },
    {
      bookId: 13,
      bookImgUrl:
        'https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/item/e57fdfa1-804e-43c4-98c5-9d98b91f090d.png',
      artistId: 12,
      artistNickname: 'string type value',
      bookTitle: 'string type value',
      bookSummary: 'string type value',
      numOfLike: 13,
      isLiked: true,
      latesLikeDate: '2023-02-01T10:27:14.153045',
      numOfComment: 14,
    },
  ],
  liked: [
    {
      bookId: 13,
      bookImgUrl:
        'https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/item/e57fdfa1-804e-43c4-98c5-9d98b91f090d.png',
      artistId: 12,
      artistNickname: 'string type value',
      bookTitle: 'string type value',
      bookSummary: 'string type value',
      numOfLike: 13,
      isLiked: true,
      latesLikeDate: '2023-02-01T10:27:14.153045',
      numOfComment: 14,
    },
    {
      bookId: 13,
      bookImgUrl:
        'https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/item/e57fdfa1-804e-43c4-98c5-9d98b91f090d.png',
      artistId: 12,
      artistNickname: 'string type value',
      bookTitle: 'string type value',
      bookSummary: 'string type value',
      numOfLike: 13,
      isLiked: true,
      latesLikeDate: '2023-02-01T10:27:14.153045',
      numOfComment: 14,
    },
    {
      bookId: 13,
      bookImgUrl:
        'https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/item/e57fdfa1-804e-43c4-98c5-9d98b91f090d.png',
      artistId: 12,
      artistNickname: 'string type value',
      bookTitle: 'string type value',
      bookSummary: 'string type value',
      numOfLike: 13,
      isLiked: true,
      latesLikeDate: '2023-02-01T10:27:14.153045',
      numOfComment: 14,
    },
    {
      bookId: 13,
      bookImgUrl:
        'https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/item/e57fdfa1-804e-43c4-98c5-9d98b91f090d.png',
      artistId: 12,
      artistNickname: 'string type value',
      bookTitle: 'string type value',
      bookSummary: 'string type value',
      numOfLike: 13,
      isLiked: true,
      latesLikeDate: '2023-02-01T10:27:14.153045',
      numOfComment: 14,
    },
    {
      bookId: 13,
      bookImgUrl:
        'https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/item/e57fdfa1-804e-43c4-98c5-9d98b91f090d.png',
      artistId: 12,
      artistNickname: 'string type value',
      bookTitle: 'string type value',
      bookSummary: 'string type value',
      numOfLike: 13,
      isLiked: true,
      latesLikeDate: '2023-02-01T10:27:14.153045',
      numOfComment: 14,
    },
  ],
  recent: [
    {
      bookId: 13,
      bookImgUrl:
        'https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/item/e57fdfa1-804e-43c4-98c5-9d98b91f090d.png',
      artistId: 12,
      artistNickname: 'string type value',
      bookTitle: 'string type value',
      bookSummary: 'string type value',
      numOfLike: 13,
      isLiked: true,
      latesLikeDate: '2023-02-01T10:27:14.153045',
      numOfComment: 14,
    },
    {
      bookId: 13,
      bookImgUrl:
        'https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/item/e57fdfa1-804e-43c4-98c5-9d98b91f090d.png',
      artistId: 12,
      artistNickname: 'string type value',
      bookTitle: 'string type value',
      bookSummary: 'string type value',
      numOfLike: 13,
      isLiked: true,
      latesLikeDate: '2023-02-01T10:27:14.153045',
      numOfComment: 14,
    },
    {
      bookId: 13,
      bookImgUrl:
        'https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/item/e57fdfa1-804e-43c4-98c5-9d98b91f090d.png',
      artistId: 12,
      artistNickname: 'string type value',
      bookTitle: 'string type value',
      bookSummary: 'string type value',
      numOfLike: 13,
      isLiked: true,
      latesLikeDate: '2023-02-01T10:27:14.153045',
      numOfComment: 14,
    },
    {
      bookId: 13,
      bookImgUrl:
        'https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/item/e57fdfa1-804e-43c4-98c5-9d98b91f090d.png',
      artistId: 12,
      artistNickname: 'string type value',
      bookTitle: 'string type value',
      bookSummary: 'string type value',
      numOfLike: 13,
      isLiked: true,
      latesLikeDate: '2023-02-01T10:27:14.153045',
      numOfComment: 14,
    },
    {
      bookId: 13,
      bookImgUrl:
        'https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/item/e57fdfa1-804e-43c4-98c5-9d98b91f090d.png',
      artistId: 12,
      artistNickname: 'string type value',
      bookTitle: 'string type value',
      bookSummary: 'string type value',
      numOfLike: 13,
      isLiked: true,
      latesLikeDate: '2023-02-01T10:27:14.153045',
      numOfComment: 14,
    },
  ],
};

//동화 일러스트
export const bookImg = {
  illustes: [
    {
      pageNo: 0,
      illustePath: igu,
    },
    {
      pageNo: 1,
      illustePath: par,
    },
    {
      pageNo: 2,
      illustePath: rap,
    },
    {
      pageNo: 3,
      illustePath: tri,
    },
    {
      pageNo: 4,
      illustePath: tyr,
    },
  ],
};
