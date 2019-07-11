import _ from 'lodash';

function createDom(){
    let dom = document.createElement('div')

    dom.innerHTML = _.join(['hello','world'],' ')

    return dom
}

document.body.appendChild(createDom())