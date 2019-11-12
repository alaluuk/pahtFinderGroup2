import Cookies from 'js-cookie';
import GraphQLClient from './graphql';

export const getJWT = () => {
  return Cookies.get('__session_jwt');
}

export const getSession = () => {
  const jwt = Cookies.get('__session_jwt');
  let session = null;
  try {
    if(jwt) {
      const base64Payload = jwt.split('.')[1];
      const base64 = base64Payload.replace('-', '+').replace('_', '/');
      const parsed = JSON.parse(window.atob(base64));
      if(parsed.exp < (Date.now()/1000)) {
        throw new Error("The JWT stored in the session cookie is expired!");
      }
      session = parsed;
    }
  } catch(err) {
    console.error("Could not decode the JWT stored in the session cookie: ", err);
  }
  return session;
}

export const performLogin = (email, password, longLived = false) => {
  return new Promise((resolve, reject) => {
    GraphQLClient.request(`
      mutation($email: String!, $password: String!, $longLived: Boolean!) {
        login(
          email: $email,
          password: $password
          longLived: $longLived
        ) {
          token
          user {
            id
            name
            role
            permissions
          }
        }
      }
    `, {
      email: email,
      password: password,
      longLived: longLived
    })
      .then(data => {
        Cookies.set('__session_jwt', data.login.token);
        resolve(data.login);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export const performLogout = () => {
  Cookies.remove('__session_jwt');
}