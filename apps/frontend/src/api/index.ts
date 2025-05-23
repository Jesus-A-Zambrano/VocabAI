import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

// Crear instancia base de Axios
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 segundos de timeout
});

// Interceptor global para manejar errores de red/respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        console.warn("No autorizado. Redirigiendo o mostrando login...");
      }

      if (status >= 500) {
        console.error("Error del servidor:", error.response.data);
      }
    }

    return Promise.reject(error);
  }
);

// Logs de debug en modo desarrollo
if (import.meta.env.DEV) {
  api.interceptors.request.use((config) => {
    console.debug(
      "[API Request]",
      config.method?.toUpperCase(),
      config.url,
      config
    );
    return config;
  });

  api.interceptors.response.use((response) => {
    console.debug(
      "[API Response]",
      response.status,
      response.config.url,
      response
    );
    return response;
  });
}

// Métodos
export const getData = async <T>(
  endpoint: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.get<T>(endpoint, config);
  return response.data;
};

export const postData = async <T, U = unknown>(
  endpoint: string,
  data: U,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.post<T>(endpoint, data, config);
  return response.data;
};

export const updateData = async <T, U = unknown>(
  endpoint: string,
  data: U,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.put<T>(endpoint, data, config);
  return response.data;
};

export const deleteData = async <T = void>(
  endpoint: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.delete<T>(endpoint, config);
  return response.data;
};

export default api;