import { loginFailure, loginStart, loginSuccess, loadStart, loadSuccess, loadFailure, loginOut  } from "./userRedux";
import { clearCart } from "./cartRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user,  { withCredentials: true });
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const load = async (dispatch) => {
  dispatch(loadStart());
  try {
    const res = await publicRequest.get("/users/load", { withCredentials: true });
    dispatch(loadSuccess(res.data));
  } catch (err) {
    dispatch(loadFailure());
  }
};

export const logout = async (dispatch) => {
  dispatch(clearCart());
  dispatch(loginOut());

  try {
    const res = await publicRequest.get("/users/logout", { withCredentials: true });
    
  } catch (err) {
    console.log(err);
  }
};