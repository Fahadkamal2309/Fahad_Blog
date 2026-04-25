import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from "../constants/config";
import { getAccessToken,getType } from '../utils/common-utils';
const API_URL = "http://localhost:8000";

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 60000,
});

// ✅ REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
    function (config) {

        // ✅ HANDLE PARAMS (GET ALL POSTS)
        if (config.TYPE?.params) {
            config.params = config.data;
        }

        // ✅ HANDLE QUERY (GET BY ID / UPDATE / DELETE)
        else if (config.TYPE?.query) {

            const id =
                typeof config.data === "object"
                    ? config.data?._id
                    : config.data;

            config.url = `${config.url}/${id}`;

            // ❗ IMPORTANT FIX
            if (config.method === "get" || config.method === "delete") {
                config.data = {};
            }
            // ✅ KEEP BODY for PUT/POST
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// ✅ RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
    function (response) {

        return processResponse(response);
    },
    function (error) {
        // ❗ IMPORTANT FIX: don't wrap in Promise.reject
        return processError(error);
    }
);

// ✅ SUCCESS HANDLER
const processResponse = (response) => {
    if (response.status === 200) {
        return {
            isSuccess: true,
            data: response.data
        };
    } else {
        return {
            isFailure: true,
            status: response.status,
            message: response.message
        };
    }
};

// ✅ ERROR HANDLER (FIXED)
const processError = (error) => {
    if (error.response) {
        console.log("SERVER ERROR:", error.response.data);

        return {
            isError: true,
            data: error.response.data, // ✅ RETURN REAL DATA
            message: error.response.data?.message || "Server error",
            code: error.response.status
        };

    } else if (error.request) {
        console.log("REQUEST ERROR:", error);

        return {
            isError: true,
            message: API_NOTIFICATION_MESSAGES.requestFailure.message
        };

    } else {
        console.log("NETWORK ERROR:", error);

        return {
            isError: true,
            message: API_NOTIFICATION_MESSAGES.networkError.message
        };
    }
};

// ✅ API METHODS
export const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: body,
            responseType: value.responseType,
            headers:{
             authorization:  getAccessToken()
             },
             TYPE: getType(value, body),

            onUploadProgress: function (progressEvent) {
    if (typeof showUploadProgress === "function") {
        let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
        );
        showUploadProgress(percentCompleted);
    }
},


onDownloadProgress: function (progressEvent) {
    if (typeof showDownloadProgress === "function") {
        let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
        );
        showDownloadProgress(percentCompleted);
    }
}
        });
}
API.comment = (body, id) =>
    axiosInstance({
        method: "POST",
        url: `/comment/${id}`,   // matches backend route
        data: body,
        headers: {
            authorization: getAccessToken()
        }
    });
API.deleteComment = (postId, commentId) =>
    axiosInstance({
        method: "DELETE",
        url: `/comment/${postId}/${commentId}`,
        headers: {
            authorization: getAccessToken()
        }
    });