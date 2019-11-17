import React, { Component } from 'react'
import '../styles/footer.css'
import { FaFacebookF } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaTwitter} from 'react-icons/fa';




class Footer extends Component {
    state = {  }
    render() { 
        return (

            <div className = "footer">

                <div className = "container"> 


                <div className = "contact">
                    <p className = "description"> CONTACT US</p>
                    <div> 
                        <p>+358 1234567</p>
                        <p>info@greenhouse.com</p>
                        <p>Kotkantie 1</p>
                        <p> 90250 Oulu</p>
                        </div>
                </div>

                <div className = "information">
                <p className = "description"> INFORMATION</p>
                    <div> 
                        <p>About Us</p>
                        <p>Work With Us</p>
                        <p> Privacy Policy</p>
                        <p>Terms &amp; Conditions</p>
                    </div>
                </div>

                <div className = "service">
                    <p className = "description"> SERVICE</p>
                    <div> 
                        <p>FAQ</p>
                        <p>Press Enquiries</p>
                        </div>
                </div>


                <div className = "socialMedia">
                <h3><FaInstagram/></h3>
                <h3><FaTwitter/></h3>
                <h3><FaFacebookF/></h3>
                </div>
                </div>

                <div className = "copyRight">
                    <p > © greenHouse 2019</p>
                </div>
                
            </div>
        
        
        );
    }
}
 
export default Footer;