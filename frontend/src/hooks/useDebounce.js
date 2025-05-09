import { useEffect, useState } from "react"

/**
 * Hook tùy chỉnh để trì hoãn cập nhật giá trị
 * @param {any} value - Giá trị cần được debounce
 * @param {number} delay - Thời gian trì hoãn (ms)
 * @returns {any} - Giá trị sau khi đã debounce
 */

export const useDebounce = (value, delay) => {
    // State để lưu trữ giá trị sau khi debounce
    const [valueDebounce, setValueDebounce] = useState('')
    useEffect(() => {
         // Tạo timeout để trì hoãn việc cập nhật giá trị
        const handle = setTimeout(() => {
            setValueDebounce(value)
        }, [delay])
        // Cleanup function - xóa timeout nếu component unmount hoặc value thay đổi
        return () => {
            clearTimeout(handle)
        }
    }, [value]) // Chỉ chạy lại effect khi value thay đổi
    // Trả về giá trị đã được debounce
    return valueDebounce
}