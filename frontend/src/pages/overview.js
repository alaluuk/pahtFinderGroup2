import React from 'react';
import '../styles/overview.css';
import Card from '../components/card';
import Header from '../components/header';
import Body from '../components/Overview/body';
import Footer from '../components/footer';

class Overview extends React.Component {
    render() {
        return (
             <div className="Overview">
             <Header></Header>
             <Body></Body>
             <Footer></Footer>
           </div>
        );
    }
}

export default Overview