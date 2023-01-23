import { API_CONFIG } from "../../config";

export const getAllNextAdventureParksAPI = async () => {
  return fetch(`${API_CONFIG.baseUrl}/next-adventure`).then((response) => {
    if (!response.ok) {
      throw new Error("Error fetching all next adventure parks");
    }
    return response.json();
  });
};
