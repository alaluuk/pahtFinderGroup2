import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag'
import { AUTH_TOKEN } from '../../constants'


const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`

class Body extends Component {
    state = {
        email: '',
        password: '',
        name: '',
        errorMessage: ''
    }
    render(props) {
        const { email, password, name, errorMessage } = this.state;
        return (
            <div className="body">


                <div className="landingPageBody">
                    <div className="landingPageBodyContent">
                        <h2 className="landingPageHeader"> Revolutionize the energy efficiency <br></br>of your home</h2>
                        <p className="landingPageText"> It does not matter if it’s a block of flats, a single or multiple building.
                                                            With us you get professional instant recommendations that will
                                                            help you to make your building as energy efficient as possible.
                                                    So you not only save energy, but do the planet something good.</p>



                        {/* email, name and password input fields */}
                        <TextField id="outlined-basic" className="inputUserName" label="User Name" margin="normal" variant="outlined"
                            autoComplete="name" onChange={e => this.setState({ name: e.target.value })} />
                        <br></br>
                        <TextField id="outlined-basic" className="inputUserMail" label="Email address" margin="normal" variant="outlined"
                            autoComplete="email" name="email" onChange={e => this.setState({ email: e.target.value })} />
                        <br></br>
                        <TextField id="outlined-basic" className="inputUserPassword" label="Your Password" margin="normal" variant="outlined"
                            type="password" name="password" autoComplete="current-password" onChange={e => this.setState({ password: e.target.value })} />
                        <br></br>

                        {/* error message displayed if sign up was not successful */}
                        <Typography variant="subtitle1" component="p" style={{ color: 'red' }} >
                            {errorMessage}
                        </Typography>

                        {/* Sign up with third party accounts */}
                        <Button variant="contained" className="googleSignUp">Sign up with Google </Button>
                        <Button variant="contained" className="facebookSignUp"> Sign up with Facebook</Button>

                        {/* Sign up with email apollo mutation */}
                        <Mutation
                            mutation={SIGNUP_MUTATION}
                            variables={{ email, password, name }}
                            onCompleted={data => this._saveNewUser(data)}
                            onError={data => this.setState({ errorMessage: data.graphQLErrors[0].message })}
                        >
                            {mutation => (
                                <Button variant="contained" className="emailSignUp" onClick={mutation}>
                                    Sign up with Email
                                </Button>
                            )}
                        </Mutation>

                    </div>

                </div>

            </div>

        );
    }

    _saveNewUser = async data => {
        localStorage.removeItem(AUTH_TOKEN)
        const { token } = data.signup
        localStorage.setItem(AUTH_TOKEN, token)
        this.props.history.push(`/overview`)
    }
}

export default withRouter(Body);