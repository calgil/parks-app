import { PARK_URL_BASE } from "../config";

export const getParksByState = async (stateCode) => {
  try {
    const response = await fetch(
      `${PARK_URL_BASE}${stateCode}&api_key=${
        import.meta.env.VITE_PARKS_API_KEY
      }`
    );
    const data = await response.json();
    console.log("res", data);
  } catch (error) {
    console.error(error);
  }
};
