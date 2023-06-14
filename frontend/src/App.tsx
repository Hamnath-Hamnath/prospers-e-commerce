import React from 'react';
import './App.css';
import MainLayout from './Layouts/MainLayout';
import HomeScreen from './screens/HomeScreen';
import { Routes, Route } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import CartScreens from './screens/CartScreens';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import ShippingScreens from './screens/ShippingScreens';
import PaymentsScreen from './screens/PaymentsScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';

function App() {
  return (
      <MainLayout>
        <Routes>
          <Route element={<LoginScreen />} path='/login' />
          <Route element={<ShippingScreens />} path='/login/shipping' />
          <Route element={<OrderScreen />} path='/order/:id' />
          <Route element={<PlaceOrderScreen />} path='/placeorder' />
          <Route element={<PaymentsScreen />} path='/payments' />
          <Route element={<ProfileScreen />} path='/profile' />
          <Route element={<UserListScreen />} path='/admin/userList' />
          <Route element={<UserEditScreen />} path='/admin/user/:id/edit' />
          <Route element={<ProductEditScreen />} path='/admin/product/:id/edit' />
          <Route element={<ProductListScreen />} path='/admin/productList' />
          <Route element={<OrderListScreen />} path='/admin/orderList' />
          <Route element={<UserEditScreen />} path='/admin/user/:id/edit' />
          <Route element={<RegisterScreen />} path='/register' />
          <Route element={<ProductScreen />} path='/product/:id' />
          <Route element={<CartScreens />} path='/cart/:id?' />
          <Route element={<HomeScreen />} path='/search/:keyword' />
          <Route element={<HomeScreen />} path='/page/:pageNumber' />
          <Route element={<ProductListScreen />} path='/admin/productList/:pageNumber' />
          <Route element={<HomeScreen />} path='/search/:keyword/page/:pageNumber' />
          <Route element={<HomeScreen />} path='/' />
        </Routes>
      </MainLayout>
  );
}

export default App;
