
const initialState = {
    theme: 'dark',
    bread: ['myProfile']
  };
export const reducer = (state = initialState, action) => {
    // console.log(action.path)
    switch (action.type) {
        case 'CHANGE_THEME':
            return {...state,
                theme: state.theme=='dark' ? 'light':'dark'
            }
        case 'CHANGE_PATH':
            return {...state,
                bread: action.path
            }
        default:
            return initialState;
    }
}