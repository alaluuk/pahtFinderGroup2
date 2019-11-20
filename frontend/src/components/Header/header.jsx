import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/header.css';
import { FaRegUser } from "react-icons/fa"
import UserMenu from './userMenu';


class Header extends Component {
    state = {  }

    render() { 
        return ( 

        <div className = "header">

            <h1 className = "header_logo">greenHouse</h1>

            <div className = "menu">
                <Link to="/overview" className = "menuItem">My buildings</Link>
                <Link to="/marketplace" className = "menuItem">Marketplace</Link>
                <Link to="/wishlist" className = "menuItem">Wishlist</Link>
            </div>

            <div className = "loginArea"> 
            <h3 className = "loginText">Sign In</h3>
            <UserMenu></UserMenu>

            

            </div>
            
            
            

        </div>
        
        
        
        );
    }
}
 
export default Header;