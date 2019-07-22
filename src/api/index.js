import axios from 'axios'

export const getList = () => axios.get('/api/compmsglist')