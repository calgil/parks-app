import { PARKS_BY_STATE } from "../config";

export const getParksFromAPI = async (stateCode) => {
  try {
    const response = await fetch(
      `${PARKS_BY_STATE}${stateCode}&api_key=${
        import.meta.env.VITE_PARKS_API_KEY
      }`
    );
    if (!response.ok) {
      throw new Error("Error Fetching Parks");
    }
    const data = await response.json();
    const parks = data.data.map(
      ({ id, description, designation, fullName, name, images, parkCode }) => ({
        id,
        description,
        designation,
        fullName,
        name,
        images,
        parkCode,
      })
    );
    return parks;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching parks");
  }
};
