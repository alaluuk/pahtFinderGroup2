import React, { Component } from 'react'
import { Button} from 'react-bootstrap';


class Body extends Component {
    state = {  }
    render() { 
        return (
        <div className = "body">

           
            <div className = "landingPageBody">
                <div className = "landingPageBodyContent"> 
                <h2 className = "landingPageHeader"> Revolutionize the energy efficiency <br></br>of your home</h2>
                <p className = "landingPageText"> It does not matter if it’s a block of flats, a single or multiple building. 
                                                    With us you get professional instant recommendations that will 
                                                    help you to make your building as energy efficient as possible. 
                                                    So you not only save energy, but do the planet something good.</p>
                
                
                
                <input className = "inputUserName" type="text" name="UserName" placeholder="User Name"/><br></br>
                <input className = "inputUserMail" type="text" name="UserMail" placeholder="Email address"/><br></br>
                <input className = "inputUserPassword" type="text" name="UserPassword" placeholder="Your Password"/><br></br>

                <Button className = "googleSignUp"> Sign up with Google</Button>
                <Button className = "facebookSignUp"> Sign up with Facebook</Button>
                <Button className = "emailSignUp"> Sign up with Email</Button>

               

                </div>

            </div>

        </div>
        
        );
    }
}
 
export default Body;