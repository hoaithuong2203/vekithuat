import axios from 'axios';
const postLogin = (req) => {
  return axios.post('http://localhost:8000/api/v1/auth/login', req, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
// const getAllUsers = () => {
//   return axios.post('http://localhost:8000/api/v1/admin/all-users', {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
// };

export { postLogin };
