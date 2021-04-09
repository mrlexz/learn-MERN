import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { authReducer } from "../../reducers/AuthReducer/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../../constants";
import setAuthTokenHeader from "../../utils/setAuthTokenHeader";
import { SET_AUTH } from "../../constants";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => loadUser(), []);

  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthTokenHeader(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    try {
      const response = await axios.get(`${apiUrl}/auth`);
      if (response.data.success) {
        dispatch({
          type: SET_AUTH.SUCCESS,
          payload: {
            isAuthenticated: true,
            user: response.data.user,
          },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthTokenHeader(null);
      dispatch({
        type: SET_AUTH.SUCCESS,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  };
  // Login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
      }

      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: error.message,
      };
    }
  };

  const registerUser = async (registerUserForm) => {
    try {
      const response = await axios.post(
        `${apiUrl}/auth/register`,
        registerUserForm
      );

      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: error.message,
      };
    }
  };

  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch({
      type: SET_AUTH.SUCCESS,
      payload: {
        isAuthenticated: false,
        user: null,
      },
    });
  };

  const authContextData = { loginUser, registerUser, logoutUser, authState };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
