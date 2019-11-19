import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import '../styles/login.scss';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`


class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  render() {
    const { email, password } = this.state
    return (
      <div>
        <h4 className="mv3">{'Login'}</h4>
        <div className="flex flex-column">
          <input
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            type="text"
            placeholder="email address"
          />
          <input
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="password"
          />
        </div>
        <div className="flex mt3">
          <Mutation
            mutation={LOGIN_MUTATION}
            variables={{ email, password }}
            onCompleted={data => this._confirm(data)}
          >
            {mutation => (
              <div className="pointer mr2 button" onClick={mutation}>
                {'login'}
              </div>
            )}
          </Mutation>
        </div>
      </div>
    )
  }

  _confirm = async data => {
    const { token } = data.login
    this._saveUserData(token)
    this.props.history.push(`/overview`)
  }
  

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

export default Login