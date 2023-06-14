import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productCreateReducer,
  productCreateReviewReducer,
  productDeleteReducer,
  productDetailReducer,
  productListReducer,
  productTopRatedReducer,
  productUpdateReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducer';
import { userDeleteReducer, userDetailsReducers, userListReducer, userLoginReducers, userRegisterReducers, userUpdateProfileReducers, userUpdateReducer } from './reducers/loginReducers';
import { oderDeliverReducer, orderCreateReducer, orderDetailsReducer, orderListMyReducer, orderListReducer, orderPayReducer } from './reducers/orderReducr';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailReducer,
  cart: cartReducer,
  userLogin : userLoginReducers,
  userRegister : userRegisterReducers,
  userDetails : userDetailsReducers,
  userUpdateProfile : userUpdateProfileReducers,
  orderCreate : orderCreateReducer,
  orderDetails : orderDetailsReducer,
  orderPay : orderPayReducer,
  orderDeliver : oderDeliverReducer,
  orderMyList : orderListMyReducer,
  userList : userListReducer,
  userDelete : userDeleteReducer,
  userUpdate : userUpdateReducer,
  productDelete : productDeleteReducer,
  productCreate : productCreateReducer,
  productUpdate : productUpdateReducer,
  orderList : orderListReducer,
  productReviewCreate : productCreateReviewReducer,
  productTopRated : productTopRatedReducer,
});

const cartItemsFromWebStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromWebStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
const shippingAddressFromWebStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
  cart : {
    cartItems : cartItemsFromWebStorage,
    shippingAddress : shippingAddressFromWebStorage
  },
  userLogin : {
    userInfo : userInfoFromWebStorage
  }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
