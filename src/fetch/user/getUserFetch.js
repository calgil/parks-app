import { API_CONFIG } from "../config";

export const getUserFetch = async ({ username }) => {
  console.log("get user fetch", username);
  try {
    const response = await fetch(`${API_CONFIG.baseUrl}/users`);
    const users = await response.json();
    const user = users.find((user) => user.username === username);
    if (!user) {
      console.log("no user found");
      // return new Error("User not found");
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
};
