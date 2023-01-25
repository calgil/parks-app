import { API_CONFIG } from "../config";

export const patchUser = (id, updates) => {
  console.log(id, updates);
  return fetch(`${API_CONFIG.baseUrl}/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  })
    .then((response) => {
      if (!response) {
        throw new Error("Could not update user" + id);
      }
      return response;
      // console.log(response);
    })
    .then((response) => response.json());
};
