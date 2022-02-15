const initialState = {
  isAuthenticated: false,
  user: {username: ""},
  token: ""
};

export const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};