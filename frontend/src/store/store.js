import { configureStore } from '@reduxjs/toolkit'

import user from './userStore'

export const store = configureStore({
  reducer: {
    user: user.reducer, // 추가 안했음~~~
  },
})