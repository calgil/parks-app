import { API_CONFIG } from "../../config";

export const createNewNextVisitAPI = async ({ userId, parkId, parkCode }) => {
  return fetch(`${API_CONFIG.baseUrl}/nextVisit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, parkId, parkCode }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Could not create next adventure");
    }
    return response;
  });
};
