import axios from "axios";

/**
 * One Axios instance per microservice. Base URLs come from environment
 * variables so the same build works locally and on Vercel.
 */

const ACCOUNT_API_URL = import.meta.env.VITE_ACCOUNT_API_URL || "http://localhost:4001";
const DEVICE_API_URL = import.meta.env.VITE_DEVICE_API_URL || "http://localhost:4002";
const UPGRADE_API_URL = import.meta.env.VITE_UPGRADE_API_URL || "http://localhost:4003";

function createClient(baseURL) {
  const client = axios.create({
    baseURL,
    timeout: 10000,
    headers: { "Content-Type": "application/json" }
  });

  // Normalize errors into a friendly message the UI can display directly.
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      const message =
        error.response?.data?.error?.message ||
        error.message ||
        "Unexpected network error. Please try again.";
      return Promise.reject(new Error(message));
    }
  );

  return client;
}

export const accountClient = createClient(ACCOUNT_API_URL);
export const deviceClient = createClient(DEVICE_API_URL);
export const upgradeClient = createClient(UPGRADE_API_URL);
