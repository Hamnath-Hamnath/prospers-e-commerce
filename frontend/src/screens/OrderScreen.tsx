import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import {
  getOrderDetails,
  payOrder,
  orderDeliverACT,
} from '../actions/orderAction';
import Loader from '../components/Loader';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../constant/orderConstant';
import { CLIENT_ID } from '../config/config';
import moment from 'moment';
type cartItemDetails = {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: string | number | any;
};

const OrderScreen = () => {
  const dispatch: any = useDispatch();
  const { id }: string | number | any = useParams();

  const navigate: any = useNavigate();

  const orderDetails = useSelector(
    (state: {
      orderDetails: { order: [] | any; loading: boolean; error: [] | any };
    }) => state.orderDetails
  );
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  const orderPay = useSelector(
    (state: { orderPay: { loading: boolean; success: boolean } }) =>
      state.orderPay
  );
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state: any) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const addDecimals = (num: number): number | string =>
    Math.round((num * 100) / 100).toFixed(2);

  const itemPrice: number = order?.orderItems?.reduce(
    (acc: number, item: cartItemDetails) => acc + item.price * item.qty,
    0
  );

  // const addPayPal = async () => {
  //   return await payPalClient()
  //     .then((clientID: any) => {
  //       const script = document.createElement('script');
  //       script.type = 'text/javascript';
  //       script.src = `https://www.paypal.com/sdk/js?client-id=${clientID}`;
  //       script.async = true;
  //       script.onload = () => setSDKReady(true);
  //       document.body.appendChild(script);
  //       setPayPalClientID(clientID);
  //     })
  //     .catch((error: Error) => {
  //       console.error('Error:', error);
  //     });
  // };

  useEffect(() => {
    if (!order || order._id !== id || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(id));
    }
  }, [order, id, dispatch, successPay, successDeliver]);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  // creates a paypal order
  const createOrder = (data: any, actions: any) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderID: any) => {
        // console.log('create order', orderID);
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then(function (details: any) {
      dispatch(payOrder(id, details));
    });
  };

  //capture likely error
  // const onError = (data, actions) => {
  //     setErrorMessage("An Error occured with your payment ");
  // };

  const deliverHandler = () => {
    dispatch(orderDeliverACT(id));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <PayPalScriptProvider options={{ 'client-id': CLIENT_ID }}>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}> {order.user.email}</a>
              </p>

              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {moment(order.deliveredAt).format('MMMM Do YYYY, h:mm:ss a')}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>
                  Paid on{' '}
                  {moment(order.paidAt).format('MMMM Do YYYY, h:mm:ss a')}
                </Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            {/* ---------- */}
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order?.orderItems?.length === 0 ? (
                <Message>Your Order is empty!</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order?.orderItems?.map(
                    (item: cartItemDetails, index: number) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item?.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/products/${item?.product}`}>
                              {item?.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty ?? 0} x ${item?.price ?? 0} = $
                            {Number(item?.qty) * item?.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )
                  )}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${addDecimals(itemPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${addDecimals(order.shippingPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${addDecimals(order.taxPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${addDecimals(order.totalPrice)}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay ? (
                    <Loader />
                  ) : (
                    <PayPalButtons
                      style={{ layout: 'vertical' }}
                      createOrder={createOrder}
                      onApprove={onApprove}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block w-100'
                      onClick={deliverHandler}
                    >
                      Mark as delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </PayPalScriptProvider>
  );
};

export default OrderScreen;
