// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   userInfo: localStorage.getItem('userInfo')
//     ? JSON.parse(localStorage.getItem('userInfo'))
//     : null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setCredentials: (state, action) => {
//       state.userInfo = action.payload;
//       console.log(action.payload,'132');

//       localStorage.setItem('userInfo', JSON.stringify(action.payload));

//       const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
//       localStorage.setItem('expirationTime', expirationTime);
//     },
//     logout: (state, action) => {
//       state.userInfo = null;
//       localStorage.removeItem('userInfo');
//       localStorage.removeItem('expirationTime');
//     },
//   },
// });

// export const { setCredentials, logout } = authSlice.actions;

// export default authSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
export const login = createAsyncThunk('users/auth', async (credentials, { dispatch }) => {
  const response = await axios.post('http://localhost:5000/api/users/auth/', credentials);
  const userInfo = response.data;
  
  // Set JWT token in cookie
  Cookies.set('jwt', userInfo.token, { expires: 30 }); // Expires in 30 days

  // Dispatch setCredentials to store user info in redux state
  dispatch(setCredentials(userInfo));

  return userInfo;
});

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
      Cookies.remove('jwt');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      });
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
