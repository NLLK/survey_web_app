import { SET_TOKEN, SET_CURRENT_USER, UNSET_CURRENT_USER, SET_LAST_PAGE} from "./LoginTypes";
const initialState = {
  isAuthenticated: false,
  user: {
    username: "",
    personnel_id: "",
    last_name: "",
    first_name: "",
    permissions: 0
  },
  token: "",
  last_page: ""
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload
      };
    case UNSET_CURRENT_USER:
      return initialState;
    case SET_LAST_PAGE:
      return {
        ...state,
        last_page: action.payload
      };

    default:
      return state;
  }
};