import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { deleteUser, listUsers } from '../actions/userAction';
import { Dispatch } from 'redux';
import { LinkContainer } from 'react-router-bootstrap';

type state = {
  userList: {
    error: any | {};
    loading: boolean;
    users: [];
  };
};

const UserListScreen = () => {
  const navigate: (path: string) => void = useNavigate();
  const dispatch: (dispatch: any) => Promise<void> = useDispatch<Dispatch>();

  const userLists = useSelector((state: state) => state.userList);
  const { loading, error, users } = userLists;

  const userLogin: any = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete: any = useSelector((state: any) => state.userDelete);
  const { success:successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate('/login');
    }

  }, [dispatch, userInfo, navigate, successDelete]);

  const deleteHandler: (id: number | string) => void = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(
              (user: {
                _id: number | string;
                name: string;
                email: string;
                isAdmin: boolean;
              }) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td className='text-center'>
                    {user.isAdmin ? (
                      <i className='fas fa-check' style={{ color: 'green' }} />
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit' />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className='fas fa-trash' />
                    </Button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
