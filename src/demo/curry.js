import _ from 'lodash'

// ---------------------- 柯里化 ----------------------
console.group('--------- curry demo ---------')
function curry(func){
    return function(a){
        return function(b){
            return function(c){
                return func(a,b,c)
            }
        }
    }
}

function message(date,form,msg) {
    console.log(`[${date.getHours()}:${date.getMinutes()}] ${form}: ${msg}`)
}

const curriedMsg = curry(message)
const msgTemp = {
    autoDate: curriedMsg(new Date()),
    autoDateName: curriedMsg(new Date())('Jack'),
}

msgTemp.autoDate('Jack')('hi')
msgTemp.autoDateName('Hi,how are you')
curriedMsg(new Date())('Jack')('Happy New Year！')

console.groupEnd()

// ---------------------- _.curry ----------------------
console.group('--------- lodash.curry ---------')
const lodashCurryMsg = _.curry(message)
const lodashCurried = {
    autoDate: lodashCurryMsg(new Date()),
    autoDateName: lodashCurryMsg(new Date(),'Kevin'),
}

lodashCurried.autoDate('Jack',`-- I'm tied up! You can ask kevin for help`)
lodashCurried.autoDateName('-- get out of here!')
lodashCurryMsg(new Date(),'Jack','You are really fussy about food')
lodashCurryMsg(new Date())('Kevin')('Yeah, you are right')
lodashCurried.autoDate('Jack')('Lets hit the road')

/* 
    lodash.curry 返回的函数，可以用 curried(a)(b)(c) 的形式调用，也可以
    用 curried(a,b,c) 的形式调用。
    
    curried(...args)
        当 ...args.length = function.length, curried 直接执行
        当 ...args.length < function.length, 返回偏函数，偏函数也可以用这两种方式调用

*/
console.groupEnd()