import {ReactElement,ReactPortal} from 'react'
import Header from '../components/Header'
import {Container} from 'react-bootstrap'
import Footer from '../components/Footer';
import {BrowserRouter as Router} from 'react-router-dom';

type ReactText = string | number;
type ReactChild = ReactElement | ReactText;

interface ReactNodeArray extends Array<ReactNode> {}
type ReactFragment = {} | ReactNodeArray;
type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;

type Props = {
  children: ReactNode | any
}

const MainLayout = ({children}: Props) => {
  return (
    <Router>
        <Header/>
        <main className='py-3'>
            <Container>
                {children}
            </Container>
        </main>
        <Footer/>
    </Router>
  )
}

export default MainLayout