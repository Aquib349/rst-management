import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://62.72.57.219:9091",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // add authorization token if available
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;

export const handleError = (error: any) => {

    // Log error for debugging purposes
    console.error("API Error: ", error);

    // check if the error response exists
    if (error.response) {
        // server responded with a status other than 200
        const statusCode = error.response.status;
        const message = error.response.data?.message || "Something went wrong!"

        // Customisable based on status codes if needed
        switch (statusCode) {
            case 400:
                throw new Error(message || "Bad Request");
            case 401:
                throw new Error("Unauthorized. Please login");
            case 403:
                throw new Error("Forbidden. You don't have permission.");
            case 404:
                throw new Error("Resource not found.");
            case 500:
                throw new Error("Internal server error. Please try again later.");
            default:
                break;
        }
    } else if (error.request) {
        // Request was made but no response was received
        console.error("No response received: ", error.request);
        throw new Error("No response form server. Please check your network or try again later.");
    } else {
        // something happened while setting up the reqeust
        console.error("Error setting up the request: ", error.message);
        throw new Error(error.message || "Unexpected error occurred.")
    }
}