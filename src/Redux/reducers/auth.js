import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: null,
  authToken: null,
  userMetaData: null,
};

const storeUserData = async (data) => {
  try {
    await localStorage.setItem("token", data?.token);
    await localStorage.setItem("email", data?.email);
    await localStorage.setItem("phonenumber", data?.phonenumber);
    await localStorage.setItem("userType", data?.userType);
  } catch (e) {
    console.error(e);
  }
};
const removeStoreData = () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("phonenumber");
    localStorage.removeItem("userType");
  } catch (e) {
    console.error(e);
  }
};

const storeUserMetaData = async (data) => {
  try {
    await localStorage.setItem("userProfileData", JSON.stringify(data));
  } catch (e) {
    console.error(e);
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authInit: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload.authtoken;
    },
    setUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      console.log("action.payload", action.payload);
      state.isAuthenticated = !!action.payload?.authToken;
      storeUserData(action.payload);
    },
    removeUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.userMetaData = null;
      removeStoreData();
    },
    setUserMetaData: (state, action) => {
      state.userMetaData = action.payload;
      storeUserMetaData(action.payload);
    },
  },
});
export const { authInit, setUser, removeUser, setUserMetaData } =
  authSlice.actions;
export default authSlice.reducer;
