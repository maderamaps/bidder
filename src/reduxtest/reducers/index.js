const globalState = {
    TOKEN: '',
    USER_ID: '',
    USER_NAME: '',
    USER_EMAIL: '',
    USER_BIRTHDATE: '',
}

//Reducer
const rootReducer = (state = globalState, action) => {
    if(action.type === 'REGISTER'){
        console.log('SET REGISTER')
        return {
            ...state,
            TOKEN: action.token,
            USER_ID: action.id,
            USER_NAME: action.name,
            USER_EMAIL: action.email,
            USER_BIRTHDATE: action.birthdate,

        }
    }

    if(action.type === 'LOGIN'){
        console.log('SET LOGIN')
        return {
            ...state,
            TOKEN: action.token,
            USER_ID: action.id,
            USER_NAME: action.name,
            USER_EMAIL: action.email,
            USER_BIRTHDATE: action.birthdate,

        }
    }

    if(action.type === 'LOGOUT'){
        console.log('SET LOGOUT')
        return {
            ...state,
            TOKEN: '',
            USER_ID: '',
            USER_NAME: '',
            USER_EMAIL: '',
            USER_BIRTHDATE: '',

        }
    }


    return state;
}

export default rootReducer; 