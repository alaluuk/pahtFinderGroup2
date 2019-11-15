import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Body from '../components/Marketplace/body';



class Marketplace extends React.Component {
    render() {
        return (
            <div className="Marketplace">
              
              <Header></Header>
              <Body></Body>
              <Footer></Footer>
            </div>
          );
    }
}

export default Marketplace