import {
  PRODUCT_LIST_FAILURE,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
} from '../constant/productConstant';
import { getAllProducts } from '../api/getAllProducts';
import { getProduct } from '../api/getProducts';
import { deleteProductAPI } from '../api/deleteProductAPI';
import { createProductAPI } from '../api/createProductAPI';
import { updateProductAPI } from '../api/updateProductAPI';
import { createReviewAPI } from '../api/createReviewAPI';
import { topProductAPI } from '../api/topProductsAPI';

export const listProducts = (keyword='',pageNumber) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });

    const data = await getAllProducts(keyword,pageNumber);
    if (!data?.products?.length) {
      dispatch({
        type: PRODUCT_LIST_FAILURE,
        payload: data.message,
      });
    } else {
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error)
    dispatch({
      type: PRODUCT_LIST_FAILURE,
      payload: error,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });

    const data = await getProduct(id);
    if (data.hasOwnProperty('message')) {
      dispatch({
        type: PRODUCT_DETAILS_FAILURE,
        payload: data.message,
      });
    } else {
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAILURE,
      payload: error,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    const data = await deleteProductAPI(id);

    if (!data.hasOwnProperty('message')) {
      dispatch({
        type: PRODUCT_DELETE_SUCCESS,
      });
    } else {
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error,
    });
  }
};

export const createProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });

    const data = await createProductAPI(product);

    if (!data.hasOwnProperty('message')) {
      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: error,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    });

    const data = await updateProductAPI(product);
    if (!data.hasOwnProperty('message')) {
      dispatch({
        type: PRODUCT_UPDATE_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: error,
    });
  }
};

export const createProductReview = (productID,reviewObj) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST,
    });

  const data = await createReviewAPI(productID,reviewObj);
    if (!data.hasOwnProperty('message')) {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS,
      });
    } else {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload: error,
    });
  }
};

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_TOP_SUCCESS,
    });

    const data = await topProductAPI();
    console.log(data)
    if (data.hasOwnProperty('message')) {
      dispatch({
        type: PRODUCT_TOP_FAIL,
        payload: data.message,
      });
    } else {
      dispatch({
        type: PRODUCT_TOP_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload: error,
    });
  }
};