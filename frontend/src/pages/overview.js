import React from 'react';
import '../styles/overview.scss';
import Header from '../components/Header/header';
import Body from '../components/Overview/body';
import Footer from '../components/footer';


class Overview extends React.Component {


    state = {

        refresh: false,
      } 
      
      constructor(props){
        super(props)
        this.state.refresh = this.props.location.state;
      }

    render() {
        return (
             <div className="Overview">
             <Header></Header>
             <Body refresh = {this.state.refresh}></Body>
             <Footer></Footer>
           </div>
        );
    }
}

export default Overview