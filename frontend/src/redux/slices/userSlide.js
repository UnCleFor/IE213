import { createSlice } from '@reduxjs/toolkit'

// 1. Đầu tiên khai báo hàm loadState
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('userState');
    if (serializedState === null) {
      return {
        name: '',
        email: '',
        phone: '',
        address: '',
        avatar: '',
        access_token: '',
        isAdmin: false,
        id: '',
        refreshToken: ''
      };
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return {
      name: '',
      email: '',
      phone: '',
      address: '',
      avatar: '',
      access_token: '',
      isAdmin: false,
      id: '',
      refreshToken: ''
    };
  }
};

// 2. Sau đó mới khởi tạo initialState bằng cách gọi loadState
const initialState = loadState();

// 3. Tiếp theo khai báo hàm saveState
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('userState', serializedState);
  } catch (e) {
    console.error('Could not save state', e);
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { name = '', email = '', phone = '', address = '', avatar = '', access_token = '', _id = '', isAdmin = false, refreshToken = '' } = action.payload;
      state.name = name || email;
      state.email = email;
      state.phone = phone;
      state.address = address;
      state.avatar = avatar;
      state.id = _id;
      state.access_token = access_token;
      state.isAdmin = isAdmin;
      state.refreshToken = refreshToken;
      saveState(state); // Lưu state sau khi cập nhật
    },
    resetUser: (state) => {
      state.name = '';
      state.email = '';
      state.access_token = '';
      state.phone = '';
      state.address = '';
      state.id = '';
      state.isAdmin = false;
      state.avatar = '';
      state.refreshToken = '';
      localStorage.removeItem('userState'); // Xóa khỏi localStorage khi reset
    },
  },
});

export const { updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;