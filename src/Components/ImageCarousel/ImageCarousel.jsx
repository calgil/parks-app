import { useState } from "react";
import s from "./ImageCarousel.module.css";

export const ImageCarousel = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const prevImg = () => {
    if (imageIndex === 0) {
      return setImageIndex(images.length - 1);
    }
    setImageIndex(imageIndex - 1);
  };

  const nextImg = () => {
    if (imageIndex === images.length - 1) {
      return setImageIndex(0);
    }
    setImageIndex(imageIndex + 1);
  };

  return (
    <div className={s.carouselContainer}>
      <button className={`${s.imgBtn} ${s.prevBtn}`} onClick={prevImg}>
        <i className="fa fa-chevron-left"></i>
      </button>
      <div className={s.imgContainer}>
        <img
          className={s.selectedImg}
          src={images[imageIndex].url}
          alt={images[imageIndex].altText}
        />
      </div>
      <button className={`${s.imgBtn} ${s.nextBtn}`} onClick={nextImg}>
        <i className="fa fa-chevron-right"></i>
      </button>
    </div>
  );
};
