import axios from "axios";
const API_LOGIN_URL = "http://localhost:3001/api/auth/";
const API_REG_URL = "http://localhost:3001/api/users/";
const API_FAQ_URL = "http://localhost:3001/faq";

const register = (username, email, password) => {
  return axios.post(API_REG_URL, {
    username,
    email,
    password,
  })
};

const deletefaqs = (id) => {
  return axios.delete(API_FAQ_URL+'/'+id)
  .catch((err) => console.log('FAQSS DELETE error',err));
};

const editfaqs = (id, obj) => {
  return axios.patch(API_FAQ_URL+'/'+id, obj)
  .catch((err) => console.log('FAQSS edit error',err));
};

const faq = (faq, question, answer) => {
  return axios.post(API_FAQ_URL, {
    faq,
    question,
    answer,
  })
  .catch((err) => console.log('FAQSS error',err));
};

const login = (email, password) => {
  return axios
    .post(API_LOGIN_URL, {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
  faq,
  deletefaqs,
  editfaqs
};