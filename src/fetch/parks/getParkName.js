import { PARK_BY_PARK_CODE } from "../config";

export const getParkNameByParkCode = async (parkCode) => {
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
    const park = data.data.map(({ fullName }) => ({
      fullName,
    }));
    return park[0].fullName;
  } catch (error) {
    throw new Error("Error fetching park" + parkCode);
  }
};
