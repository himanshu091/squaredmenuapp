const initialState = {
    email:"", 
    name:"", 
    token:null, 
    user_id:"", 
    plan_expired: null,
    plan_id: null,
    new_device: true
}
export default (state = initialState, action) => {
    switch (action.type) {
        case 'SIGNIN':
            return {
                ...state,
                email:action.payload.email, 
                name:action.payload.name, 
                token: action.payload.token, 
                user_id:action.payload.user_id,
                plan_expired: action.payload.plan_expired,
                plan_id: action.payload.plan_id,
                new_device: false
            }
        case 'SIGNUP':
            return {
                ...state,
                email:action.payload.email, 
                user_id:action.payload.user_id,
                new_device: false
            }
        case 'LOGOUT':
            return{
                ...state,
                email:"", 
                name:"", 
                token: null, 
                user_id:"",
                plan_expired: null,
                plan_id: null,
                new_device: false
            }
        case 'BEGIN_AUTH':
            console.log("Begin Auth State =>", state)
            return{
                ...state,
                new_device: false
            }
        default:
            return state
    }
}