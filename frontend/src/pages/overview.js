import React from 'react';
import '../styles/overview.css';
import Card from '../components/card';

class Overview extends React.Component {
    render() {
        return (
            <div>
            <h1>Overview</h1>
            <Card></Card>
            </div>
        );
    }
}

export default Overview