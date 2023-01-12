import { API_CONFIG } from "../../config";

export const deleteVisitedAPI = (id) => {
  fetch(`${API_CONFIG.baseUrl}/visited/${id}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Could not delete visited" + id);
    }
    return response;
  });
};
