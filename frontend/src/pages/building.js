import React from 'react';
import '../styles/addBuilding.css';
import Header from '../components/header';
import Footer from '../components/footer';
import Body from '../components/Building/body';



class Building extends React.Component {
    render() {
        return (
            <div className="Building">
              
              <Header></Header>
              <Body></Body>
              <Footer></Footer>
            </div>
          );
    }
}

export default Building