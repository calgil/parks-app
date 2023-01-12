import { API_CONFIG } from "../../config";

export const getAllVisitedAPI = () => {
  return fetch(`${API_CONFIG.baseUrl}/visited`).then((response) => {
    if (!response.ok) {
      throw new Error("Error fetching all visited");
    }
    return response.json();
  });
};
