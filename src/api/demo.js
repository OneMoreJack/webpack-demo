import {get} from './index'

export const getCountryList = () => get('/v3/oauth/sms/supported_countries')