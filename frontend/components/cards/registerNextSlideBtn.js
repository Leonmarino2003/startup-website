
import React from "react";
import { BsChevronRight as Icon } from "react-icons/bs";
import "swiper/css";
import "swiper/css/navigation";


export const SwiperButtonNext = () => {
  return (
    <button
      style={{
        border: "none",
        backgroundColor: "white",
        position: "absolute",
        top: "70%",
        cursor: "pointer",
      }}>
      <Icon size={58} />
    </button>
  );
};
