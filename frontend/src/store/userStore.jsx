import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

//회원 전역상태 관리
export const userStore = create(
  devtools((set) => ({
    userId: '', //유저 id(번호)
    userNickname: '', //유저 닉네임
    userImg: '', //유저 프로필 사진URL
    userRole: 'reader', //역할
    accessToken: '', //액세스 토큰
    userWallet: '', //지갑주소

    setUserId: (userId) => set({ userId: userId }),
    setUserNickname: (userNickname) => set({ userNickname: userNickname }),
    setUserImg: (userImg) => set({ userImg: userImg }),
    setUserRole: (userRole) => set({ userRole: userRole }),
    setToken: (accessToken) => set({ accessToken: accessToken }),
    setUserWallet: (userWallet) => set({ userWallet: userWallet }),
    resetUser: () =>
      set({
        userId: '',
        userNickname: '',
        userImg: '',
        userRole: 'reader',
        accessToken: '',
        userWallet: '',
      }),
  })),
);
