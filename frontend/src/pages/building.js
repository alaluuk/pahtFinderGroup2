import React from 'react';
import '../styles/addBuilding.scss';
import Header from '../components/Header/header';
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