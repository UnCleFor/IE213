import { useMutation } from '@tanstack/react-query'

/**
 * Custom hook để đơn giản hóa việc sử dụng useMutation từ React Query
 * @param {Function} fnCallback - Hàm xử lý mutation (thường là API call)
 * @returns {Object} - Đối tượng mutation trả về từ useMutation
 */

export const useMutationHooks = (fnCallback) => {
    // Sử dụng useMutation từ React Query
    const mutation = useMutation({
        mutationFn: fnCallback // Truyền hàm callback vào mutationFn
    })
    // Trả về toàn bộ đối tượng mutation
    return mutation
}