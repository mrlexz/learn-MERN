export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "https://mern-learning-server.herokuapp.com/api";

export const LOCAL_STORAGE_TOKEN_NAME = "userToken";
