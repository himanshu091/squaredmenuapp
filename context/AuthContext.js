import createDataContext from './createDataContext';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signout':
      return {token: null, email: '', name:'', user_id: ''};
    case 'signin':
        return {
            token: action.payload.token,
            email: action.payload.email,
            name: action.payload.name,
            user_id: action.payload.user_id,
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
  // console.log('Signin');
  return ({email, name, token, user_id}) => {
    // Do some API Request here
    console.log('Signin');
    dispatch({
      type: 'signin',
      payload: {
        name,
        user_id,
        token,
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
  {token: null, email: '', user_id:'',name:'', new_device: true},
);