import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
    FAQ_SUCCESS,
    FAQ_FAIL,
    FAQ_DEL_SUCCESS,
    FAQ_DEL_FAIL,
    FAQ_EDIT_SUCCESS,
    FAQ_EDIT_FAIL,
  } from "./types";
  import AuthService from "../services/auth.service";
  export const register = (username, email, password) => (dispatch) => {
    return AuthService.register(username, email, password).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: REGISTER_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        return Promise.reject();
      }
    );
  };
  
  export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then(
      (data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: LOGIN_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        return Promise.reject();
      }
    );
  };
  export const logout = () => (dispatch) => {
    AuthService.logout();
    dispatch({
      type: LOGOUT,
    });
  };

  export const faqs = (faq, question, answer) => (dispatch) => {
    return AuthService.faq(faq, question, answer).then(
      (response) => {
        dispatch({
          type: FAQ_SUCCESS,
        });
        return Promise.resolve();
      },
      (error) => {
        dispatch({
          type: FAQ_FAIL,
        });
        return Promise.reject();
      }
    );
  }

  export const deletefaqs = (id) => (dispatch) => {
    return AuthService.deletefaqs(id).then(
      (response) => {
        dispatch({
          type: FAQ_DEL_SUCCESS,
        });
        return Promise.resolve();
      },
      (error) => {
        dispatch({
          type: FAQ_DEL_FAIL,
        });
        return Promise.reject();
      }
    );
  }

  export const editfaqs = (id, obj) => (dispatch) => {
    return AuthService.editfaqs(id, obj).then(
      (response) => {
        dispatch({
          type: FAQ_EDIT_SUCCESS,
        });
        return Promise.resolve();
      },
      (error) => {
        dispatch({
          type: FAQ_EDIT_FAIL,
        });
        return Promise.reject();
      }
    );
  }