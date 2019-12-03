import React from 'react';
import '../styles/addBuilding.scss';
import Header from '../components/Header/header';
import Footer from '../components/footer';
import Body from '../components/Building/body';



class Building extends React.Component {

  state = {

    id: "",
  }
  
  constructor(props){
    super(props)
    const {buildingID}= this.props.location.state
    this.state.id = buildingID;
  }

 
  render() {

        return (
            <div className="Building">


              
              <Header></Header>
              <Body id = {this.state.id}></Body>
              <Footer></Footer>
            </div>
          );
    }
}

export default Building