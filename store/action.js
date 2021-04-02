import axios from 'axios'

const API_URL = "http://scanorderpay.ctportfolio.in/api/restaurant";

export const SIGNIN= 'SIGNIN';
export const login = (data) => async (dispatch, getState) => {
    try{
        const res = await axios({
            method: 'post',
            url: `${API_URL}/login`,
            data: data,
            headers: {'Content-Type': 'multipart/form-data' }
        })
        
        console.log("Login =>", res.data)
        if(res.data.status){
            dispatch({
                type: SIGNIN,
                payload: {email:res.data.data.email, name:res.data.data.name, token:res.data.data.token, user_id:res.data.data.user_id, new_device: false}
            })
        }
        return res
    }catch(err){
        console.log(err)
    }
};
export const SIGNUP= 'SIGNUP';
export const register = (data) => async (dispatch, getState) => {
    try{
        const res = await axios({
            method: 'post',
            url: `${API_URL}/register`,
            data: data,
            headers: {'Content-Type': 'multipart/form-data' }
        })
        if(res.data.status){
            dispatch({
                type: SIGNUP,
                payload: {email:res.data.data.email, user_id:res.data.data.user_id}
            })
        }
        return res
    }catch(err){
        console.log(err)
    }
};

export const BEGIN_AUTH= 'BEGIN_AUTH';
export const beginAuth = () => async (dispatch, getState) => {
    console.log("Reached Begin Auth")
    dispatch({
        type: BEGIN_AUTH,
    });
};
export const LOGOUT= 'LOGOUT';
export const logout = () => async (dispatch, getState) => {
    
    dispatch({
        type: LOGOUT,
    });
};

export const verifyEmail = (data) => async (dispatch, getState) => {
    const res = await axios({
        method: 'post',
        url: `${API_URL}/resend-verification-mail`,
        data: data,
        headers: {'Content-Type': 'multipart/form-data' }
    })
    return res.data.message
    // console.log("Verify Email!", res.data)
};

export const getRestaurants = (data) => async (dispatch, getState) => {
    const res = await axios({
        method: 'post',
        url: `${API_URL}/get-restaurants`,
        data: data,
        headers: {'Content-Type': 'multipart/form-data' }
    })
    return res.data.data
};

export const changePassword = (data) => async (dispatch, getState) => {
    const res = await axios({
        method: 'post',
        url: `${API_URL}/change-password`,
        data: data,
        headers: {'Content-Type': 'multipart/form-data' }
    })
    return res
};