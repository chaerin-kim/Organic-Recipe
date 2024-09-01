import { createSlice } from '@reduxjs/toolkit';

let user = createSlice({
  name: 'user', // 문자열로~~!!
  initialState: {
    user: null,
  },
  reducers: {
    setUserAllInto: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { setUserAllInto } = user.actions;
export default user;
