import React, { useEffect } from 'react';
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import {
  Row,
  ListGroup,
  Col,
  Form,
  Button,
  Card,
  Image,
} from 'react-bootstrap';
import { addToCart, removeFromCart } from '../actions/cartAction';
import { Dispatch } from 'redux';

type Props = {};

const CartScreens = (props: Props) => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const qty: any = searchParams.get('qty');
  const navigate: any = useNavigate();
  const dispatch: Dispatch | any = useDispatch();

  const cart: any = useSelector((state) => state);
  const { cartItems }: any = cart.cart;

  useEffect(() => {
    dispatch(addToCart(id, qty));
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id: number | any) => {
    dispatch(removeFromCart(id));
  };

  const proceedToCheckout = () => {
    navigate('/login?redirect=shipping');
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 && qty === null ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item: any) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link
                      to={`/product/${item.product}`}
                      className='text-decoration-none'
                    >
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}> ${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) => {
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        );
                      }}
                    >
                      {[...Array(item?.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash' />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems?.reduce((acc: any, item: any) => acc + item.qty, 0)})
                items
              </h2>
              $
              {cartItems?.reduce(
                (acc: any, item: any) => acc + item.qty * item.price,
                0
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={proceedToCheckout}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreens;
