import React from 'react';
import '../styles/addBuilding.scss';
import Header from '../components/Header/header';
import Footer from '../components/footer';
import Body from '../components/Building/body';



class Building extends React.Component {

  state = {

    id: "",
    EE: "",
    image: ""
  } 
  
  constructor(props){
    super(props)
    
    const {buildingID}= this.props.location.state
    this.state.id = buildingID;

    const {EEValue} = this.props.location.state
    this.state.EE = EEValue;

    const{buildingImage} = this.props.location.state
    this.state.image = buildingImage;
  }

 
  render() {

        return (
            <div className="Building">


              
              <Header></Header>
              <Body id = {this.state.id} EE = {this.state.EE} image = {this.state.image}></Body>
              <Footer></Footer>
            </div>
          );
    }
}

export default Building