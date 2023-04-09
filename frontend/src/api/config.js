//requests 각 프로퍼티의 key는 API 명세서 상 'config.js상 이름'으로 명시
//각 프로퍼티의 key 주석으로 API 이름 명시(API 이름은 전부 대문자로)

const requests = {
  //기본 URL 주소
  base_url: 'https://j8a308.p.ssafy.io',
  //카카오 소셜로그인 URL
  KAKAO_LOGIN:
    'https://j8a308.p.ssafy.io/api/oauth2/authorize/kakao?redirect_uri=https://j8a308.p.ssafy.io/oauth',
  // 'https://j8a308.p.ssafy.io/api/oauth2/authorize/kakao?redirect_uri=http://localhost:3000/oauth',

  //구글 소셜로그인 URL
  GOOGLE_LOGIN:
    'https://j8a308.p.ssafy.io/api/oauth2/authorize/google?redirect_uri=https://j8a308.p.ssafy.io/oauth',
  // 'https://j8a308.p.ssafy.io/api/oauth2/authorize/google?redirect_uri=http://localhost:3000/oauth',

  wallet_url: 'https://j8a308.p.ssafy.io/wallet',

  blockchain_url: 'https://j8a308.p.ssafy.io/bc',

  //회원정보 수정
  PATCH_USER_NICKNAME(userId, code) {
    return `/api/user/${userId}?userNickname=${code}`;
  },

  //회원 프로필사진 수정
  PATCH_PROFILE_IMAGE(userId) {
    return `/api/user/image/${userId}`;
  },
  PATCH_USER_INFO(userId) {
    return `/api/user/info/${userId}`;
  },
  //로그아웃
  GET_LOGOUT(userId) {
    return `/api/user/logout/${userId}`;
  },

  //회원탈퇴
  DELETE_USER(userId) {
    return `/api/user/${userId}`;
  },

  //작가 등록
  PATCH_USER_ARTIST(userId) {
    return `/api/user/artist/${userId}`;
  },

  //닉네임 유효성 검사
  GET_NICKNAME_AVAILABLE(userNickname) {
    return `/api/user/${userNickname}`;
  },

  //금주 챌린지 조회
  GET_CHALLENGES() {
    return `/api/challenge`;
  },

  //챌린지 상세정보 조회
  GET_CHALLENGE(challengeId) {
    return `/api/challenge/${challengeId}`;
  },

  //이전 챌린지 조회
  GET_LAST_CHALLENGES() {
    return `/api/challenge/before`;
  },

  //동화 제목 검색
  GET_SEARCH_BOOKS(bookTitle) {
    return `/api/book/search?bookTitle=${bookTitle}`;
  },

  //정렬기준으로 동화 조회
  GET_BOOK_ORDER(challengeId, order) {
    return `/api/challenge/order/${challengeId}?order=${order}`;
  },
  //동화 접근권한 체크
  GET_BOOK_AUTH(userId, bookId) {
    return `/api/book/check/${userId}?bookId=${bookId}`;
  },

  //동화 뷰어(동화 그림 조회)
  GET_BOOK_IMAGES(bookId) {
    return `/api/book/viewer/${bookId}`;
  },

  //동화 상세정보 조회
  GET_BOOK_DETAIL(userId, bookId) {
    return `/api/book/${userId}/${bookId}`;
  },
  GET_BOOK_EDIT_DETAIL(userId, challengeId) {
    return `/api/book/edit/${userId}/${challengeId}`;
  },
  //동화 상세정보 조회 in Editor
  GET_BOOK_DETAIL_EDIT(userId, bookId) {
    return `/api/book/edit/${userId}/${bookId}`;
  },

  //동화 구매내역 저장
  POST_BOOK_PAYLIST(userId, bookId) {
    return `/api/book/pay/${userId}?bookId=${bookId}`;
  },

  //동화 작성(그림 등록)
  POST_BOOK(userId) {
    return `/api/book/draw/${userId}`;
  },
  //동화 작성시 NFT 생성
  POST_CREATE_NFT() {
    return `/nft/ipfs`;
  },
  //동화 임시저장
  POST_BOOK_TEMP(userId) {
    return `/api/book/draw/${userId}`;
  },

  //동화 구매내역 저장
  POST_BOOK_PAYLIST(userId, bookId) {
    return `/api/book/pay/${userId}?bookId=${bookId}`;
  },

  //작가 동화 임시저장본 삭제
  DELETE_BOOK_TEMP(userId) {
    return `/api/book/draw/${userId}`;
  },

  //동화 좋아요 등록
  POST_BOOKLIKE(userId, bookId) {
    return `/api/book/booklike?userId=${userId}&bookId=${bookId}`;
  },

  //동화 좋아요 취소
  DELETE_BOOKLIKE(userId, bookId) {
    return `/api/book/booklike?userId=${userId}&bookId=${bookId}`;
  },

  //댓글 작성
  POST_COMMENT(userId) {
    return `/api/book/comment/`;
  },

  //댓글 수정
  PATCH_COMMENT() {
    return `/api/book/comment/`;
  },

  //댓글 삭제
  DELETE_COMMENT(userId, commentId) {
    return `/api/book/comment/${commentId}?commentUserId=${userId}`;
  },

  //댓글 좋아요 등록
  POST_COMMENTLIKE(userId, commentId) {
    return `/api/book/commentlike?userId=${userId}&commentId=${commentId}`;
  },

  //댓글 좋아요 취소
  DELETE_COMMENTLIKE(userId, commentId) {
    return `/api/book/commentlike?userId=${userId}&commentId=${commentId}`;
  },

  //동화 신고
  POST_REPORT_BOOK(userId, bookId) {
    return `/api/report/book/${bookId}?userId=${userId}`;
  },

  //댓글 신고
  POST_REPORT_COMMENT(userId, commentId) {
    return `/api/report/comment/${commentId}?userId=${userId}`;
  },

  //동화 신고 조회
  GET_REPORT_BOOK() {
    return `/api/report/book`;
  },

  //댓글 신고 조회
  GET_REPORT_COMMENT() {
    return `/api/report/comment`;
  },

  //관심 목록 추가
  POST_INTEREST(userId, bookId) {
    return `/api/profile/interest/${userId}?bookId=${bookId}`; //follow?interest?
  },

  //관심 목록 삭제
  DELETE_INTEREST(userId, bookId) {
    return `/api/profile/interest/${userId}?bookId=${bookId}`;
  },

  //작가 팔로우
  POST_FOLLOW(followFromId, followToId) {
    return `/api/profile/follow/${followFromId}?followToId=${followToId}`;
  },

  //팔로잉 취소
  DELETE_FOLLOW(followFromId, followToId) {
    return `/api/profile/follow/${followFromId}?followToId=${followToId}`;
  },

  //프로필 조회
  GET_PROFILE(userId) {
    return `/api/profile/${userId}`;
  },

  //팔로잉 목록 조회
  GET_FOLLOWING(userId) {
    return `/api/profile/following/${userId}`;
  },

  //팔로워 목록 조회
  GET_FOLLOWER(userId) {
    return `/api/profile/follower/${userId}`;
  },

  //챌린지 목록 조회(관리자용)
  GET_CHALLENGE_ADMIN() {
    return `/api/admin/challenge`;
  },

  //지갑 등록
  POST_WALLET(userId) {
    return `/api/user/wallet/${userId}`;
  },

  //챌린지 등록
  POST_CHALLENGE_ADMIN() {
    return `/api/admin/challenge`;
  },

  //챌린지 수정
  PATCH_CHALLENGE_ADMIN(challengeId) {
    return `/api/admin/challenge/${challengeId}`;
  },

  //챌린지 삭제
  DELETE_CHALLENGE_ADMIN(challengeId) {
    return `/api/admin/challenge/${challengeId}`;
  },

  //동화 삭제(관리자용)
  DELETE_BOOK_ADMIN(bookId) {
    return `/api/admin/book/${bookId}`;
  },

  //댓글 삭제(관리자용)
  DELETE_COMMENT_ADMIN(commentId) {
    return `/api/admin/comment/${commentId}`;
  },

  //할인 동화 추가
  //endDate = 2023-03-22T17:21:14.153045
  POST_BOOK_DISCOUNT(bookId, endDate) {
    return `/api/admin/discount/${bookId}?endDate=${endDate}`;
  },

  //동화 목록 조회
  GET_BOOK() {
    return `/api/admin/book`;
  },

  //공지사항 목록 조회(페이징)
  GET_NOTICE_PAGE(pageNum, pageLimit) {
    return `/api/notice?page=${pageNum}&limit=${pageLimit}`;
  },

  GET_NOTICE() {
    return `/api/notice`;
  },

  //공지사항 상세 조회
  GET_NOTICE_DETAIL(noticeId) {
    return `/api/notice/${noticeId}`;
  },

  //공지사항 수정
  PATCH_NOTICE(noticeId) {
    return `/api/notice/${noticeId}`;
  },

  //공지사항 등록
  POST_NOTICE() {
    return `/api/notice`;
  },

  //공지사항 삭제
  DELETE_NOTICE(noticeId) {
    return `/api/notice/${noticeId}`;
  },
};

export default requests;
