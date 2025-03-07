import axios from "axios";

const API_BASE_URL = "http://localhost:4000"; // Update if backend runs on another port

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchIngredients = async (dish, servings, token) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/ai/get-ingredients",
      { dish, servings },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (
      !response.data ||
      !response.data.ingredients ||
      !response.data.procedure
    ) {
      throw new Error("Invalid response format from server");
    }

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching ingredients:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.error || "Failed to fetch ingredients"
    );
  }
};

// Login API Request
export const loginUser = async (email, password) => {
  const response = await api.post("/api/auth/login", { email, password });
  return response.data;
};

export default api;
