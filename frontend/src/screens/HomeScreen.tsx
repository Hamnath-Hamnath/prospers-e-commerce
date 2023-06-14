import { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { listProducts } from '../actions/productAction';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';

type Props = {};

const HomeScreen = (props: Props) => {
  // const [products, setProducts] = useState<any>(); // uncomment it when not using redux

  const { keyword,pageNumber } = useParams();
  // Redux
  const dispatch: Dispatch | any = useDispatch();
  const productList: any = useSelector((state: any) => state);
  const { loading, error, products,page,pages }: any = productList.productList;

  useEffect(() => {
    // using redux
    dispatch(listProducts(keyword, Number(pageNumber) ?? 1));

    // Without using redux
    // const response = async () => {
    //   const x:[]|any = await getAllProducts();
    //   setProducts(x);
    // };
    // response();
  }, [dispatch, keyword,pageNumber]);
  return (
    <div>
      <Meta/>
      {/* {!keyword ? <ProductCarousel/> : <Link to='/' className='btn btn-light'>Go back</Link> } */}
      <h1>Latest Product</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row className='py-3'>
          {(products || [])?.map((data: [] | any) => (
            <Col xl={3} lg={4} md={6} sm={12} key={data._id}>
              <ProductCard products={data} />
            </Col>
          ))}
        </Row>
      )}
      <Paginate page={page} pages={pages} keyword={keyword ? keyword : ''} />
    </div>
  );
};

export default HomeScreen;
