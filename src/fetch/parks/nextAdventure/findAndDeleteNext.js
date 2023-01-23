import { API_CONFIG } from "../../config";
import { getAllNextAdventureParksAPI } from "./getAllNextAdventureParksAPI";

const deleteNextAdventure = (id) => {
  fetch(`${API_CONFIG.baseUrl}/next-adventure/${id}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Could not delete next adventure" + id);
    }
    return response;
  });
};

export const findAndDeleteNextAdventure = async ({ userId, parkId }) => {
  const allNextParks = await getAllNextAdventureParksAPI();
  const parkToDelete = allNextParks.find(
    (next) => next.parkId === parkId && next.userId === userId
  );
  if (!parkToDelete) {
    throw new Error("No park to delete");
  }
  return deleteNextAdventure(parkToDelete.id);
};
