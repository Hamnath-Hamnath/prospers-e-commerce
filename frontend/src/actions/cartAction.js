import { getProduct } from '../api/getProducts';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from '../constant/cartConstant';

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const data = await getProduct(id);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  const { cart } = getState();
  const { cartItems } = cart;
  if (id && qty !== null) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
};

export const removeFromCart = (id) => async(dispatch,getState) => {
    dispatch({
        type : CART_REMOVE_ITEM,
        payload : id
    })
    const { cart } = getState();
    const { cartItems } = cart;
    if(id){
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
}

export const saveShippingAddress = (data) => async(dispatch) => {
  dispatch({
      type : CART_SAVE_SHIPPING_ADDRESS,
      payload : data
  })

  if(data){
      localStorage.setItem('shippingAddress', JSON.stringify(data));
  }
}

export const savePaymentMethods = (data) => async(dispatch) => {
  dispatch({
      type : CART_SAVE_PAYMENT_METHOD,
      payload : data
  })

  // if(data){
  //     localStorage.setItem('paymentMethods', JSON.stringify(data));
  // }
}