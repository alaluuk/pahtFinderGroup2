import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class Body extends Component {
    state = {}
    render() {
        return (
            <div className="body">


                <div className="landingPageBody">
                    <div className="landingPageBodyContent">
                        <h2 className="landingPageHeader"> Revolutionize the energy efficiency <br></br>of your home</h2>
                        <p className="landingPageText"> It does not matter if it’s a block of flats, a single or multiple building.
                                                            With us you get professional instant recommendations that will
                                                            help you to make your building as energy efficient as possible.
                                                    So you not only save energy, but do the planet something good.</p>




                        <TextField id="outlined-basic" className="inputUserName" label="User Name" margin="normal" variant="outlined" /> <br></br>
                        <TextField id="outlined-basic" className="inputUserMail" label="Email address" margin="normal" variant="outlined" /> <br></br>
                        <TextField id="outlined-basic" className="inputUserPassword" label="Your Password" margin="normal" variant="outlined" /> <br></br>





                        <Button variant="contained" className="googleSignUp">Sign up with Google </Button>
                        <Button variant="contained" className="facebookSignUp"> Sign up with Facebook</Button>
                        <Button variant="contained" className="emailSignUp"> Sign up with Email</Button>



                    </div>

                </div>

            </div>

        );
    }
}

export default Body;