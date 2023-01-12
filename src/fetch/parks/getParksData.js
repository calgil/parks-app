import { getParkByParkCode } from "./getParkByParkCode";

export const getParksData = async (parks) => {
  const data = await Promise.all(
    parks.map(async (park) => await getParkByParkCode(park.parkCode))
  );
  console.log({ data });
  return data;
};
