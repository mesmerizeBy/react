import {combineReducers} from 'redux';

const mainState = {
    theme: 'dark',
    bread: [],
    isLogin:false
  };
const articleState ={
    tags:[],
    types:[],
    count:{}
}
const main = (state = mainState, action) => {
    
    switch (action.type) {
        case 'CHANGE_THEME':
            return {...state,
                theme: state.theme=='dark' ? 'light':'dark'
            }
        case 'Login':
            return {
                ...state,
                isLogin:true
            }
        default:
            return state;
    }
}
const article = (state = articleState,action)=>{
    
    switch (action.type) {
        case 'ADD_TAG':
            return {...state,
                tags: state.tags.concat([action.tag])
            }
        case 'REMOVE_TAG':
            return {...state,
                tags: state.tags.filter(tag => tag !== action.tag)
            }
        case 'ADD_TYPE':
            return {...state,
                types: state.types.concat([action.types])
            }
        case 'REMOVE_TYPE':
            return {...state,
                types: state.types.filter(types => types !== action.types)
            }
        case 'SET_COUNT':
            return {...state,
                count: action.count
            }
        default:
            return state;
    }
}

var reducer =combineReducers({
    "mainState": main,
    "articleState": article
})

export {reducer};