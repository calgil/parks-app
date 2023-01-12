import { API_CONFIG } from "../../config";

export const createVisitedAPI = ({ userId, parkId, parkCode }) => {
  return fetch(`${API_CONFIG.baseUrl}/visited`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, parkId, parkCode }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Could not create Visited");
    }
    console.log("res", response);
    return response;
  });
};
