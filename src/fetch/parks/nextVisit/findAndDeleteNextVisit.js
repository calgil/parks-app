import { API_CONFIG } from "../../config";
import { getAllProjectParksAPI } from "./getAllNextVisitParksAPI";

const deleteNextVisit = (id) => {
  fetch(`${API_CONFIG.baseUrl}/nextVisit/${id}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Could not delete next adventure" + id);
    }
    return response;
  });
};

export const findAndDeleteNextVisit = async ({ userId, parkId }) => {
  const allNextParks = await getAllProjectParksAPI();
  const parkToDelete = allNextParks.find(
    (next) => next.parkId === parkId && +next.userId === +userId
  );
  if (!parkToDelete) {
    throw new Error("No park to delete");
  }
  return deleteNextVisit(parkToDelete.id);
};
