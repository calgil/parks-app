import { PARK_BY_PARK_CODE } from "../config";

export const getParkByParkCode = async (parkCode) => {
  try {
    const response = await fetch(
      `${PARK_BY_PARK_CODE}${parkCode}&api_key=${
        import.meta.env.VITE_PARKS_API_KEY
      }`
    );
    if (!response.ok) {
      throw new Error("Error Fetching Park");
    }
    const data = await response.json();
    const park = data.data.map(
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
    return park[0];
  } catch (error) {
    throw new Error("Error fetching park" + parkCode);
  }
};
