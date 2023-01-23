import { API_CONFIG } from "../../config";

export const getAllVisitedAPI = async () => {
  const response = await fetch(`${API_CONFIG.baseUrl}/visited`);
  if (!response.ok) {
    throw new Error("Error fetching all visited");
  }
  return await response.json();
};
