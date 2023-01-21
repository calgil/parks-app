import { useLoaderData } from "react-router-dom";
import { getParkByParkCode } from "../../fetch/parks/getParkByParkCode";
import { ImageCarousel } from "../ImageCarousel/ImageCarousel";
import s from "./ParkDetails.module.css";

export const loader = async ({ params }) => {
  const parkDetails = await getParkByParkCode(params.parkCode);
  return { parkDetails };
};

export default function ParkDetails() {
  const { parkDetails } = useLoaderData();
  const { id, description, designation, fullName, name, images, parkCode } =
    parkDetails;

  return (
    <div className={s.parkContainer}>
      <h4 className={s.name}>{fullName}</h4>
      <ImageCarousel images={images} />
      <p className={s.description}>{description}</p>
    </div>
  );
}
