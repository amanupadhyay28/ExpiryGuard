import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: !!localStorage.getItem("authToken"),
  authToken: localStorage.getItem("authToken") || null,
  userMetaData: null,
};

const storeUserData = async (data) => {
  try {
    await localStorage.setItem("authToken", data?.authToken);

    await localStorage.setItem("email", data?.user.email);
    await localStorage.setItem("name", data?.user.name);
    await localStorage.setItem("phonenumber", data?.user.phoneNumber);
    await localStorage.setItem("userType", data?.userType);
  } catch (e) {
    console.error(e);
  }
};
const removeStoreData = () => {
  try {
    localStorage.removeItem("authToken");
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
      state.authToken = action.payload.authToken;
    },
    setUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };

      state.isAuthenticated = !!action.payload?.authToken;
      state.authToken = action.payload.authToken;
      storeUserData(action.payload);
    },
    removeUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.authToken = null;
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
