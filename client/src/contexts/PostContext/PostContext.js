import { createContext, useReducer, useState } from "react";
import axios from "axios";
import { postReducer } from "../../reducers/PostReducer/postReducer";
import { apiUrl } from "../../constants/index";
import {
  GETS_POST,
  GET_POST,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
} from "../../constants";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [postState, dispatch] = useReducer(postReducer, {
    posts: [],
    postLoading: true,
    postUpdate: null,
  });

  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);

  const getValueUpdate = (id) => {
    const postUpdate = postState?.posts.find((post) => id === post._id);
    if (postUpdate) {
      dispatch({
        type: GET_POST.SUCCESS,
        payload: postUpdate,
      });
      setShowUpdatePostModal(true);
    }
  };

  const getPosts = async (filter) => {
    try {
      const response = await axios.get(`${apiUrl}/posts`);
      if (response.data.success) {
        dispatch({
          type: GETS_POST.SUCCESS,
          payload: response.data.posts,
        });
      }
    } catch (error) {
      dispatch({
        type: GETS_POST.FAILED,
      });
    }
  };

  const addNewPost = async (postForm) => {
    try {
      const response = await axios.post(`${apiUrl}/posts`, postForm);
      if (response.data.success) {
        dispatch({
          type: ADD_POST.SUCCESS,
          payload: response.data.post,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "server error" };
    }
  };

  const deletePost = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/posts/${id}`);
      if (response.data.success) {
        dispatch({
          type: DELETE_POST.SUCCESS,
          payload: id,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "server error" };
    }
  };

  const updatePost = async (postForm) => {
    try {
      const response = await axios.put(
        `${apiUrl}/posts/${postForm.id}`,
        postForm
      );
      if (response.data.success) {
        dispatch({
          type: UPDATE_POST.SUCCESS,
          payload: response.data.post,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "server error" };
    }
  };

  const postContextData = {
    postState,
    getPosts,
    addNewPost,

    showAddPostModal,
    setShowAddPostModal,

    showUpdatePostModal,
    setShowUpdatePostModal,
    getValueUpdate,
    updatePost,

    deletePost,

    showToast,
    setShowToast,
  };
  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
