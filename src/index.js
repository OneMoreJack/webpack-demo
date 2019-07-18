import _ from 'lodash';
import './assets/css/index.css'
import './assets/scss/index.scss'

function createDom(){
    let dom = document.createElement('div')

    dom.innerHTML = _.join(['hello','world'],' ')

    return dom
}

document.body.appendChild(createDom())