import React, { useState, FormEvent, FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../actions/cartAction';
import CheckoutSteps from '../components/CheckoutSteps';

type Props = {};

const ShippingScreens = (props: Props) => {
  const navigate: string | any = useNavigate();
  const cart = useSelector((state:any) => state.cart )
  const {shippingAddress} = cart
  const dispatch :any= useDispatch()
  const [address, setAddress] = useState<string>(shippingAddress.address || '');
  const [city, setSetCity] = useState<string>(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState<string>(shippingAddress.postalCode || '');
  const [country, setCountry] = useState<string>(shippingAddress.country || '');

  const submitHandler: FormEventHandler<HTMLFormElement> = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(saveShippingAddress({address,city,postalCode,country}))
    navigate('/payments')
  };
  return (
    <FormContainer>
      <CheckoutSteps step1={true} step2={true} step3={false} step4={false}/>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address' className='mb-3'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='city' className='mb-3'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={city}
            required
            onChange={(e) => setSetCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='postalcode' className='mb-3'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter postal code'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='country' className='mb-3'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter country'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>Continue</Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreens;
