import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { register } from '../actions/userAction';
import FormContainer from '../components/FormContainer';
import { Dispatch } from 'redux';


const RegisterScreen = () => {
  const location: any | String | {} = useLocation();
  const navigate: string | any = useNavigate();
  const redirect: boolean | unknown = location.search
    ? location.search.split('=')[1]
    : '/';
  const [email, setEmail] = useState<String | any>('');
  const [name, setName] = useState<String | any>('');
  const [message, setMessage] = useState<any>(null);
  const [password, setPassword] = useState<String | any>('');
  const [confirmPassword, setConfirmPassword] = useState<String | any>('');

  const dispatch: Dispatch | any = useDispatch();

  const userRegister = useSelector((state: any) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const registerHandler = (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Password do not match!');
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant={'danger'}>{message}</Message>}
      {error && <Message variant={'danger'}>{error}</Message>}
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
          Register
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
