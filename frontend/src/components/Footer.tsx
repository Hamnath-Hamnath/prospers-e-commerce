import React from 'react'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer>
        <Container>
            <Row>
                <Col className='text-center py-3'>
                    Copyright &copy; Prospera
                </Col>  
            </Row>
        </Container>
    </footer>
  )
}

export default Footer