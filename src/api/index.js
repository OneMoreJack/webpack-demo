import axios from 'axios'

export const getList = () => axios.get('/api/v3/oauth/sms/supported_countries')