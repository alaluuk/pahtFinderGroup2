import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import Overview from '../pages/overview';
import { Link } from 'react-router-dom'
import '../styles/header.css'
import { FaRegUser } from "react-icons/fa"


class Header extends Component {
    state = {}

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

            <div className="header">

                <h1 className="header_logo">greenHouse</h1>

                <div className="menu">
                    <Link to="/overview" className="menuItem">My buildings</Link>
                    <Link to="/marketplace" className="menuItem">Marketplace</Link>
                    <Link to="/wishlist" className="menuItem">Wishlist</Link>
                </div>

                <div className="loginArea">
                    <Link to="/signin" className="menuItem">Sign In</Link>
                    <h3 className="loginLogo"><FaRegUser /></h3>
                </div>


            </div>



        );
    }
}

export default Header;