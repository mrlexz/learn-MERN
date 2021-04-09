import {
  GETS_POST,
  ADD_POST,
  GET_POST,
  DELETE_POST,
  UPDATE_POST,
} from "../../constants";

export const postReducer = (state, actions) => {
  const { type, payload } = actions;
  switch (type) {
    case GETS_POST.SUCCESS:
      return {
        ...state,
        posts: payload,
        postLoading: false,
      };
    case GETS_POST.FAILED:
      return {
        ...state,
        posts: [],
        postLoading: false,
      };
    case ADD_POST.SUCCESS:
      return {
        ...state,
        posts: [...state.posts, payload],
        postLoading: false,
      };
    case DELETE_POST.SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((p) => p._id !== payload),
        postLoading: false,
      };
    case GET_POST.SUCCESS:
      return {
        ...state,
        postUpdate: payload,
      };
    case UPDATE_POST.SUCCESS:
      const newPosts = state.posts.map((post) =>
        post._id === payload._id ? (post = payload) : post
      );
      return {
        ...state,
        posts: newPosts,
        postLoading: false,
      };
    default:
      return state;
  }
};
