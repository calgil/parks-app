import { createVisitedAPI } from "./createVisitedAPI";
import { deleteVisitedAPI } from "./deleteVisitedAPI";
import { getAllVisitedAPI } from "./getAllVisitedAPI";

export const toggleVisitedAPI = async ({ userId, parkId, parkCode }) => {
  console.log("toggle", userId, parkCode);
  const allVisited = await getAllVisitedAPI();
  const matchingVisited = allVisited.find(
    (visited) => visited.userId === userId && visited.parkId === parkId
  );
  if (!matchingVisited) {
    console.log(`add new visited ${parkCode}`);
    return await createVisitedAPI({ userId, parkId, parkCode });
    // return create new visited
  }
  console.log(`delete visited ${parkCode}`);
  return deleteVisitedAPI(matchingVisited.id);
  // return delete visited
};
