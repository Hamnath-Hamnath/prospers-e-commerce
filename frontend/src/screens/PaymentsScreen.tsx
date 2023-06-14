import React, { useState, FormEvent, FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { savePaymentMethods } from '../actions/cartAction';
import CheckoutSteps from '../components/CheckoutSteps';

type Props = {};

const PaymentsScreen = (props: Props) => {
  const navigate: string | any = useNavigate();

  const cart = useSelector((state: any) => state.cart);
  const { shippingAddress } = cart;

  const dispatch: any = useDispatch();

  const [paymentMethods, setPaymentMethods] = useState<string>('PayPal');

  if (!shippingAddress) {
    navigate('/shipping');
  }

  const submitHandler: FormEventHandler<HTMLFormElement> = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    dispatch(savePaymentMethods(paymentMethods));
    navigate('/placeorder');
  };
  return (
    <FormContainer>
      <CheckoutSteps step1={true} step2={true} step3={true} step4={false} />
      <h1>Payment Methods</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='paypal'
              name='paymentMethods'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethods(e.target.value)}
            >
            </Form.Check>
            <Form.Check
              type='radio'
              label='Stripe'
              id='stripe'
              name='paymentMethods'
              value='Stripe'
              checked
              onChange={(e) => setPaymentMethods(e.target.value)}
            >
            </Form.Check>
          </Col>
        </Form.Group>
        <Button type='submit' variant='primary' className='mt-3'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentsScreen;
