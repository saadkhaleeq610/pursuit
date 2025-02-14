// import axios from "axios";
// import { useAuthStore } from "./store/useAuthStore";

// const setupAxiosInterceptors = () => {
//   axios.interceptors.request.use(async (config) => {
//     const { validateToken, logout, accessToken } = useAuthStore.getState();

//     // Skip token validation for login and signup requests
//     if (config.url?.includes("/login") || config.url?.includes("/signup")) {
//       return config;
//     }

//     const isTokenValid = await validateToken();
//     if (!isTokenValid) {
//       logout();
//       return Promise.reject({ message: "Session expired. Please log in again." });
//     }

//     // Attach access token
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     return config;
//   });

//   axios.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const originalRequest = error.config;
  
//       if (!error.response) {
//         console.error("Network error or server not responding", error);
//         return Promise.reject({ message: "Network error or server not responding" });
//       }
  
//       if (error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
  
//         const { refreshAccessToken, accessToken } = useAuthStore.getState();
//         if (!accessToken) {
//           return Promise.reject(error);
//         }
  
//         const newAccessToken = await refreshAccessToken();
//         if (newAccessToken) {
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//           return axios(originalRequest);
//         }
//       }
//       return Promise.reject(error);
//     }
//   );
// };

// export default setupAxiosInterceptors;