import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import { getParkByParkCode } from "../../fetch/parks/getParkByParkCode";
import { ImageCarousel } from "../ImageCarousel/ImageCarousel";
import { Title } from "../Title/Title";
import s from "./ParkDetails.module.css";

export const loader = async ({ params }) => {
  const parkDetails = await getParkByParkCode(params.parkCode);
  return { parkDetails };
};

export default function ParkDetails() {
  const { parkDetails } = useLoaderData();
  const { id, description, designation, fullName, name, images, parkCode } =
    parkDetails;
  const navigate = useNavigate();

  return (
    <div className={s.parkContainer}>
      <Title title={fullName} />
      <button className={s.backBtn} onClick={() => navigate(-1)}>
        Back
      </button>
      <ImageCarousel images={images} />
      <p className={s.description}>{description}</p>
    </div>
  );
}
