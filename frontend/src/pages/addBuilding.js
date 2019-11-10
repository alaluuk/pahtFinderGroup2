import React from 'react';
import '../styles/addBuilding.css';
import Header from '../components/header';
import Footer from '../components/footer';
import AddNewBuilding from '../components/AddBuilding/addBuildingComp';


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