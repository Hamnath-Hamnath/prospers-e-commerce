import { createOrderAPI } from '../api/createOrderAPI';
import { getOrderDetailsAPI } from '../api/getOrderDetailsAPI';
import { payOrderAPI } from '../api/payOrderAPI';
import { getMyListAPI } from '../api/getMyListAPI';
import {
  ORDER_CONSTANT_FAIL,
  ORDER_CONSTANT_REQUEST,
  ORDER_CONSTANT_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from '../constant/orderConstant';
import { getOrderListAPI } from '../api/getOrderListAPI';
import { orderDeliverAPI } from '../api/orderDeliverAPI';

export const createOrderAction = (order: {}) => async (dispatch: any) => {
  try {
    dispatch({
      type: ORDER_CONSTANT_REQUEST,
    });

    const data: {} | any = await createOrderAPI(order);

    if (!data.hasOwnProperty('message')) {
      dispatch({
        type: ORDER_CONSTANT_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: ORDER_CONSTANT_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: ORDER_CONSTANT_FAIL,
      payload: error,
    });
  }
};

export const getOrderDetails =
  (id: string | number) => async (dispatch: any) => {
    try {
      dispatch({
        type: ORDER_DETAILS_REQUEST,
      });

      const data: {} | any = await getOrderDetailsAPI(id);

      if (!data.hasOwnProperty('message')) {
        dispatch({
          type: ORDER_DETAILS_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: ORDER_DETAILS_FAIL,
          payload: data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload: error,
      });
    }
  };

export const payOrder =
  (id: string | number, paymentResult: any) => async (dispatch: any) => {
    try {
      dispatch({
        type: ORDER_PAY_REQUEST,
      });

      const data: {} | any = await payOrderAPI(id, paymentResult);

      if (!data.hasOwnProperty('message')) {
        dispatch({
          type: ORDER_PAY_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: ORDER_PAY_FAIL,
          payload: data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload: error,
      });
    }
  };

export const orderDeliverACT = (id: string | number) => async (dispatch: any) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    });

    const data: {} | any = await orderDeliverAPI(id);

    if (!data.hasOwnProperty('message')) {
      dispatch({
        type: ORDER_DELIVER_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: ORDER_DELIVER_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload: error,
    });
  }
};

export const getMyListOrder = () => async (dispatch: any) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });

    const data: {} | any = await getMyListAPI();

    if (!data.hasOwnProperty('message')) {
      dispatch({
        type: ORDER_LIST_MY_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: ORDER_LIST_MY_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: error,
    });
  }
};

export const listOrders = () => async (dispatch: any) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });

    const data: {} | any = await getOrderListAPI();

    if (!data.hasOwnProperty('message')) {
      dispatch({
        type: ORDER_LIST_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: ORDER_LIST_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: error,
    });
  }
};
