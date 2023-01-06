import { API_CONFIG } from "../config";

export const getUserFetch = async ({ username }) => {
  try {
    const response = await fetch(`${API_CONFIG.baseUrl}/users`);
    const users = await response.json();
    const user = users.find((user) => user.username === username);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
};
