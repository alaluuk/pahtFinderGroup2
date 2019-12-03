import React from 'react';
import '../styles/addBuilding.scss';
import Header from '../components/Header/header';
import Footer from '../components/footer';
import EditBuilding from '../components/EditBuilding/body';


class EditBuildingPage extends React.Component {
    render() {
        return (
            <div className="AddBuilding">   
              <Header></Header>
              <EditBuilding></EditBuilding>
              <Footer></Footer>
            </div>
          );
    }
} 

export default EditBuildingPage