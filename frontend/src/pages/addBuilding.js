import React from 'react';
import '../styles/addBuilding.css';
import Header from '../components/Header/header';
import Footer from '../components/footer';
import AddNewBuilding from '../components/AddBuilding/body';


class AddBuilding extends React.Component {
    render() {
        return (
            <div className="AddBuilding">
              
              <Header></Header>
              <AddNewBuilding></AddNewBuilding>
              <Footer></Footer>
            </div>
          );
    }
}

export default AddBuilding