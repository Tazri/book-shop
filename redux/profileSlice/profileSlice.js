const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  loading: false,
  error: null,
  profile: {},
  otpEmail: "",
  lastTimeOtpSend: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setOTPEmailAction: function (state, action) {
      state.otpEmail = action.payload.email;
      state.lastTimeOtpSend = action.payload.lastTimeOtpSend;
    },
    removeOTPEmailAction: function (state) {
      state.otpEmail = "";
      state.lastTimeOtpSend = "";
    },
  },
});

export const { setOTPEmailAction, removeOTPEmailAction } = profileSlice.actions;
