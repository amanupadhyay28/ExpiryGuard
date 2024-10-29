import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: null,
  isOnboardingCompleted: false,
  notificatioType: null,
  userMetaData: null,
};

const storeUserData = async (data) => {
  try {
    localStorage.setItem("accessToken", data?.accessToken);
    localStorage.setItem("refreshToken", data?.refreshToken);
    localStorage.setItem("userId", data?.userId.toString());
    localStorage.setItem("email", data?.email);
  } catch (e) {
    console.error(e);
  }
};
const removeStoreData = () => {
  try {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("userProfileData1");
  } catch (e) {
    console.error(e);
  }
};

const storeUserMetaData = (data) => {
  try {
    localStorage.setItem("userProfileData", JSON.stringify(data));
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
      state.isAuthenticated = !!action.payload?.accessToken;
    },
    setUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      state.isAuthenticated = !!action.payload?.accessToken;
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
