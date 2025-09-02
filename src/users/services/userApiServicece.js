export const API_BASE_URL = "https://bcard-ojqa.onrender.com";

// (Опционально) общий axios инстанс. Пока не используется везде, но готов для постепенной миграции.
// import axios from 'axios';
// export const api = axios.create({ baseURL: API_BASE_URL });

// Хелпер для построения URL (если пригодится позже)
export const buildApiUrl = (path = "") => {
    if (!path) return API_BASE_URL;
    return path.startsWith("/") ? `${API_BASE_URL}${path}` : `${API_BASE_URL}/${path}`;
};