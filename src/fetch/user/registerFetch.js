import { API_CONFIG } from "../config.js";

export const registerFetch = async ({ username, password }) => {
  try {
    const response = await fetch(`${API_CONFIG.baseUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      throw new Error("cannot create user");
    }
    return response.json();
  } catch (error) {
    throw new Error("cannot create user");
  }
};
