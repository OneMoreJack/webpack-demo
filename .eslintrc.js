module.exports = {
    root:true,
    parserOptions:{
        parser:'babel-eslint',
        sourceType:'module'
    },
    env:{
        browser:true,
        es6:true
    },
    globals:{
        NODE_ENV:false
    },
    rules:{
        'genetator-star-spacing':'off',
    }
}