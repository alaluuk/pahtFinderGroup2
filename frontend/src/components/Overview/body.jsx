import React, { Component } from 'react';
import Card from '../card';
import AddCard from '../addCard';

class Body extends Component {
    state = {  }
    render() { 
        return ( <div className = "body">
                    <div className = "content">
                        <h1 className = "overviewHeader">My buildings</h1>
                        <div className = "scrollBars">
                        <Card></Card>
                        <Card></Card>
                        <Card></Card>
                        <AddCard></AddCard>
                        </div>

                        <div className = "bottomContent">
                            <h1>hello</h1>
                            <h1>hello</h1>

                        </div>
                        
                    </div>
        
                </div> );
    }
}
 
export default Body;