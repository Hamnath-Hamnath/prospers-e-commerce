import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

type Props = {};

const SearchBox = (props: Props) => {
  const [keyword, setKeyword] = useState<string>('');
  const navigate:any = useNavigate();

  const submitHandler = (e:any) => {
    e.preventDefault(); 
    if(keyword.trim()){
        navigate(`/search/${keyword}`)
    }else{
        navigate('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
      <Form.Control
        type='text'
        name='q'
        onChange={(e: any) => {
          setKeyword(e.target.value);
        }}
        placeholder='search keyword...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2 ms-2'>Search</Button>
    </Form>
  );
};

export default SearchBox;
