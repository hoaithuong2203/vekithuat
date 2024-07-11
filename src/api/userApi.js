import axiosClient from './axiosClient';

const userApi = {
  register(data) {
    const url = '/http://127.0.0.1:8000/api/v1/auth/register';
    return axiosClient.post(url, data);
  },
};
export default userApi;
