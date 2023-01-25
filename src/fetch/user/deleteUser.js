import { API_CONFIG } from "../config";

export const deleteUser = (id) => {
  return fetch(`${API_CONFIG.baseUrl}/users/${id}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Could not delete" + id);
    }
    return response;
  });
};
