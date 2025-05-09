import { createSlice } from '@reduxjs/toolkit'

// Lấy dữ liệu user từ localStorage nếu có, nếu không trả về state mặc định
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
    // Nếu có lỗi, trả về state mặc định
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

// Khởi tạo trạng thái ban đầu từ localStorage
const initialState = loadState();

// Lưu user state vào localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('userState', serializedState);
  } catch (e) {
    console.error('Could not save state', e);
  }
};

// Tạo Redux slice cho user
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Cập nhật thông tin người dùng và lưu vào localStorage
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

      saveState(state); // Lưu trạng thái vào localStorage
    },

    // Đăng xuất hoặc reset toàn bộ thông tin user
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

      // Xóa localStorage khi reset user
      localStorage.removeItem('userState');
    },
  },
});

// Export actions để sử dụng trong component
export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;