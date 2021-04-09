import { SET_AUTH } from "../../constants";
export const authReducer = (state, actions) => {
  const {
    type,
    payload: { isAuthenticated, user },
  } = actions;
  switch (type) {
    case SET_AUTH.SUCCESS:
      return {
        ...state,
        authLoading: false,
        isAuthenticated,
        user,
      };
    default:
      return state;
  }
};
