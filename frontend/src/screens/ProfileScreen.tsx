import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Col, Row, Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  getUserDetails,
  updateUserProfileDetails,
} from '../actions/userAction';
import { Dispatch } from 'redux';
import { getMyListOrder } from '../actions/orderAction';
import { LinkContainer } from 'react-router-bootstrap';

type Props = {};

export const ProfileScreen = (props: Props) => {
  // const location: any | String | {} = useLocation();
  const navigate: string | any = useNavigate();
  const [email, setEmail] = useState<String | any>('');
  const [name, setName] = useState<String | any>('');
  const [message, setMessage] = useState<any>(null);
  const [password, setPassword] = useState<String | any>('');
  const [confirmPassword, setConfirmPassword] = useState<String | any>('');

  const dispatch: Dispatch | any = useDispatch();

  const userDetails = useSelector((state: any) => state.userDetails);
  const { loading, error = false, user } = userDetails;

  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(
    (state: any) => state.userUpdateProfile
  );
  const { success = false } = userUpdateProfile;

  const orderMyList = useSelector((state: any) => state.orderMyList);
  const { loading: loadingOrders, error: orderError, orders } = orderMyList;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
        dispatch(getMyListOrder());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [navigate, userInfo, user, dispatch]);

  const registerHandler = (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Password do not match!');
    } else {
      dispatch(
        updateUserProfileDetails({ id: user._id, name, email, password })
      );
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant={'danger'}>{message}</Message>}
        {error && <Message variant={'danger'}>{error}</Message>}
        {success && <Message variant={'success'}>{'Profile Updated'}</Message>}
        {loading && <Loader />}
        <Form onSubmit={registerHandler}>
          <Form.Group controlId='name' className='mb-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email' className='mb-3'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password' className='mb-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword' className='mb-3'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : orderError ? (
          <Message variant='danger'>{orderError}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order: any) => (
                <tr key={order?._id}>
                  <td>{order?._id}</td>
                  <td>{order?.createdAt.substring(0, 10)}</td>
                  <td>{order?.totalPrice}</td>
                  <td>
                    {order?.isPaid ? (
                      order?.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }} />
                    )}
                  </td>
                  <td className='text-center'>{order?.isDelivered ? (
                      order?.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }} />
                    )}</td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className='btn-sm' variant='light'>Details</Button>
                      </LinkContainer>
                    </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};
