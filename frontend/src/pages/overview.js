import React from 'react';
import '../styles/overview.css';
import Card from '../components/card';
import Header from '../components/header';
import Footer from '../components/footer';

class Overview extends React.Component {
    render() {
        return (
            <div>
            <Header></Header>
            <Card></Card>
            <Footer></Footer>
            </div>
        );
    }
}

export default Overview