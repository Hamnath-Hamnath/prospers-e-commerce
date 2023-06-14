import React, { useEffect } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import { createOrderAction } from '../actions/orderAction';


type Props = {
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethods: string;
  cartItems: [];
};

type cartItemDetails = {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: string | number | any;
};

const PlaceOrderScreen = () => {
  const dispatch: any = useDispatch();

  const {
    cartItems,
    shippingAddress,
    shippingAddress: { address, city, postalCode, country },
    paymentMethods,
  }: Props = useSelector((state: any) => state.cart);

  const navigate:any = useNavigate()

  const addDecimals = (num: number): number | string =>
    Math.round((num * 100) / 100).toFixed(2);

  const itemPrice: number = cartItems?.reduce(
    (acc: number, item: cartItemDetails) => acc + item.price * item.qty,
    0
  );
  const shippingPrices: number = itemPrice > 100 ? 0 : 100;
  const taxPrices = Number((0.15 * itemPrice).toFixed(2));

  const orderCreate = useSelector(
    (state: {
      orderCreate: { order: []|any; success: boolean; error: [] | any };
    }) => state.orderCreate
  );
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if(success){
      navigate(`/order/${order._id}`)
    }
  },[navigate,success,order])

  const placeOrderHandler = () => {
    dispatch(
      createOrderAction({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethods,
        itemsPrice: itemPrice,
        taxPrice: taxPrices,
        shippingPrice: shippingPrices,
        totalPrice: (
          Number(itemPrice) +
          Number(shippingPrices) +
          Number(taxPrices)
        ).toFixed(2),
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {address}, {city}, {postalCode}, {country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethods}
              </p>
            </ListGroup.Item>

            {/* ---------- */}
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems?.length === 0 ? (
                <Message>Your cart is empty!</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cartItems?.map((item: cartItemDetails, index: number) => (
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
                  ))}
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
                  <Col>${addDecimals(shippingPrices)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${addDecimals(taxPrices)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>
                    $
                    {(
                      Number(itemPrice) +
                      Number(shippingPrices) +
                      Number(taxPrices)
                    ).toFixed(2)}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block w-100'
                  disabled={false}
                  onClick={placeOrderHandler}
                >
                  place order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
