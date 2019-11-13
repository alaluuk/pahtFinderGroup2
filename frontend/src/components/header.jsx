import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import Overview from '../pages/overview';
import { Link } from 'react-router-dom'


class Header extends Component {
    state = {  }

    loadOverview = () => {
       ReactDOM.render(Overview, document.getElementById('root'));
      }

    loadMarketplace = () => {
    console.log('this is:', this);
    }

    loadShop = () => {
        console.log('this is:', this);
        }

    render() { 
        return (

        <div className = "header">

            <h1 className = "header_logo">greenHouse</h1>

            <div className = "menu">
                <Link to="/overview" className = "menuItem">My buildings</Link>
                <Link to="/overview" className = "menuItem">Marketplace</Link>
                <Link to="/overview" className = "menuItem">Shop</Link>
            </div>

            <div className = "login"> 
            <img className = "loginLogo" src = "https://www.svgrepo.com/show/81219/user-symbol-of-thin-outline.svg"></img>

            
            <h3 className = "loginText">Sign In</h3>
            </div>

            
            
            
            

        </div>
        
        
        
        );
    }
}
 
export default Header;