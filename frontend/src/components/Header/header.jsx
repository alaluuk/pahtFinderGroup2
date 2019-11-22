import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/header.scss';
import UserMenu from './userMenu';
import { AUTH_TOKEN } from '../../constants'


class Header extends Component {
    state = {}

    render() {
        const authToken = localStorage.getItem(AUTH_TOKEN)
        return (

            <div className="header">

                <h1 className="header_logo">greenHouse</h1>

                {authToken ? (
                    <div className="menu">
                        <Link to="/overview" className="menuItem">My buildings</Link>
                        <Link to="/marketplace" className="menuItem">Marketplace</Link>
                        <Link to="/wishlist" className="menuItem">Wishlist</Link>
                    </div>
                ) : (<div></div>)}

                {authToken ? (
                    <div className="loginArea">
                        <Link to="/" className="menuItem" onClick={() => {
                            localStorage.removeItem(AUTH_TOKEN)
                        }}>
                            Sign Out
                        </Link>
                        <UserMenu></UserMenu>
                    </div>
                ) : (
                        <div className="loginArea">
                            <Link to="/signin" className="menuItem">Sign In</Link>
                        </div>
                    )}




            </div>



        );
    }
}

export default Header;