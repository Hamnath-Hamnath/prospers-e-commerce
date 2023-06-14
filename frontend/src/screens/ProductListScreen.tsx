import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Dispatch } from 'redux';
import { LinkContainer } from 'react-router-bootstrap';
import { deleteProduct, listProducts } from '../actions/productAction';
import { PRODUCT_CREATE_RESET } from '../constant/productConstant';
import { createProduct } from '../actions/productAction';
import Paginate from '../components/Paginate';

type state = {
  productList: {
    error: any | {};
    loading: boolean;
    products: [];
    page:number;
    pages:number
  };
};

const ProductListScreen = () => {
  const navigate: (path: string) => void = useNavigate();
  const { pageNumber }: any = useParams();
  const dispatch: (dispatch: any) => Promise<void> = useDispatch<Dispatch>();

  const productList = useSelector((state: state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const userLogin: any = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete: any = useSelector((state: any) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
  } = productDelete;

  const productCreate: any = useSelector((state: any) => state.productCreate);
  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
  } = productCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      navigate('/login');
    }
    if (successCreate) {
      navigate(`/admin/product/${productCreate._id}/edit`);
    } else {
      dispatch(listProducts('', Number(pageNumber) ?? 1));
    }
  }, [dispatch, userInfo, navigate, successCreate,pageNumber]);

  const deleteHandler: (id: number | string) => void = (id) => {
    dispatch(deleteProduct(id));
  };

  const createProductHandler: () => void = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus me-2' />
            Create product
          </Button>
        </Col>
      </Row>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loadingDelete ? (
        <Loader />
      ) : errorDelete ? (
        <Message variant='danger'>{errorDelete}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map(
                (product: {
                  _id: number | string;
                  name: string;
                  price: number | string;
                  category: string;
                  brand: string;
                }) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant='light' className='btn-sm'>
                          <i className='fas fa-edit' />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(product._id)}
                      >
                        <i className='fas fa-trash' />
                      </Button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
          <Paginate
            page={page}
            pages={pages}
            isAdmin={true}
            keyword={''}
          />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
