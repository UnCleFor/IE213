import { createSlice } from '@reduxjs/toolkit'

// Trạng thái ban đầu của product slice
const initialState = {
  search: '', // Từ khóa tìm kiếm sản phẩm
}

// Tạo slice để quản lý trạng thái tìm kiếm sản phẩm
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Cập nhật từ khóa tìm kiếm
    searchProduct: (state, action) => {
      state.search = action.payload
    },
  },
})

// Export action để sử dụng trong component
export const { searchProduct } = productSlice.actions

export default productSlice.reducer