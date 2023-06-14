import { deleteUserAPI } from '../api/deleteUserAPI';
import { getUserDetailsAPI } from '../api/getUserDetailsAPI';
import { getUserListAPI } from '../api/getUserListAPI';
import { loginAPI } from '../api/loginAPI';
import { registerUserAPI } from '../api/registerUserAPI';
import { updateUserAPI } from '../api/updateUserAPI';
import { updateUserProfileAPI } from '../api/updateUserProfileAPI';
import { ORDER_LIST_MY_RESET } from '../constant/orderConstant';
import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from '../constant/userConstant';

export const login = (email: any, password: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const data: {} | any = await loginAPI(email, password);

    if (!data.hasOwnProperty('message')) {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: data.message,
      });
    }
    localStorage.setItem('user', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error,
    });
  }
};

export const register =
  (name: string | any, email: any, password: any) => async (dispatch: any) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const data: {} | any = await registerUserAPI(name, email, password);

      if (!data.hasOwnProperty('message')) {
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: data,
        });
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: USER_REGISTER_FAIL,
          payload: data.message,
        });
      }
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: error,
      });
    }
  };

export const getUserDetails =
  (id: string | number) => async (dispatch: any) => {
    try {
      dispatch({
        type: USER_DETAILS_REQUEST,
      });

      const data: {} | any = await getUserDetailsAPI(id);

      if (!data.hasOwnProperty('message')) {
        dispatch({
          type: USER_DETAILS_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: USER_DETAILS_FAIL,
          payload: data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload: error,
      });
    }
  };
export const updateUserProfileDetails = (user: {}) => async (dispatch: any) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const data: {} | any = await updateUserProfileAPI(user);

    if (!data.hasOwnProperty('message')) {
      dispatch({
        type: USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error,
    });
  }
};
export const logout = () => (dispatch: any) => {
  localStorage.removeItem('user');
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_LIST_RESET });
};
export const listUsers = () => async (dispatch: any) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    const data: {} | any = await getUserListAPI();

    if (!data.hasOwnProperty('message')) {
      dispatch({
        type: USER_LIST_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: USER_LIST_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: error,
    });
  }
};

export const deleteUser =
  (id: string | number) => async (dispatch: any, getState: any) => {
    try {
      dispatch({
        type: USER_DELETE_REQUEST,
      });

      const data: {} | any = await deleteUserAPI(id);

      if (!data.hasOwnProperty('message')) {
        dispatch({
          type: USER_DELETE_SUCCESS,
        });
      } else {
        dispatch({
          type: USER_DELETE_FAIL,
          payload: data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_DELETE_FAIL,
        payload: error,
      });
    }
  };

  export const updateUser =
  (user:{}) => async (dispatch: any, getState: any) => {
    try {
      dispatch({
        type: USER_UPDATE_REQUEST,
      });

      const data: {} | any = await updateUserAPI(user);
      if (!data.hasOwnProperty('message')) {
        dispatch({
          type: USER_UPDATE_SUCCESS,
          payload : data
        });
      } else {
        dispatch({
          type: USER_UPDATE_FAIL,
          payload: data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload: error,
      });
    }
  };
