import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

export const createUser = (payload) => api.post(`/user`, payload)
export const updateUser = (payload) => api.put(`/user`, payload)
export const deleteUser = (payload) => api.delete(`/user`, payload)
export const findUser = (payload) => api.post(`/login`, payload)

const apis = {
    createUser,
    updateUser,
    deleteUser,
    findUser
}

export default apis