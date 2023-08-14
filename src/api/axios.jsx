import axios from "axios";

axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

 instance.interceptors.request.use(
  function (config) {
      const accessToken = localStorage.getItem('access_token');
      if(accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      console.log('get response', response);
      return response;
    },
    async (error) => {
      const {config, response: { status }} = error;
      if (status === 401) {
        console.log('refresh!!')
        const originalRequest = config; // 원래 하려던 API 요청
        const refreshToken = await localStorage.getItem('refresh_token'); // 로컬스토리지에서 Refresh Token 가져오기
        const { data } = await axios.post('api/users/reissue', {}, {headers: { Authorization: `Bearer ${refreshToken}`}});
        const newAccessToken = data.access_token;
        const newRefreshToken = data.refresh_token;
        await localStorage.setItem('access_token', newAccessToken);
        await localStorage.setItem('refresh_token', newRefreshToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      }
      console.log('response error', error);
      return Promise.reject(error);
      }
  );
    
export default instance;
