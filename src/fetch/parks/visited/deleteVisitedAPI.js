import { API_CONFIG } from "../../config";
import { getAllVisitedAPI } from "./getAllVisitedAPI";

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

export const findAndDeleteVisited = async ({ userId, parkId }) => {
  const allVisitedParks = await getAllVisitedAPI();
  const visitedToDelete = allVisitedParks.find(
    (visited) => visited.parkId === parkId && visited.userId === userId
  );
  return deleteVisitedAPI(visitedToDelete.id);
};
