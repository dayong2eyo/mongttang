import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

//회원 전역상태 관리
export const searchStore = create(
  devtools((set) => ({
    searchKeyword: '', //검색어
    searchResult: [], //검색 결과

    setSearchKeyword: (searchKeyword) => set({ searchKeyword: searchKeyword }),
    setSearchResult: (searchResult) => set({ searchResult: searchResult }),
    resetSearchData: () =>
      set({
        searchKeyword: '',
        searchResult: [],
      }),
  })),
);
