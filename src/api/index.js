import axios from 'axios'

// 环境的切换
let [AXI, baseURL] = ['', ''];
switch (process.env.NODE_ENV) {
    case 'production':  // 生产环境请求地址
        baseURL = '...'
        break;
    default:    
        baseURL = '/api'
}

AXI = axios.create({
    baseURL: baseURL,
    timeout: 30000, // 请求超时时间
    withCredentials: true,
});
// AXI.defaults.headers.patch['Content-Type'] = 'application/json';
AXI.interceptors.request.use((config) => {
    // ...
    return config
}, (error) => {
    return Promise.reject(error)
})

AXI.interceptors.response.use(
    response => {
        return response
    },
    err => {
        
    }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的接口]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        AXI.get(url, {
            params: params
        })
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            reject(err.data)
        })
    })
}

export const del = (url, params) => {
    return AXI.delete(url, {
            data:params
        })
        .then(res => res.data);
}


/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        AXI.post(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}

/** 
 * put方法，对应put请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function put(url, params) {
    return new Promise((resolve, reject) => {
        AXI.put(url, JSON.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}

/** 
 * patch方法，对应patch请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function patch(url, params) {
    return new Promise((resolve, reject) => {
        AXI.patch(url, JSON.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
