import _ from 'lodash';
import './assets/css/index.css'
import './assets/scss/index.scss'

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

document.body.appendChild(createDom('transition',['hello','transition']))
document.body.appendChild(createDom('animation',['hello','animation']))
document.body.appendChild(createDom('play-state',['animation','paly','state']))
