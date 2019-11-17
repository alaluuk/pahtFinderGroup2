import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Body from '../components/Wishlist/body';



class Wishlist extends React.Component {
    render() {
        return (
            <div className="Wishlist">
              
              <Header></Header>
              <Body></Body>
              <Footer></Footer>
            </div>
          );
    }
}

export default Wishlist