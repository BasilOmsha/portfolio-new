import axios from 'axios'

const isDevelopment = import.meta.env.MODE === 'development'

// Get the current hostname
const hostname = window.location.hostname

// Define base URLs based on the hostname
let baseURL =
    hostname === 'localhost'
        ? import.meta.env.VITE_API_BASE_URL
        : import.meta.env.VITE_API_PROD_BASE_URL

if (!isDevelopment) {
    baseURL = import.meta.env.VITE_API_PROD_BASE_URL
}

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 5000
})

export default api
