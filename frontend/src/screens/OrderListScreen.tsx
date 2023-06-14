import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listOrders } from '../actions/orderAction';
import { Dispatch } from 'redux';
import { LinkContainer } from 'react-router-bootstrap';
import moment from 'moment';

const OrderListScreen = () => {
  const navigate: (path: string) => void = useNavigate();
  const dispatch: (dispatch: any) => Promise<void> = useDispatch<Dispatch>();

  const orderLists = useSelector((state: any) => state.orderList);
  const { loading, error, orders } = orderLists;

  const userLogin: any = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate('/login');
    }
  }, [dispatch, userInfo, navigate]);

  // const deleteHandler: (id: number | string) => void = (id) => {
  //   dispatch(deleteUser(id));
  // };

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>
                  {moment(order.createdAt).format('MMMM Do YYYY, h:mm a')}
                </td>
                <td>${order.totalPrice}</td>
                <td className='text-center'>
                  {order.isPaid ? (
                    moment(order.paidAt).format('MMMM Do YYYY, h:mm a')
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }} />
                  )}
                </td>
                <td className='text-center'>
                  {order.isDelivered ? (
                    moment(order.deliveredAt).format('MMMM Do YYYY')
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
