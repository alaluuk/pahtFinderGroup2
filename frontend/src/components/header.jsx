import React, { Component } from 'react'


class Header extends Component {
    state = {  }
    render() { 
        return (

        <div className = "header">

            <div className = "landingHeader"> 
            <img className = "loginLogo" src = "https://www.svgrepo.com/show/81219/user-symbol-of-thin-outline.svg"></img>

            <h3 className = "loginText">Sign In</h3>
            </div>

            <h1 className = "header_logo">greenHouse</h1>
            
            

        </div>
        
        
        
        );
    }
}
 
export default Header;