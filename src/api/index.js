import axios from 'axios'

// 环境的切换
let [AXI, baseURL] = ['', ''];
switch (process.env.NODE_ENV) {
    case 'production':  
        baseURL = '...'     // 生产环境请求地址
        break;
    case 'development':  
        baseURL = '/api'
        break;
    default:    
        baseURL = '...'     // 其他环境请求地址
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
    return AXI.get(url, {
            params
        })
        .then(res => res.data)
}

export const del = (url, params) => {
    return AXI.delete(url, {
            params
        })
        .then(res => res.data);
}
