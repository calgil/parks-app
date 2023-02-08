import { API_CONFIG } from "../../config";

export const getAllProjectParksAPI = async () => {
  return fetch(`${API_CONFIG.baseUrl}/nextVisit`).then((response) => {
    if (!response.ok) {
      throw new Error("Error fetching all next adventure parks");
    }
    return response.json();
  });
};
