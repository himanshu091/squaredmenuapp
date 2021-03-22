import createDataContext from './createDataContext';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signout':
      return {token: null, email: ''};
    case 'signin':
        return {
            token: action.payload.token,
            email: action.payload.email,
            new_device: false
          };
    case 'signup':
      return {
        token: action.payload.token,
        email: action.payload.email,
        new_device: false
      };
    case 'beginAuth':
      return {
        new_device: false
      };
    default:
      return state;
  }
};

const signup = dispatch => {
  return ({email, password}) => {
    console.log('Signup');
  };
};

const signin = dispatch => {
  return ({email, password}) => {
    // Do some API Request here
    console.log('Signin');
    dispatch({
      type: 'signin',
      payload: {
        token: 'some access token here',
        email,
      },
    });
  };
};

const signout = dispatch => {
  return () => {
    dispatch({type: 'signout'});
  };
};
const beginAuth = dispatch => {
  return () => {
    dispatch({type: 'beginAuth'});
  };
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {signin, signout, signup, beginAuth},
  {token: null, email: '', new_device: true},
);