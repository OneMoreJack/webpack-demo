import { getCountryList } from 'api/demo'
import './demo/animationDom.js'
import './demo/class'
import './demo/curry'
// import Util from '@/utils/class-module.js'

getCountryList()
.then(res => {
    console.log('CountryList',res)
})
.catch(err => {
    console.error(err)
})