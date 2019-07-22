import _ from 'lodash';
import './assets/css/index.css'
import './assets/scss/index.scss'
import { getCountryList } from './api/demo'

/**
 * 生产Dom
 * @param {String} clas 
 * @param {Array} text 
 * @return {Element} 生成一个div
 */
function createDom(clas,text){
    let dom = document.createElement('div')
    dom.classList.add(clas)
    dom.innerHTML = _.join(text,'-')
    return dom
}

document.body.appendChild(createDom('rotate',['rotate']))
document.body.appendChild(createDom('translate',['translate','scale']))
document.body.appendChild(createDom('skew',['skew']))
document.body.appendChild(createDom('animation',['hello','animation']))
document.body.appendChild(createDom('play-state',['animation','paly','state']))
document.body.appendChild(createDom('img-wrap'))

getCountryList()
.then(res => {
    console.log('CountryList',res)
})
.catch(err => {
    console.error(err)
})

class Demo {
    show(){
        console.log('this.Age',this.Age)
    }
    get Age(){
        return this._age
    }
    set Age(val){
        this._age = val + 1
    }
}

let d = new Demo();
d.Age = 17;
d.show()