import Cookies from 'js-cookie';
import GraphQLClient from './graphql';

let cachedUser = null;
let cachedUserTTL = 0;

export const rolesFormatter = (role) => {
  let formatted = {
    'admin': 'Administrator',
    'customer': 'Customer'
  };
  return (formatted.hasOwnProperty(role)) ? formatted[role] : role;
}

export const getJWT = () => {
  return Cookies.get('__session_jwt');
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
            email
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
        cachedUser = data.user;
        cachedUserTTL = Date.now() + 60000;
        refreshBearer();
        resolve(data.login);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export const performLogout = () => {
  return new Promise((resolve, reject) => {
    Cookies.remove('__session_jwt');
    cachedUser = null;
    cachedUserTTL = Date.now();
    refreshBearer();
    resolve(true);
  });
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
        performLogout();
        throw new Error("The JWT stored in the session cookie is expired!");
      }
      session = parsed;
    }
  } catch(err) {
    console.error("Could not decode the JWT stored in the session cookie: ", err);
  }
  return session;
}

export const fetchUser = (disableCache = false) => {
  return new Promise((resolve, reject) => {
    let session = getSession();
    if(session === null) reject(new Error("No authentication provided."))
    if(!disableCache && (cachedUser !== null && cachedUserTTL <= Date.now())) {
      resolve(cachedUser);
    }
    GraphQLClient.request(`
      query($id: ID!) {
        users(id: $id) {
          id
          name
          email
          role
          permissions
        }
      }
    `, {
      id: session.user.id
    })
      .then(data => {
        cachedUser = data.users[0];
        cachedUserTTL = Date.now();
        resolve(cachedUser);
      })
      .catch(err => {
        performLogout();
        reject(err);
      });
  });
}

export const refreshBearer = () => {
  GraphQLClient.options.headers.authorization = (getJWT()) ? 'Bearer ' + getJWT() : '';
}