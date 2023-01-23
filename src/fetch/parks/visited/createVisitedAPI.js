import { API_CONFIG } from "../../config";

export const createVisitedAPI = ({ userId, parkId, parkCode }) => {
  console.log("create visited");
  console.log({ userId, parkId, parkCode });
  return null;
  // return fetch(`${API_CONFIG.baseUrl}/visited`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ userId, parkId, parkCode }),
  // }).then((response) => {
  //   if (!response.ok) {
  //     throw new Error("Could not create Visited");
  //   }
  //   return response;
  // });
};
