const { createSlice } = require("@reduxjs/toolkit");

const initialState = { lastTimeResetLinkSend: "", RESETLINK_GAP_TIME: 2 };

export const adminAuthSlice = createSlice({
  name: "adminAuthSlice",
  initialState,
  reducers: {
    setLastTimeResetLinkSendAction(state, action) {
      state.lastTimeResetLinkSend = action.payload.lastTimeResetLinkSend;
      state.RESETLINK_GAP_TIME = action.payload.RESETLINK_GAP_TIME;
    },
    removeLastTimeResetLinkSendAction(state) {
      state.lastTimeResetLinkSend = "";
      state.RESETLINK_GAP_TIME = 2;
    },
  },
});

export const {
  setLastTimeResetLinkSendAction,
  removeLastTimeResetLinkSendAction,
} = adminAuthSlice.actions;
