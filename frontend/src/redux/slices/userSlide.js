import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  email:'',
  phone:'',
  address:'',
  avatar:'',
  access_token:'',
  isAdmin: false,
  id: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser:(state, action) => {
        const {name = '', email = '', phone = '', address = '', avatar = '', access_token = '', _id = '', isAdmin = ''} = action.payload
        console.log('action',action)
        state.name = name || email;
        state.email = email;
        state.phone = phone
        state.address = address
        state.avatar = avatar
        state.id = _id
        state.access_token = access_token;
        state.isAdmin = isAdmin || false;
    },
    resetUser:(state) => {
      state.name ='';
      state.email = '';
      state.access_token = '';
      state.phone = '';
      state.address = '';
      state.id = '';
      state.isAdmin = false;
      state.avatar = '';
  },
  },
})

// Action creators are generated for each case reducer function
export const { updateUser,resetUser } = userSlice.actions

export default userSlice.reducer