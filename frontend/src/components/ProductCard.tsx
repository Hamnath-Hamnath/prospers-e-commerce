import {Card} from 'react-bootstrap'
import Rating from './Rating'
import {Link} from 'react-router-dom'
type Props = {
    products : [] | any
}

const ProductCard = ({products}: Props) => {
  return (
    <Card className='my-3 p-3 rounded'>
        <Link to={`/product/${products._id}`}>
            <Card.Img src={products.image} variant='top'/>
        </Link>
        <Card.Body>
            <Link to={`/product/${products._id}`}>
                <Card.Title as='div'>
                    <strong>{products.name}</strong>
                </Card.Title>
            </Link>
            <Card.Text as='div'>
                <Rating rating={products.rating} reviews={`from ${products.numReviews} reviews`} />
            </Card.Text>
            <Card.Text as='h3'>${products.price}</Card.Text>
        </Card.Body>
    </Card>

  )
}

export default ProductCard