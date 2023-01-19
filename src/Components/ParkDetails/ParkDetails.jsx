import { useLoaderData } from "react-router-dom";
import { ImageCarousel } from "../ImageCarousel/ImageCarousel";
import s from "./ParkDetails.module.css";
export const ParkDetails = () => {
  const park = useLoaderData();
  const { id, description, designation, fullName, name, images, parkCode } =
    park;

  return (
    <div className={s.parkContainer}>
      <h4 className={s.name}>{fullName}</h4>
      <ImageCarousel images={images} />
      <p className={s.description}>{description}</p>
    </div>
  );
};
