// Using environment variable instead of hardcoded URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || "https://bcard-ojqa.onrender.com";

// (Optional) common axios instance. Not used everywhere yet, but ready for gradual migration.
// import axios from 'axios';
// export const api = axios.create({ baseURL: API_BASE_URL });

// Helper for building URLs (may be useful later)
export const buildApiUrl = (path = "") => {
    if (!path) return API_BASE_URL;
    return path.startsWith("/") ? `${API_BASE_URL}${path}` : `${API_BASE_URL}/${path}`;
};