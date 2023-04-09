/* axios instance 정의 
   defaultApi.get(API, body);
*/
import axios from 'axios';
import { getCookie, removeCookie } from 'utils/Cookie';
import requests from './config';
import { userStore } from 'store/userStore';

const BASE_URL = requests.base_url;
const BLOCKCHAIN_URL = requests.blockchain_url;
const axiosApi = (url, options) => {
  const instance = axios.create({
    baseURL: url, //URL은 입력받고
    ...options, //나머지 옵션은 그대로
  });

  return instance;
};

//기본 요청에 사용할 인스턴스
export const defaultApi = axiosApi(BASE_URL);

//트랜젝션 요청용 인스턴스
export const transactionApi = axiosApi(BLOCKCHAIN_URL);
//인증이 필요한 요청에 사용할 인스턴스
export const authApi = axiosApi(BASE_URL);

//refreshToken 만료시 사용할 인스턴스
export const refreshTokenApi = axiosApi(BASE_URL);

authApi.interceptors.request.use(
  //요청 성공 시
  (config) => {
    const accessToken = localStorage.getItem('accessToken'); //로컬스토리지에서 accessToken 가져오기
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  //요청 에러 발생 시
  (error) => {
    return Promise.reject(error);
  },
);

authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const {
      config,
      response: { status },
    } = error; //비구조화 할당
    const userId = localStorage.getItem('userId');
    const refreshToken = getCookie('refreshToken');

    //Unauthorized
    if (status === 401) {
      //Api 주소를 받아오기
      return refreshTokenApi
        .post('/api/auth/reissue', {
          userId: userId,
          refreshToken: refreshToken,
        })
        .then((response) => {
          if (response.status === 200) {
            const { accessToken } = response.data;
            localStorage.setItem('accessToken', accessToken);
            config.headers.Authorization = `Bearer ${accessToken}`;

            //새로 받은 토큰으로 로그인 재요청
            return authApi(config);
          }
        })
        .catch((err) => {
          //리프레시 토큰 재발급마저 안된 경우
          localStorage.clear();
          removeCookie('refreshToken');
          window.location.href = '/';
        });
    }
  },
);
