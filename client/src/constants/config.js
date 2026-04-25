


export const API_NOTIFICATION_MESSAGES = {
    loading: {
        title: "Loading...",
        message: "Data is being loaded, please wait"
    },
    success: {
        title: "Success",
        message: "Data loaded successfully"
    },
    responseFailure: {
        title: "Error",
        message: "An error occurred while receiving data, please try again"
    },
    requestFailure: {
        title: "Error",
        message: "An error occurred while sending data, please try again"
    },
    networkError: {
        title: "Error",
        message: "Network error, please check your internet connection"
    },
};

export const SERVICE_URLS = {
userSignup: {url: "/signup",method: "post"},
userLogin: { url: '/login', method: 'post' },
uploadFile: {url: '/upload',method: 'POST'},
createPost:{url:'/create', method: 'POST'},
getAllPosts:{url:'/posts', method:'GET',params:true},
getPostById: { url: '/post', method: 'GET', query: true },
updatePost: {url: '/update',method: 'PUT',query: true},
deletePost: { url: '/delete', method: 'DELETE', query: true },
comment: { url: '/comment', method: 'POST' }
}